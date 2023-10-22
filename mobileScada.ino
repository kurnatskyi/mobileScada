#include "FS.h"
#include "SD.h"
#include "SPI.h"
#include "WiFi.h"
#include "RTClib.h"
#include "SPIFFS.h"
#include <EEPROM.h>
#include <ESPmDNS.h>
#include <ModbusRTU.h>
#include <ArduinoJson.h>
#include <AsyncJson.h>
#include "ESPAsyncWebServer.h"

#define MODBUS_RX_PIN 16                                                                                                  // Пін RX.
#define MODBUS_TX_PIN 17                                                                                                  // Пін TX.
#define MODBUS_DE_RE 4                                                                                                    // Пін DE_RE.

ModbusRTU mb;                                                                                                             // Ініціалізація ModBus.
RTC_DS3231 rtc;                                                                                                           // Ініціалізація RealClockTime.

AsyncWebServer server(80);                                                                                                // Ініціалізація AsyncWebServer.

DynamicJsonDocument jsonSetting(2048);                                                                                    // JSON для налаштувань.
DynamicJsonDocument jsonRegisters(2048);                                                                                  // JSON для маски регістрів.
DynamicJsonDocument jsonModBus(8192);                                                                                     // JSON для даних регістрів.
JsonObject jsonModBusObject = jsonModBus.to<JsonObject>();                                                                // JSON для даних регістрів.
DynamicJsonDocument jsonSdCard(2048);                                                                                     // JSON для даних SD.

File fileBuffer;                                                                                                          // Тимчасовий файл.


IPAddress localip;                                                                                                        // Данні для налаштування DNS.
IPAddress gateway;                                                                                                        //
IPAddress subnet;                                                                                                         //

int failId;                                                                                                               // ID приладу з помилкою.

bool failModBus;                                                                                                          // Флаг помилки ModBus.
bool cb(Modbus::ResultCode event, uint16_t transactionId, void* data) {                                                   // Callback ModBus.
  if (event != Modbus::EX_SUCCESS) {                                                                                      //
    Serial.print("Request result: 0x");                                                                                   //
    Serial.println(event, HEX);                                                                                           //
    jsonModBusObject["modbus"] = String(event, HEX) + ". ID: " + String(failId);                                          //
    failModBus = true;                                                                                                    //
  }                                                                                                                       //
  else {                                                                                                                  //
    jsonModBusObject["modbus"] = "Success";                                                                               //
    failModBus = false;                                                                                                   //
  }                                                                                                                       //
  return true;                                                                                                            //
}                                                                                                                         //

bool testWifi(void);                                                                                                      // Перевірка WiFi. 
bool readSetting  = true;                                                                                                 // Флаг читання файла налаштування.                                    
bool wsc = false;                                                                                                         // Флаг запису.
bool wsr = false;                                                                                                         // Флаг запису.
bool wmr = false;                                                                                                         // Флаг запису.
bool rc[400];                                                                                                             // ReadCoil.
bool ris[400];                                                                                                            // ReadInputStatus.

uint16_t writeId;                                                                                                         // ID записуємого приладу.
uint16_t writeReg;                                                                                                        // Регістр записуємого приладу.
uint16_t writeData;                                                                                                       // Данні записуємого приладу.
uint16_t temp[2];                                                                                                         // Змінна типу FLOAT.
uint16_t rhr[400];                                                                                                        // ReadHoldingRegister.
uint16_t rhrf[400];                                                                                                       // ReadHoldingRegister FLOAT.
uint16_t rir[400];                                                                                                        // ReadInputRegister.
uint16_t rirf[400];                                                                                                       // ReadInputRegister FLOAT.

unsigned long currentTime;                                                                                                // Поточний час.
unsigned long periodFullCycle;                                                                                            // Період повного циклу.
unsigned long periodDeviceCycle[50];                                                                                      // Період опросу приладу.   
unsigned long periodRegCycle;                                                                                             // Період опросу регістрів.

char dir[] = "/archive";                                                                                                  // Тека поточного архіву.

String nameArchive;                                                                                                       // Назва поточного файлу архуіву.

float* ptr_recData;                                                                                                       // Змінна типу FLOAT.

void setup() {                                                                                                            //
  jsonModBusObject["modbus"] = "?";                                                                                       //
  jsonModBusObject["cycle"] = "0";                                                                                        //
  ptr_recData = (float*)(&temp[0]);                                                                                       //
  Serial.begin(115200);                                                                                                   // Ініціалізація послідовного порту.
  if (!SPIFFS.begin(true)) {                                                                                              // Ініціалізація SPIFFS.
    Serial.println("An Error has occurred while mounting SPIFFS.");                                                       //
    //return;                                                                                                             //
  }                                                                                                                       //
  Serial.println("SD begin.");                                                                                            // ->
  if (!SD.begin()) {                                                                                                      // Ініціалізація SD.
    Serial.println("Card Mount Failed.");                                                                                 //
    //return;                                                                                                             //
  }                                                                                                                       //
  readFile(SD, "/setting.json", jsonSetting);                                                                             // Читання файла налаштувань.
  if (!readSetting) {                                                                                                     //
    File sourceFile;                                                                                                      //
    File destFile;                                                                                                        //
    sourceFile = SPIFFS.open("/setting.json", FILE_READ);                                                                 //
    if (sourceFile) {                                                                                                     //
      destFile = SD.open("/setting.json", FILE_WRITE);                                                                    //
      while (sourceFile.available()) {                                                                                    //
        destFile.write(sourceFile.read());                                                                                //
      }                                                                                                                   //
      sourceFile.close();                                                                                                 //
      destFile.close();                                                                                                   //
    }                                                                                                                     //
  }                                                                                                                       //
  Serial.println("RTC begin.");                                                                                           // ->
  if (! rtc.begin()) {                                                                                                    // Ініціалізація RTC.
    Serial.println("Couldn't find RTC.");                                                                                 //
    //return;                                                                                                             //
  }                                                                                                                       //
  Serial.println("ModBus serial begin.");                                                                                 // ->
  Serial2.begin(jsonSetting["speed"], SERIAL_8N1, MODBUS_RX_PIN, MODBUS_TX_PIN);                                          // Ініціалізація послідовного порту для ModBus.
  Serial.println("ModBus begin.");                                                                                        // ->
  readFile(SD, "/registers.json", jsonRegisters);                                                                         // Читання файла маски регістрів.
  mb.begin(&Serial2, MODBUS_DE_RE);                                                                                       // Запуск ModBus.
  mb.master();                                                                                                            // Режим роботи ModBus - master.
  bool localip_b = localip.fromString((jsonSetting["localip"].as<const char*>()));                                        //
  bool gateway_b = gateway.fromString((jsonSetting["gateway"].as<const char*>()));                                        //
  bool subnet_b = subnet.fromString((jsonSetting["subnet"].as<const char*>()));                                           //
  if (jsonSetting["ipmode"] == "static") {                                                                                // Статична IP адреса.
    if (!WiFi.config(localip, gateway, subnet)) {                                                                         //
      Serial.println("STA Failed to configure");                                                                          //
    }                                                                                                                     //
  }                                                                                                                       //
  if (jsonSetting["wifimode"] == "sta") {                                                                                 // STA mode.
    WiFi.mode(WIFI_STA);                                                                                                  //
    WiFi.begin(jsonSetting["ssid"].as<const char*>(), jsonSetting["password"].as<const char*>());                         //
    if (testWifi()) {                                                                                                     //
      Serial.println("Succesfully Connected.");                                                                           //
      Serial.print("IP address: ");                                                                                       //
      Serial.println(WiFi.localIP());                                                                                     //
      jsonModBusObject["ip"] = WiFi.localIP();                                                                            //
      //return;                                                                                                           //
    }                                                                                                                     //
    else {                                                                                                                //
      Serial.println("WiFi mode AP.");                                                                                    //
      WiFi.mode(WIFI_AP);                                                                                                 //
      WiFi.softAP(jsonSetting["apname"].as<const char*>(), jsonSetting["appassword"].as<const char*>());                  //
      jsonModBusObject["ip"] = WiFi.localIP();                                                                            //
    }                                                                                                                     //
  }                                                                                                                       //
  if (jsonSetting["wifimode"] == "ap") {                                                                                  // AP mode.
    WiFi.mode(WIFI_AP);                                                                                                   //
    WiFi.softAP(jsonSetting["apname"].as<const char*>(), jsonSetting["appassword"].as<const char*>());                    //
    jsonModBusObject["ip"] = WiFi.localIP();                                                                              //
  }                                                                                                                       //
  if (!MDNS.begin(jsonSetting["dns"])) {                                                                                  // DNS.
    Serial.println("Error starting mDNS.");                                                                               //
    //return;                                                                                                             //
  }                                                                                                                       //
  server.on("/", HTTP_GET, [](AsyncWebServerRequest * request) {                                                          // Головна WEB - сторінка.
    request->send(SPIFFS, "/index.html", "text/html");                                                                    // /index.html
  });                                                                                                                     //
  server.on("/css/bootstrap.min.css", HTTP_GET, [](AsyncWebServerRequest * request) {                                     // Таблиця стилів CSS.
    AsyncWebServerResponse* response = request->beginResponse(SPIFFS, "/css/bootstrap.min.css", "text/css");              // /css/bootstrap.min.css
    response->addHeader("Content-Encoding", "gzip");                                                                      //
    request->send(response);                                                                                              //
  });                                                                                                                     //
  server.on("/css/style.css", HTTP_GET, [](AsyncWebServerRequest * request) {                                             // Таблиця стилів CSS.
    request->send(SPIFFS, "/css/style.css", "text/css");                                                                  // /css/style.css
  });                                                                                                                     //
  server.on("/js/jquery-3.6.3.min.js", HTTP_GET, [](AsyncWebServerRequest * request) {                                    // Скрипт JS.
    AsyncWebServerResponse* response = request->beginResponse(SPIFFS, "/js/jquery-3.6.3.min.js", "text/javascript");      // /js/jquery-3.6.3.min.js
    response->addHeader("Content-Encoding", "gzip");                                                                      //
    request->send(response);                                                                                              //
  });                                                                                                                     //
  server.on("/js/Sortable.min.js", HTTP_GET, [](AsyncWebServerRequest * request) {                                        // Скрипт JS.
    AsyncWebServerResponse* response = request->beginResponse(SPIFFS, "/js/Sortable.min.js", "text/javascript");          // /js/Sortable.min.js
    response->addHeader("Content-Encoding", "gzip");                                                                      //
    request->send(response);                                                                                              //
  });                                                                                                                     //
  server.on("/js/bootstrap.min.js", HTTP_GET, [](AsyncWebServerRequest * request) {                                       // Скрипт JS.
    AsyncWebServerResponse* response = request->beginResponse(SPIFFS, "/js/bootstrap.min.js", "text/javascript");         // /js/bootstrap.min.js
    response->addHeader("Content-Encoding", "gzip");                                                                      //
    request->send(response);                                                                                              //
  });                                                                                                                     //
  server.on("/js/highcharts.js", HTTP_GET, [](AsyncWebServerRequest * request) {                                          // Скрипт JS.
    AsyncWebServerResponse* response = request->beginResponse(SPIFFS, "/js/highcharts.js", "text/javascript");            // /js/highcharts.js
    response->addHeader("Content-Encoding", "gzip");                                                                      //
    request->send(response);                                                                                              //
  });                                                                                                                     //
  server.on("/js/broken-axis.js", HTTP_GET, [](AsyncWebServerRequest * request) {                                         // Скрипт JS.
    AsyncWebServerResponse* response = request->beginResponse(SPIFFS, "/js/broken-axis.js", "text/javascript");           // /js/broken-axis.js
    response->addHeader("Content-Encoding", "gzip");                                                                      //
    request->send(response);                                                                                              //
  });                                                                                                                     //
  server.on("/js/script.js", HTTP_GET, [](AsyncWebServerRequest * request) {                                              // Скрипт JS.
    request->send(SPIFFS, "/js/script.js", "text/javascript");                                                            // /js/script.js
  });                                                                                                                     //
  server.on("/setting.json", HTTP_GET, [](AsyncWebServerRequest * request) {                                              // Файл налаштувань.
    request->send(SD, "/setting.json", "application/json");                                                               // /setting.json
  });                                                                                                                     //
  server.on("/parametres.json", HTTP_GET, [](AsyncWebServerRequest * request) {                                           // Файл параметрів.
    request->send(SD, "/parametres.json", "application/json");                                                            // /parametres.json
  });                                                                                                                     //
  server.on("/parameters_buffer.json", HTTP_GET, [](AsyncWebServerRequest * request) {                                    //
    request->send(SD, "/parameters_buffer.json", "application/json");                                                     // /parameters_buffer.json
  });                                                                                                                     //
  server.on("/widgets.json", HTTP_GET, [](AsyncWebServerRequest * request) {                                              // Файл віджетів.
    request->send(SD, "/widgets.json", "application/json");                                                               // /widgets.json
  });                                                                                                                     //
    server.on("/widgets_buffer.json", HTTP_GET, [](AsyncWebServerRequest * request) {                                     //
    request->send(SD, "/widgets_buffer.json", "application/json");                                                        // /widgets_buffer.json
  });                                                                                                                     //
  server.on("/charts.json", HTTP_GET, [](AsyncWebServerRequest * request) {                                               // Файл графіків.
    request->send(SD, "/charts.json", "application/json");                                                                // /widgets.json
  });                                                                                                                     //
  server.on("/charts_buffer.json", HTTP_GET, [](AsyncWebServerRequest * request) {                                        //
    request->send(SD, "/charts_buffer.json", "application/json");                                                         // /charts_buffer.json
  });                                                                                                                     //
  server.on("/query", HTTP_GET, [](AsyncWebServerRequest * request) {                                                     // AJAX запит.
    AsyncResponseStream *response = request->beginResponseStream("application/json");                                     //
    serializeJson(jsonModBusObject, *response);                                                                           //
    request->send(response);                                                                                              //
  });                                                                                                                     //

  server.on("/senddata", HTTP_GET, [](AsyncWebServerRequest * request) {                                                  // Команда на запис ModBus.
    String fc = request->getParam("fc")->value();                                                                         //
    writeId = request->getParam("id")->value().toInt();                                                                   //
    writeReg = request->getParam("reg")->value().toInt();                                                                 //
    writeData = request->getParam("data")->value().toInt();                                                               //
    if (fc == "wsc" && wsc == false) {                                                                                    //
      wsc = true;                                                                                                         //
    }                                                                                                                     //
    if (fc == "wsr" && wsr == false) {                                                                                    //
      wsr = true;                                                                                                         //
    }                                                                                                                     //
    if (fc == "wmr" && wmr == false) {                                                                                    //
      wmr = true;                                                                                                         //
    }                                                                                                                     //
    request->send(200, "text/plain", "ok");                                                                               //
  });                                                                                                                     //

  server.on("/settime", HTTP_GET, [](AsyncWebServerRequest * request) {                                                   // Встановлення поточного часу.
    rtc.adjust(DateTime(request->getParam("yyyy")->value().toInt(), request->getParam("mm")->value().toInt(), request->getParam("dd")->value().toInt(), request->getParam("h")->value().toInt(), request->getParam("m")->value().toInt(), request->getParam("s")->value().toInt()));
    request->send(200, "text/plain", "This response from 'set time'");                                                    //
  });                                                                                                                     //

  server.on("/reboot", HTTP_GET, [](AsyncWebServerRequest * request) {                                                    // Перезавантаження.
    request->send(200, "text/plain", "ok");                                                                               //
    delay(500);                                                                                                           //
    ESP.restart();                                                                                                        //
  });                                                                                                                     //
  
  AsyncCallbackJsonWebHandler* savesetting = new AsyncCallbackJsonWebHandler("/savesetting", [](AsyncWebServerRequest * request, JsonVariant & json) {
    auto&& jsonObj = json.as<JsonObject>();                                                                               //
    File file = SD.open("/setting.json", FILE_WRITE);                                                                     // Запис файла налаштувань.
    serializeJson(json, file);                                                                                            //
    file.close();                                                                                                         //
    json.clear();                                                                                                         //
    request->send(200, "application/json", "{\"saved\": \"setting.json\"}");                                              //
  });                                                                                                                     //
  server.addHandler(savesetting);                                                                                         //

  AsyncCallbackJsonWebHandler* saveparameters = new AsyncCallbackJsonWebHandler("/saveparameters", [](AsyncWebServerRequest * request, JsonVariant & json) {
    if (!fileBuffer) {                                                                                                    //
      fileBuffer = SD.open("/parameters_buffer.json", FILE_WRITE);                                                        // Запис файла параметрів у буфер.
    }                                                                                                                     //
    else {                                                                                                                //
      fileBuffer.seek(fileBuffer.position());                                                                             //
    }                                                                                                                     //
    serializeJson(json, fileBuffer);                                                                                      //
    json.clear();                                                                                                         //
    request->send(200, "application/json", "{\"process\": \"parameters.json\"}");                                         //
  });                                                                                                                     //
  server.addHandler(saveparameters);                                                                                      //
  server.on("/saveparameters/end", HTTP_POST, [](AsyncWebServerRequest * request) {                                       //
    File sourceFile;                                                                                                      //
    File destFile;                                                                                                        //
    fileBuffer.close();                                                                                                   //
    sourceFile = SD.open("/parameters_buffer.json", FILE_READ);                                                           //
    if (sourceFile) {                                                                                                     //
      destFile = SD.open("/parametres.json", FILE_WRITE);                                                                 // Запис файла параметрів.
      while (sourceFile.available()) {                                                                                    //
        destFile.write(sourceFile.read());                                                                                //
      }                                                                                                                   //
      sourceFile.close();                                                                                                 //
      destFile.close();                                                                                                   //
      deleteFile(SD, "/parameters_buffer.json");                                                                          //
    }                                                                                                                     //
    request->send(200, "application/json", "{\"saved\": \"parameters.json\"}");                                           //
  });                                                                                                                     //

  AsyncCallbackJsonWebHandler* saveregisters = new AsyncCallbackJsonWebHandler("/saveregisters", [](AsyncWebServerRequest * request, JsonVariant & json) {
    File file = SD.open("/registers.json", FILE_WRITE);                                                                   // Запис файла маски регістрів.
    serializeJson(json, file);                                                                                            //
    file.close();                                                                                                         //
    json.clear();                                                                                                         //
    request->send(200, "application/json", "{\"saved\": \"registers.json\"}");                                            //
  });                                                                                                                     //
  server.addHandler(saveregisters);                                                                                       //

  AsyncCallbackJsonWebHandler* savewidgets = new AsyncCallbackJsonWebHandler("/savewidgets", [](AsyncWebServerRequest * request, JsonVariant & json) {
    if (!fileBuffer) {                                                                                                    //
      fileBuffer = SD.open("/widgets_buffer.json", FILE_WRITE);                                                           // Запис файла віджетів у буфер.
    }                                                                                                                     //
    else {                                                                                                                //
      fileBuffer.seek(fileBuffer.position());                                                                             //
    }                                                                                                                     //
    serializeJson(json, fileBuffer);                                                                                      //
    json.clear();                                                                                                         //
    request->send(200, "application/json", "{\"process\": \"widgets.json\"}");                                            //
  });                                                                                                                     //
  server.addHandler(savewidgets);                                                                                         //
  server.on("/savewidgets/end", HTTP_POST, [](AsyncWebServerRequest * request) {                                          //
    File sourceFile;                                                                                                      //
    File destFile;                                                                                                        //
    fileBuffer.close();                                                                                                   //
    sourceFile = SD.open("/widgets_buffer.json", FILE_READ);                                                              //
    if (sourceFile) {                                                                                                     //
      destFile = SD.open("/widgets.json", FILE_WRITE);                                                                    // Запис файла віджетів.
      while (sourceFile.available()) {                                                                                    //
        destFile.write(sourceFile.read());                                                                                //
      }                                                                                                                   //
      sourceFile.close();                                                                                                 //
      destFile.close();                                                                                                   //
      deleteFile(SD, "/widgets_buffer.json");                                                                             //
    }                                                                                                                     //
    request->send(200, "application/json", "{\"saved\": \"widgets.json\"}");                                              //
  });                                                                                                                     //

  AsyncCallbackJsonWebHandler* savecharts = new AsyncCallbackJsonWebHandler("/savecharts", [](AsyncWebServerRequest * request, JsonVariant & json) {
    if (!fileBuffer) {                                                                                                    //
      fileBuffer = SD.open("/charts_buffer.json", FILE_WRITE);                                                            // Запис файла графіків у буфер.
    }                                                                                                                     //
    else {                                                                                                                //
      fileBuffer.seek(fileBuffer.position());                                                                             //
    }                                                                                                                     //
    serializeJson(json, fileBuffer);                                                                                      //
    json.clear();                                                                                                         //
    request->send(200, "application/json", "{\"process\": \"charts.json\"}");                                             //
  });                                                                                                                     //
  server.addHandler(savecharts);                                                                                          //
  server.on("/savecharts/end", HTTP_POST, [](AsyncWebServerRequest * request) {                                           //
    File sourceFile;                                                                                                      //
    File destFile;                                                                                                        //
    fileBuffer.close();                                                                                                   //
    sourceFile = SD.open("/charts_buffer.json", FILE_READ);                                                               //
    if (sourceFile) {                                                                                                     //
      destFile = SD.open("/charts.json", FILE_WRITE);                                                                     // Запис файла графіків.
      while (sourceFile.available()) {                                                                                    //
        destFile.write(sourceFile.read());                                                                                //
      }                                                                                                                   //
      sourceFile.close();                                                                                                 //
      destFile.close();                                                                                                   //
      deleteFile(SD, "/charts_buffer.json");                                                                              //
    }                                                                                                                     //
    request->send(200, "application/json", "{\"saved\": \"charts.json\"}");                                               //
  });                                                                                                                     //

  server.on("/saveproject", HTTP_GET, [](AsyncWebServerRequest * request) {                                               // Зберігання проєкту.
    String project = request->getParam("name")->value();                                                                  //
    createDir(SD, "/projects");                                                                                           //
    createDir(SD, ("/projects/" + project).c_str());                                                                      //
    File sourceFile;                                                                                                      //
    File destFile;                                                                                                        //
    sourceFile = SD.open("/setting.json", FILE_READ);                                                                     //
    if (sourceFile) {                                                                                                     //
      destFile = SD.open("/projects/" + project + "/setting.json", FILE_WRITE);                                           //
      while (sourceFile.available()) {                                                                                    //
        destFile.write(sourceFile.read());                                                                                //
      }                                                                                                                   //
      sourceFile.close();                                                                                                 //
      destFile.close();                                                                                                   //
    }                                                                                                                     //
    sourceFile = SD.open("/parametres.json", FILE_READ);                                                                  //
    if (sourceFile) {                                                                                                     //
      destFile = SD.open("/projects/" + project + "/parametres.json", FILE_WRITE);                                        //
      while (sourceFile.available()) {                                                                                    //
        destFile.write(sourceFile.read());                                                                                //
      }                                                                                                                   //
      sourceFile.close();                                                                                                 //
      destFile.close();                                                                                                   //
    }                                                                                                                     //
    sourceFile = SD.open("/registers.json", FILE_READ);                                                                   //
    if (sourceFile) {                                                                                                     //
      destFile = SD.open("/projects/" + project + "/registers.json", FILE_WRITE);                                         //
      while (sourceFile.available()) {                                                                                    //
        destFile.write(sourceFile.read());                                                                                //
      }                                                                                                                   //
      sourceFile.close();                                                                                                 //
      destFile.close();                                                                                                   //
    }                                                                                                                     //
    sourceFile = SD.open("/widgets.json", FILE_READ);                                                                     //
    if (sourceFile) {                                                                                                     //
      destFile = SD.open("/projects/" + project + "/widgets.json", FILE_WRITE);                                           //
      while (sourceFile.available()) {                                                                                    //
        destFile.write(sourceFile.read());                                                                                //
      }                                                                                                                   //
      sourceFile.close();                                                                                                 //
      destFile.close();                                                                                                   //
    }                                                                                                                     //
    sourceFile = SD.open("/charts.json", FILE_READ);                                                                      //
    if (sourceFile) {                                                                                                     //
      destFile = SD.open("/projects/" + project + "/charts.json", FILE_WRITE);                                            //
      while (sourceFile.available()) {                                                                                    //
        destFile.write(sourceFile.read());                                                                                //
      }                                                                                                                   //
      sourceFile.close();                                                                                                 //
      destFile.close();                                                                                                   //
    }                                                                                                                     //
    request->send(200, "text/plain", "project saved");                                                                    //
  });                                                                                                                     //
  
  server.on("/loadproject", HTTP_GET, [](AsyncWebServerRequest * request) {                                               // Завантаження проєкту.
    String project = request->getParam("name")->value();                                                                  //
    deleteFile(SD, "/setting.json");                                                                                      //
    deleteFile(SD, "/parametres.json");                                                                                   //
    deleteFile(SD, "/registers.json");                                                                                    //
    deleteFile(SD, "/widgets.json");                                                                                      //
    deleteFile(SD, "/charts.json");                                                                                       //
    File sourceFile;                                                                                                      //
    File destFile;                                                                                                        //
    sourceFile = SD.open("/projects/" + project + "/setting.json", FILE_READ);                                            //
    if (sourceFile) {                                                                                                     //
      destFile = SD.open("/setting.json", FILE_WRITE);                                                                    //
      while (sourceFile.available()) {                                                                                    //
        destFile.write(sourceFile.read());                                                                                //
      }                                                                                                                   //
      sourceFile.close();                                                                                                 //
      destFile.close();                                                                                                   //
    }                                                                                                                     //
    sourceFile = SD.open("/projects/" + project + "/parametres.json", FILE_READ);                                         //
    if (sourceFile) {                                                                                                     //
      destFile = SD.open("/parametres.json", FILE_WRITE);                                                                 //
      while (sourceFile.available()) {                                                                                    //
        destFile.write(sourceFile.read());                                                                                //
      }                                                                                                                   //
      sourceFile.close();                                                                                                 //
      destFile.close();                                                                                                   //
    }                                                                                                                     //
    sourceFile = SD.open("/projects/" + project + "/registers.json", FILE_READ);                                          //
    if (sourceFile) {                                                                                                     //
      destFile = SD.open("/registers.json", FILE_WRITE);                                                                  //
      while (sourceFile.available()) {                                                                                    //
        destFile.write(sourceFile.read());                                                                                //
      }                                                                                                                   //
      sourceFile.close();                                                                                                 //
      destFile.close();                                                                                                   //
    }                                                                                                                     //
    sourceFile = SD.open("/projects/" + project + "/widgets.json", FILE_READ);                                            //
    if (sourceFile) {                                                                                                     //
      destFile = SD.open("/widgets.json", FILE_WRITE);                                                                    //
      while (sourceFile.available()) {                                                                                    //
        destFile.write(sourceFile.read());                                                                                //
      }                                                                                                                   //
      sourceFile.close();                                                                                                 //
      destFile.close();                                                                                                   //
    }                                                                                                                     //
    sourceFile = SD.open("/projects/" + project + "/charts.json", FILE_READ);                                             //
    if (sourceFile) {                                                                                                     //
      destFile = SD.open("/charts.json", FILE_WRITE);                                                                     //
      while (sourceFile.available()) {                                                                                    //
        destFile.write(sourceFile.read());                                                                                //
      }                                                                                                                   //
      sourceFile.close();                                                                                                 //
      destFile.close();                                                                                                   //
    }                                                                                                                     //
    request->send(200, "text/plain", "project loaded");                                                                   //
  });                                                                                                                     //

  server.on("/projectnew", HTTP_GET, [](AsyncWebServerRequest * request) {                                                // Створення нового проєкту.
    String project = request->getParam("name")->value();                                                                  //
    createDir(SD, "/projects");                                                                                           //
    createDir(SD, ("/projects/" + project).c_str());                                                                      //
    File sourceFile;                                                                                                      //
    File destFile;                                                                                                        //
    sourceFile = SPIFFS.open("/setting.json",  FILE_READ);                                                                //
    if (sourceFile) {                                                                                                     //
      destFile = SD.open("/projects/" + project + "/setting.json", FILE_WRITE);                                           //
      while (sourceFile.available()) {                                                                                    //
        destFile.write(sourceFile.read());                                                                                //
      }                                                                                                                   //
      sourceFile.close();                                                                                                 //
      destFile.close();                                                                                                   //
    }                                                                                                                     //
    request->send(200, "text/plain", "project created");                                                                  //
  });                                                                                                                     //

  server.on("/projectremove", HTTP_GET, [](AsyncWebServerRequest * request) {                                             // Видалення проєкту.
    String projectname = request->getParam("name")->value();                                                              //
    deleteFile(SD, ("/projects/" + projectname + "/setting.json").c_str());                                               //
    deleteFile(SD, ("/projects/" + projectname + "/parametres.json").c_str());                                            //
    deleteFile(SD, ("/projects/" + projectname + "/registers.json").c_str());                                             //
    deleteFile(SD, ("/projects/" + projectname + "/widgets.json").c_str());                                               //
    deleteFile(SD, ("/projects/" + projectname + "/charts.json").c_str());                                                //
    removeDir(SD, ("/projects/" + projectname).c_str());                                                                  //
    request->send(200, "application/json", "project removed");                                                            //
  });                                                                                                                     //

  server.on("/projectlist", HTTP_GET, [](AsyncWebServerRequest * request) {                                               // Перелік проєктів.
    jsonSdCard.clear();                                                                                                   //
    listDir(SD, "/projects", 0);                                                                                          //
    String response;                                                                                                      //
    serializeJson(jsonSdCard, response);                                                                                  //
    request->send(200, "application/json", response);                                                                     //
  });                                                                                                                     //
  
  server.on("/sdcard", HTTP_GET, [](AsyncWebServerRequest * request) {                                                    //  Читання тек СД карти.
    if (request->hasParam("list")) {                                                                                      //
      jsonSdCard.clear();                                                                                                 //
      String path = request->getParam("list")->value();                                                                   //
      listDir(SD, path.c_str(), 0);                                                                                       //
      String response;                                                                                                    //
      serializeJson(jsonSdCard, response);                                                                                //
      request->send(200, "application/json", response);                                                                   //
    }                                                                                                                     //
    if (request->hasParam("deletefile")) {                                                                                //
      String path = request->getParam("deletefile")->value();                                                             //
      deleteFile(SD, path.c_str());                                                                                       //
      request->send(200, "text/html", "This response from 'delete file'");                                                //
    }                                                                                                                     //
    if (request->hasParam("removedir")) {                                                                                 //
      jsonSdCard.clear();                                                                                                 //
      String path = request->getParam("removedir")->value();                                                              //
      listDir(SD, path.c_str(), 0);                                                                                       //
      for (int i = 0; i < jsonSdCard.size(); i++) {                                                                       //
        String folder = path + "/" + jsonSdCard["f" + String(i)].as<String>();                                            //
        deleteFile(SD, folder.c_str());                                                                                   //
      }                                                                                                                   //
      removeDir(SD, path.c_str());                                                                                        //
      request->send(200, "text/html", "This response from 'remove dir'");                                                 //
    }                                                                                                                     //
  });                                                                                                                     //

  server.on("/name", HTTP_GET, [](AsyncWebServerRequest * request) {                                                      // Архів.
    nameArchive = request->getParam("name")->value();                                                                     //
    request->send(200, "text/plain", nameArchive);                                                                        //
  });                                                                                                                     //
  server.on(nameArchive.c_str(), HTTP_GET, [](AsyncWebServerRequest * request) {                                          // 
    request->send(SD, nameArchive.c_str(), "application/json");                                                           //
  });                                                                                                                     //

  server.begin();                                                                                                         // Запуск сервера.
  Serial.println("Server begin.");                                                                                        //
  DateTime now = rtc.now();                                                                                               //
  currentTime = now.unixtime();                                                                                           //
  createDir(SD, now.toString(dir));                                                                                       //
}                                                                                                                         //

void loop() {                                                                                                             //
  DateTime now = rtc.now();                                                                                               // Час.
  periodFullCycle = millis();                                                                                             //
  jsonModBusObject["time"] = now.unixtime();                                                                              //
  if (now.unixtime() - currentTime >= jsonSetting["archive"].as<int>()) {                                                 // Запис параметрів кожні 5 секунд.
    String s_json;                                                                                                        //
    serializeJson(jsonModBusObject, s_json);                                                                              //
    s_json = s_json + "\n";                                                                                               //
    char daily[] = "/archive/DD.MM.YYYY";                                                                                 //
    char buf[] = "/archive/DD.MM.YYYY/DD.MM.YYYY hh-00.json";                                                             //
    createDir(SD, now.toString(daily));                                                                                   //
    appendFile(SD, now.toString(buf), (s_json).c_str());                                                                  //
    currentTime = now.unixtime();                                                                                         //
  }                                                                                                                       //
  for (int m = 0; m < jsonRegisters.size(); m += 2) {                                                                     //
    failId = jsonRegisters[m].as<int>();                                                                                  //
    if (!mb.slave()) {                                                                                                    //
      if (now.unixtime() - periodDeviceCycle[m] >= jsonRegisters[m + 1]["sd"].as<int>()) {                                // Період опросу.
        for (int i = 0, j = 0; i < jsonRegisters[m + 1]["rc"].size(); i += 2, j += jsonRegisters[m + 1]["rc"][i - 1].as<int>()) {
          mb.readCoil(jsonRegisters[m].as<int>(), jsonRegisters[m + 1]["rc"][i], &rc[j], jsonRegisters[m + 1]["rc"][i + 1], cb);
          while (mb.slave()) {                                                                                            //
            if (millis() - periodRegCycle >= jsonRegisters[m + 1]["req"].as<int>()) {                                     //
              mb.task();                                                                                                  //
              periodRegCycle = millis();                                                                                  //
            }                                                                                                             //
          }                                                                                                               //
          periodRegCycle = 0;                                                                                             //
          for (int k = jsonRegisters[m + 1]["rc"][i], y = j; k < jsonRegisters[m + 1]["rc"][i].as<int>() + jsonRegisters[m + 1]["rc"][i + 1].as<int>(); k++, y++) {
            if (failModBus) {                                                                                             //
                jsonModBusObject[jsonRegisters[m].as<String>() + "rc" + String(k)] = "-";                                 //  
            }                                                                                                             //
            else {                                                                                                        //
              jsonModBusObject[jsonRegisters[m].as<String>() + "rc" + String(k)] = rc[y];                                 //
            }                                                                                                             //
          }                                                                                                               //
          delay(jsonRegisters[m + 1]["res"]);                                                                             //
        }                                                                                                                 //
        for (int i = 0, j = 0; i < jsonRegisters[m + 1]["ris"].size(); i += 2, j += jsonRegisters[m + 1]["ris"][i - 1].as<int>()) {
          mb.readIsts (jsonRegisters[m].as<int>(), jsonRegisters[m + 1]["ris"][i], &ris[j], jsonRegisters[m + 1]["ris"][i + 1], cb);
          while (mb.slave()) {                                                                                            //
            if (millis() - periodRegCycle >= jsonRegisters[m + 1]["req"].as<int>()) {                                     //
              mb.task();                                                                                                  //
              periodRegCycle = millis();                                                                                  //
            }                                                                                                             //
          }                                                                                                               //
          periodRegCycle = 0;                                                                                             //
          for (int k = jsonRegisters[m + 1]["ris"][i], y = j; k < jsonRegisters[m + 1]["ris"][i].as<int>() + jsonRegisters[m + 1]["ris"][i + 1].as<int>(); k++, y++) {
            if (failModBus) {                                                                                             //
                jsonModBusObject[jsonRegisters[m].as<String>() + "ris" + String(k)] = "-";                                //  
            }                                                                                                             //
            else {                                                                                                        //
              jsonModBusObject[jsonRegisters[m].as<String>() + "ris" + String(k)] = ris[y];                               //
            }                                                                                                             //
          }                                                                                                               //
          delay(jsonRegisters[m + 1]["res"]);                                                                             //
        }                                                                                                                 //
        for (int i = 0, j = 0; i < jsonRegisters[m + 1]["rhr"].size(); i += 2, j += jsonRegisters[m + 1]["rhr"][i - 1].as<int>()) {
          mb.readHreg(jsonRegisters[m].as<int>(), jsonRegisters[m + 1]["rhr"][i], &rhr[j], jsonRegisters[m + 1]["rhr"][i + 1], cb);
          while (mb.slave()) {                                                                                            //
            if (millis() - periodRegCycle >= jsonRegisters[m + 1]["req"].as<int>()) {                                     //
              mb.task();                                                                                                  //
              periodRegCycle = millis();                                                                                  //
            }                                                                                                             //
          }                                                                                                               //
          periodRegCycle = 0;                                                                                             //
          for (int k = jsonRegisters[m + 1]["rhr"][i], y = j; k < jsonRegisters[m + 1]["rhr"][i].as<int>() + jsonRegisters[m + 1]["rhr"][i + 1].as<int>(); k++, y++) {
            if (jsonRegisters[m + 1]["rhrf"].size() > 0) {                                                                //
              for (int n = 0; n < jsonRegisters[m + 1]["rhrf"].size(); n++) {                                             //
                if (jsonRegisters[m + 1]["rhrf"][n].as<int>() == k) {                                                     //
                  temp[1] = rhr[y];                                                                                       //
                  temp[0] = rhr[y + 1];                                                                                   //
                  if (failModBus) {                                                                                       //
                    jsonModBusObject[jsonRegisters[m].as<String>() + "rhr" + String(k)] = "-";                            //  
                  }                                                                                                       //
                  else {                                                                                                  //
                    jsonModBusObject[jsonRegisters[m].as<String>() + "rhr" + String(k)] = *ptr_recData;                   //
                  }                                                                                                       //
                  k += 1;                                                                                                 //
                  y += 1;                                                                                                 //
                  break;                                                                                                  //
                }                                                                                                         //
                else {                                                                                                    //
                  if (failModBus) {                                                                                       //
                    jsonModBusObject[jsonRegisters[m].as<String>() + "rhr" + String(k)] = "-";                            //  
                  }                                                                                                       //
                  else {                                                                                                  //
                    jsonModBusObject[jsonRegisters[m].as<String>() + "rhr" + String(k)] = (int16_t)rhr[y];                //
                  }                                                                                                       //
                }                                                                                                         //
              }                                                                                                           //
            }                                                                                                             //
            if (jsonRegisters[m + 1]["rhrif"].size() > 0) {                                                               //
              for (int n = 0; n < jsonRegisters[m + 1]["rhrif"].size(); n++) {                                            //
                if (jsonRegisters[m + 1]["rhrif"][n].as<int>() == k) {                                                    //
                  temp[0] = rhr[y];                                                                                       //
                  temp[0] = (temp[0] >> 8) | (temp[0] << 8);                                                              //
                  temp[1] = rhr[y + 1];                                                                                   //
                  temp[1] = (temp[1] >> 8) | (temp[1] << 8);                                                              //
                  if (failModBus) {                                                                                       //
                    jsonModBusObject[jsonRegisters[m].as<String>() + "rhr" + String(k)] = "-";                            //  
                  }                                                                                                       //
                  else {                                                                                                  //
                    jsonModBusObject[jsonRegisters[m].as<String>() + "rhr" + String(k)] = *ptr_recData;                   //
                  }                                                                                                       //
                  k += 1;                                                                                                 //
                  y += 1;                                                                                                 //
                  break;                                                                                                  //
                }                                                                                                         //
                else {                                                                                                    //
                  if (failModBus) {                                                                                       //
                    jsonModBusObject[jsonRegisters[m].as<String>() + "rhr" + String(k)] = "-";                            //  
                  }                                                                                                       //
                  else {                                                                                                  //
                    jsonModBusObject[jsonRegisters[m].as<String>() + "rhr" + String(k)] = (int16_t)rhr[y];                //
                  }                                                                                                       //
                }                                                                                                         //
              }                                                                                                           //
            }                                                                                                             //
            else {                                                                                                        //
              if (failModBus) {                                                                                           //
                jsonModBusObject[jsonRegisters[m].as<String>() + "rhr" + String(k)] = "-";                                //  
              }                                                                                                           //
              else {                                                                                                      //
                jsonModBusObject[jsonRegisters[m].as<String>() + "rhr" + String(k)] = (int16_t)rhr[y];                    //
              }                                                                                                           //
            }                                                                                                             //
          }                                                                                                               //
          delay(jsonRegisters[m + 1]["res"]);                                                                             //
        }                                                                                                                 //
        for (int i = 0, j = 0; i < jsonRegisters[m + 1]["rir"].size(); i += 2, j += jsonRegisters[m + 1]["rir"][i - 1].as<int>()) {
          mb.readIreg(jsonRegisters[m].as<int>(), jsonRegisters[m + 1]["rir"][i], &rir[j], jsonRegisters[m + 1]["rir"][i + 1], cb);
          while (mb.slave()) {                                                                                            //
            if (millis() - periodRegCycle >= jsonRegisters[m + 1]["req"].as<int>()) {                                     //
              mb.task();                                                                                                  //
              periodRegCycle = millis();                                                                                  //
            }                                                                                                             //
          }                                                                                                               //
          periodRegCycle = 0;                                                                                             //
          for (int k = jsonRegisters[m + 1]["rir"][i], y = j; k < jsonRegisters[m + 1]["rir"][i].as<int>() + jsonRegisters[m + 1]["rir"][i + 1].as<int>(); k++, y++) {
            if (jsonRegisters[m + 1]["rirf"].size() > 0) {                                                                //
              for (int n = 0; n < jsonRegisters[m + 1]["rirf"].size(); n++) {                                             //
                if (jsonRegisters[m + 1]["rirf"][n].as<int>() == k) {                                                     //
                  temp[1] = rir[y];                                                                                       //
                  temp[0] = rir[y + 1];                                                                                   //
                  if (failModBus) {                                                                                       //
                    jsonModBusObject[jsonRegisters[m].as<String>() + "rir" + String(k)] = "-";                            //  
                  }                                                                                                       //
                  else {                                                                                                  //
                    jsonModBusObject[jsonRegisters[m].as<String>() + "rir" + String(k)] = *ptr_recData;                   //
                  }                                                                                                       //
                  k += 1;                                                                                                 //
                  y += 1;                                                                                                 //
                  break;                                                                                                  //
                }                                                                                                         //
                else {                                                                                                    //
                  if (failModBus) {                                                                                       //
                    jsonModBusObject[jsonRegisters[m].as<String>() + "rir" + String(k)] = "-";                            //  
                  }                                                                                                       //
                  else {                                                                                                  //
                    jsonModBusObject[jsonRegisters[m].as<String>() + "rir" + String(k)] = (int16_t)rir[y];                //
                  }                                                                                                       //
                }                                                                                                         //
              }                                                                                                           //
            }                                                                                                             //
            if (jsonRegisters[m + 1]["ririf"].size() > 0) {                                                               //
              for (int n = 0; n < jsonRegisters[m + 1]["ririf"].size(); n++) {                                            //
                if (jsonRegisters[m + 1]["ririf"][n].as<int>() == k) {                                                    //
                  temp[0] = rir[y];                                                                                       //
                  temp[0] = (temp[0] >> 8) | (temp[0] << 8);                                                              //
                  temp[1] = rir[y + 1];                                                                                   //
                  temp[1] = (temp[1] >> 8) | (temp[1] << 8);                                                              //
                  if (failModBus) {                                                                                       //
                    jsonModBusObject[jsonRegisters[m].as<String>() + "rir" + String(k)] = "-";                            //  
                  }                                                                                                       //
                  else {                                                                                                  //
                    jsonModBusObject[jsonRegisters[m].as<String>() + "rir" + String(k)] = *ptr_recData;                   //
                  }                                                                                                       //
                  k += 1;                                                                                                 //
                  y += 1;                                                                                                 //
                  break;                                                                                                  //
                }                                                                                                         //
                else {                                                                                                    //
                  if (failModBus) {                                                                                       //
                    jsonModBusObject[jsonRegisters[m].as<String>() + "rir" + String(k)] = "-";                            //  
                  }                                                                                                       //
                  else {                                                                                                  //
                    jsonModBusObject[jsonRegisters[m].as<String>() + "rir" + String(k)] = (int16_t)rir[y];                //
                  }                                                                                                       //
                }                                                                                                         //
              }                                                                                                           //
            }                                                                                                             //
            else {                                                                                                        //
              if (failModBus) {                                                                                           //
                jsonModBusObject[jsonRegisters[m].as<String>() + "rir" + String(k)] = "-";                                //  
              }                                                                                                           //
              else {                                                                                                      //
                jsonModBusObject[jsonRegisters[m].as<String>() + "rir" + String(k)] = (int16_t)rir[y];                    //
              }                                                                                                           //
            }                                                                                                             //
          }                                                                                                               //
          delay(jsonRegisters[m + 1]["res"]);                                                                             //
        }                                                                                                                 //
        periodDeviceCycle[m] = now.unixtime();                                                                            //
      }                                                                                                                   //
      if (wsc == true) {                                                                                                  //
        mb.writeCoil(writeId, writeReg, writeData, cb);                                                                   //
        while (mb.slave()) {                                                                                              //
          mb.task();                                                                                                      //
          delay(50);                                                                                                      //
        }                                                                                                                 //
        wsc = false;                                                                                                      //
      }                                                                                                                   //
      if (wsr == true) {                                                                                                  //
        mb.writeHreg(writeId, writeReg, writeData, cb);                                                                   //
        while (mb.slave()) {                                                                                              //
          mb.task();                                                                                                      //
          delay(50);                                                                                                      //
        }                                                                                                                 //
        wsr = false;                                                                                                      //
      }                                                                                                                   //
      if (wmr == true) {                                                                                                  //
        mb.writeHreg(writeId, writeReg, &writeData, 1, cb);                                                               //
        while (mb.slave()) {                                                                                              //
          mb.task();                                                                                                      //
          delay(50);                                                                                                      //
        }                                                                                                                 //
        wmr = false;                                                                                                      //
      }                                                                                                                   //
    }                                                                                                                     //
  }                                                                                                                       //
  jsonModBusObject["cycle"] = millis() - periodFullCycle;                                                                 //
}                                                                                                                         //

void writeFile(fs::FS &fs, const char * path, const char * message) {                                                     //
  Serial.printf("Writing file: %s\n", path);                                                                              //
  File file = fs.open(path, FILE_WRITE);                                                                                  //
  if (!file) {                                                                                                            //
    //Serial.println("Failed to open file for writing");                                                                  //
    //return;                                                                                                             //
  }                                                                                                                       //
  if (file.print(message)) {                                                                                              //
    //Serial.println("File written");                                                                                     //
   }                                                                                                                      //
  else {                                                                                                                  //
    //Serial.println("Write failed");                                                                                     //
  }                                                                                                                       //
  file.close();                                                                                                           //
}                                                                                                                         //

void appendFile(fs::FS &fs, const char * path, const char * message) {                                                    //
  //Serial.printf("Appending to file: %s\n", path);                                                                       //
  File file = fs.open(path, FILE_APPEND);                                                                                 //
  if (!file) {                                                                                                            //
    //Serial.println("Failed to open file for appending");                                                                //
    jsonModBusObject["file"] = "SD error.";                                                                               //
    //return;                                                                                                             //
  }                                                                                                                       //
  if (file.print(message)) {                                                                                              //
    Serial.println("Message appended");                                                                                   //
    jsonModBusObject["file"] = "SD succes.";                                                                              //
  }                                                                                                                       //
  else {                                                                                                                  //
    Serial.println("Append failed");                                                                                      //
    jsonModBusObject["file"] = "SD error.";                                                                               //
  }                                                                                                                       //
  file.close();                                                                                                           //
}                                                                                                                         //

void readFile(fs::FS &fs, const char * path, DynamicJsonDocument& jsonDoc) {                                              //
  Serial.printf("Reading file: %s\n", path);                                                                              //
  File file = fs.open(path);                                                                                              //
  if (!file) {                                                                                                            //
    Serial.println("Failed to open file for reading");                                                                    //
    //return;                                                                                                             //
    readSetting = false;                                                                                                  //
  }                                                                                                                       //
  DeserializationError error = deserializeJson(jsonDoc, file);                                                            //    
  if (error) {                                                                                                            //
    Serial.println("Failed read from file");                                                                              //
    //return;                                                                                                             //
    readSetting = false;                                                                                                  //
  }                                                                                                                       //
  file.close();                                                                                                           //
}                                                                                                                         //

//void readingFile(fs::FS &fs, const char * path) {                                                                       //
//  Serial.printf("Reading file: %s\n", path);                                                                            //
//  File file = fs.open(path);                                                                                            //
//  if (!file) {                                                                                                          //
//    Serial.println("Failed to open file for reading");                                                                  //
//    return;                                                                                                             //
//  }                                                                                                                     //  
//  Serial.print("Read from file: ");                                                                                     //
//  while (file.available()) {                                                                                            //
//    Serial.write(file.read());                                                                                          //
//  }                                                                                                                     //
//  file.close();                                                                                                         //
//}                                                                                                                       //  

void listDir(fs::FS &fs, const char * dirname, uint8_t levels) {                                                          //
  int n = 0;                                                                                                              //
  Serial.printf("Listing directory: %s\n", dirname);                                                                      //
  File root = fs.open(dirname);                                                                                           //
  if (!root) {                                                                                                            //
    Serial.println("Failed to open directory");                                                                           //
    return;                                                                                                               //
  }                                                                                                                       //
  if (!root.isDirectory()) {                                                                                              //
    Serial.println("Not a directory");                                                                                    //
    return;                                                                                                               //
  }                                                                                                                       //
  File file = root.openNextFile();                                                                                        //
  while (file) {                                                                                                          //
    if (file.isDirectory()) {                                                                                             //
      Serial.print("  DIR : ");                                                                                           //
      Serial.println(file.name());                                                                                        //
      jsonSdCard["d" + String(n)] = String(file.name());                                                                  //
      if (levels) {                                                                                                       //
        listDir(fs, file.path(), levels - 1);                                                                             //
      }                                                                                                                   //
    }                                                                                                                     //
    else {                                                                                                                //
      Serial.print("  FILE: ");                                                                                           //
      Serial.print(file.name());                                                                                          //
      Serial.print("  SIZE: ");                                                                                           //
      Serial.println(file.size());                                                                                        //
      jsonSdCard["f" + String(n)] = String(file.name());                                                                  //
      jsonSdCard["s" + String(n)] = String(file.size());                                                                  //
    }                                                                                                                     //
    file = root.openNextFile();                                                                                           //
    n++;                                                                                                                  //
  }                                                                                                                       //
}                                                                                                                         //

void createDir(fs::FS &fs, const char * path) {                                                                           //
  Serial.printf("Creating Dir: %s\n", path);                                                                              //
  if (fs.mkdir(path)) {                                                                                                   //
    Serial.println("Dir created");                                                                                        //
  }                                                                                                                       //
  else {                                                                                                                  //
    Serial.println("mkdir failed");                                                                                       //
  }                                                                                                                       //
}                                                                                                                         //

void deleteFile(fs::FS &fs, const char * path) {                                                                          //
  Serial.printf("Deleting file: %s\n", path);                                                                             //
  if (fs.remove(path)) {                                                                                                  //
    Serial.println("File deleted");                                                                                       //
  }                                                                                                                       //
  else {                                                                                                                  //
    Serial.println("Delete failed");                                                                                      //
  }                                                                                                                       //
}                                                                                                                         //

void removeDir(fs::FS &fs, const char * path) {                                                                           //
  Serial.printf("Removing Dir: %s\n", path);                                                                              //
  if (fs.rmdir(path)) {                                                                                                   //
    Serial.println("Dir removed");                                                                                        //
  }                                                                                                                       //
  else {                                                                                                                  //
    Serial.println("rmdir failed");                                                                                       //
  }                                                                                                                       //
}                                                                                                                         //

bool testWifi(void) {                                                                                                     //
  int c = 0;                                                                                                              //
  Serial.println("Waiting for Wifi to connect.");                                                                         //
  while ( c < 20 ) {                                                                                                      //
    if (WiFi.status() == WL_CONNECTED) {                                                                                  //
      return true;                                                                                                        //
    }                                                                                                                     //
    delay(500);                                                                                                           //
    Serial.print(".");                                                                                                    //
    c++;                                                                                                                  //
  }                                                                                                                       //
  Serial.println("");                                                                                                     //
  Serial.println("Connect timed out, opening AP.");                                                                       //
  return false;                                                                                                           //
}                                                                                                                         //
