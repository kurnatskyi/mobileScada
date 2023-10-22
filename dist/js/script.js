const progressBar = (
  `<div class="col-12 mt-2" id="save__progress-bar">`+
    `<div class="progress" role="progressbar">`+
      `<div class="progress-bar" style="width: 0%"></div>`+
    `</div>`+
  `</div>`
);

const html__elementdevice = (numberdevice, name, id, startphase, respause, reqpause, inwork) => (
  `<div class="row device mb-2">`+
    `<div class="col-6">`+
      `<label class="col-form-label form-control-sm px-0">Назва пристрою:</label>`+
    `</div>`+
    `<div class="col-6">`+
      `<input type="text" placeholder="Введіть значення" class="form-control form-control-sm text-center namedevice form__validator" value="${name}">`+
    `</div>`+
    `<div class="col-6 mt-2">`+
      `<label class="col-form-label form-control-sm px-0">ID пристрою:</label>`+
    `</div>`+
    `<div class="col-6 mt-2">`+
      `<input type="number" inputmode="numeric" placeholder="Введіть значення" class="form-control form-control-sm text-center iddevice form__validator" value="${id}">`+
    `</div>`+
    `<div class="col-6 mt-2">`+
      `<label class="col-form-label form-control-sm px-0">Період опитування:</label>`+
    `</div>`+
    `<div class="col-6 mt-2">`+
      `<input type="number" inputmode="numeric" placeholder="Введіть значення" class="form-control form-control-sm text-center startdelay form__validator" value="${startphase}">`+
    `</div>`+
    `<div class="col-6 mt-2">`+
      `<label class="col-form-label form-control-sm px-0">Пауза між запитами:</label>`+
    `</div>`+
    `<div class="col-6 mt-2">`+
      `<input type="number" inputmode="numeric" placeholder="Введіть значення" class="form-control form-control-sm text-center resdelay form__validator" value="${respause}">`+
    `</div>`+
    `<div class="col-6 mt-2">`+
      `<label class="col-form-label form-control-sm px-0">Затримка на відповідь:</label>`+
    `</div>`+
    `<div class="col-6 mt-2">`+
      `<input type="number" inputmode="numeric" placeholder="Введіть значення" class="form-control form-control-sm text-center reqdelay form__validator" value="${reqpause}">`+
    `</div>`+
    `<div class="elements collapse" id="collapse${numberdevice}"></div>`+
    `<hr class="mt-2 mb-0">`+
    `<div class="col-2 mt-2">`+
      `<button type="button" class="btn opendevice" data-bs-toggle="collapse" data-bs-target="#collapse${numberdevice}" aria-expanded="false" aria-controls="collapse">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__folder"></use>`+
        `</svg>`+
      `</button>`+
    `</div>`+
    `<div class="col-2 mt-2">`+`<input type="checkbox" class="btn-check onoffdevice" id="id${numberdevice}" ${inwork ? 'checked' : ''} autocomplete="off">`+
      `<label class="btn btn-outline" for="id${numberdevice}">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__toggle"></use>`+
        `</svg>`+
      `</label>`+
    `</div>`+
    `<div class="col-2 mt-2">`+
      `<button type="button" class="btn updevice">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__arrow-up"></use>`+
        `</svg>`+
      `</button>`+
    `</div>`+
    `<div class="col-2 mt-2">`+
      `<button type="button" class="btn downdevice">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__arrow-down"></use>`+
        `</svg>`+
      `</button>`+
    `</div>`+
    `<div class="col-2 mt-2">`+
      `<button type="button" class="btn addparameter">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__plus"></use>`+
        `</svg>`+
      `</button>`+
    `</div>`+
    `<div class="col-2 mt-2">`+
      `<button type="button" class="btn deletedevice">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__cross"></use>`+
        `</svg>`+
      `</button>`+
    `</div>`+
    `<hr class="mt-2 mb-0">`+
  `</div>`
);

const html__elementparametres = (reg, func, type, mul, point, unit, leg, regname, color, visible) => ( 
  `<div class="row parametres mt-2">`+
  `<hr class="mt-0 mb-2">`+
    `<div class="col-3">`+
      `<input type="number" inputmode="numeric" placeholder="REG" class="form-control text-center form-control-sm register form__validator" value="${reg}">`+
    `</div>`+
    `<div class="col-3">`+
      `<select class="form-select form-select-sm function">`+
        `<option value="1" ${func === '1' ? 'selected' : ''}>01</option>`+
        `<option value="2" ${func === '2' ? 'selected' : ''}>02</option>`+
        `<option value="3" ${func === '3' ? 'selected' : ''}>03</option>`+
        `<option value="4" ${func === '4' ? 'selected' : ''}>04</option>`+
      `</select>`+
    `</div>`+
    `<div class="col-4">`+
      `<select class="form-select form-select-sm type">`+
        `<option value="1" ${type === '1' ? 'selected' : ''} ${['3', '4'].includes(func) ? 'disabled' : ''}>BOOL</option>`+
        `<option value="2" ${type === '2' ? 'selected' : ''} ${['1', '2'].includes(func) ? 'disabled' : ''}>INT16</option>`+
        `<option value="3" ${type === '3' ? 'selected' : ''} ${['1', '2'].includes(func) ? 'disabled' : ''}>FLOAT32</option>`+
        `<option value="4" ${type === '4' ? 'selected' : ''} ${['1', '2'].includes(func) ? 'disabled' : ''}>!FLOAT32</option>`+
      `</select>`+
    `</div>`+
    `<div class="col-2">`+
      `<button type="button" class="btn up">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__arrow-up"></use>`+
        `</svg>`+
      `</button>`+
    `</div>`+
    `<div class="col-3 mt-2">`+
      `<input type="number" inputmode="decimal" placeholder="MUL" class="form-control text-center form-control-sm mul" value="${mul}" ${['1', '2'].includes(func) ? 'disabled' : ''}>`+
    `</div>`+
    `<div class="col-3 mt-2">`+
      `<select class="form-select form-select-sm point" ${['1', '2'].includes(func) ? 'disabled' : ''}>`+
        `<option value="0" ${point === '0' ? 'selected' : ''}>0</option>`+
        `<option value="1" ${point === '1' ? 'selected' : ''}>1</option>`+
        `<option value="2" ${point === '2' ? 'selected' : ''}>2</option>`+
        `<option value="3" ${point === '3' ? 'selected' : ''}>3</option>`+
      `</select>`+
    `</div>`+
    `<div class="col-4 mt-2">`+
      `<select class="form-select form-select-sm units" ${['1', '2'].includes(func) ? 'disabled' : ''}>`+
        `<option value="0" ${unit === '0' ? 'selected' : ''}>none</option>`+
        `<option value="1" ${unit === '1' ? 'selected' : ''}>A</option>`+
        `<option value="2" ${unit === '2' ? 'selected' : ''}>atm</option>`+
        `<option value="3" ${unit === '3' ? 'selected' : ''}>bar</option>`+
        `<option value="4" ${unit === '4' ? 'selected' : ''}>°C</option>`+
        `<option value="5" ${unit === '5' ? 'selected' : ''}>Gcal</option>`+
        `<option value="6" ${unit === '6' ? 'selected' : ''}>Gcal/h</option>`+
        `<option value="7" ${unit === '7' ? 'selected' : ''}>GJ</option>`+
        `<option value="8" ${unit === '8' ? 'selected' : ''}>GJ/h</option>`+
        `<option value="9" ${unit === '9' ? 'selected' : ''}>grad</option>`+
        `<option value="10" ${unit === '10' ? 'selected' : ''}>h</option>`+
        `<option value="11" ${unit === '11' ? 'selected' : ''}>ht</option>`+
        `<option value="12" ${unit === '12' ? 'selected' : ''}>Hz</option>`+
        `<option value="13" ${unit === '13' ? 'selected' : ''}>J/h</option>`+
        `<option value="14" ${unit === '14' ? 'selected' : ''}>kg</option>`+
        `<option value="15" ${unit === '15' ? 'selected' : ''}>kg/h</option>`+
        `<option value="16" ${unit === '16' ? 'selected' : ''}>kgf/cm²</option>`+
        `<option value="17" ${unit === '17' ? 'selected' : ''}>km/h</option>`+
        `<option value="18" ${unit === '18' ? 'selected' : ''}>kPa</option>`+
        `<option value="19" ${unit === '19' ? 'selected' : ''}>kVA</option>`+
        `<option value="20" ${unit === '20' ? 'selected' : ''}>kVAr</option>`+
        `<option value="21" ${unit === '21' ? 'selected' : ''}>kVArh</option>`+
        `<option value="22" ${unit === '22' ? 'selected' : ''}>kW</option>`+
        `<option value="23" ${unit === '23' ? 'selected' : ''}>kWh </option>`+
        `<option value="24" ${unit === '24' ? 'selected' : ''}>l</option>`+
        `<option value="25" ${unit === '25' ? 'selected' : ''}>m</option>`+
        `<option value="26" ${unit === '26' ? 'selected' : ''}>m/s</option>`+
        `<option value="27" ${unit === '27' ? 'selected' : ''}>m³</option>`+
        `<option value="28" ${unit === '28' ? 'selected' : ''}>m³/day</option>`+
        `<option value="29" ${unit === '29' ? 'selected' : ''}>m³/h</option>`+
        `<option value="30" ${unit === '30' ? 'selected' : ''}>m³/min</option>`+
        `<option value="31" ${unit === '31' ? 'selected' : ''}>m³/sec</option>`+
        `<option value="32" ${unit === '32' ? 'selected' : ''}>mA </option>`+
        `<option value="33" ${unit === '33' ? 'selected' : ''}>mbar</option>`+
        `<option value="34" ${unit === '34' ? 'selected' : ''}>mg/l</option>`+
        `<option value="35" ${unit === '35' ? 'selected' : ''}>mg/m³ </option>`+
        `<option value="36" ${unit === '36' ? 'selected' : ''}>min</option>`+
        `<option value="37" ${unit === '37' ? 'selected' : ''}>mm</option>`+
        `<option value="38" ${unit === '38' ? 'selected' : ''}>mmhg</option>`+
        `<option value="39" ${unit === '39' ? 'selected' : ''}>MPa</option>`+
        `<option value="40" ${unit === '40' ? 'selected' : ''}>ms</option>`+
        `<option value="41" ${unit === '41' ? 'selected' : ''}>mS/cm</option>`+
        `<option value="42" ${unit === '42' ? 'selected' : ''}>mV</option>`+
        `<option value="43" ${unit === '43' ? 'selected' : ''}>MVA</option>`+
        `<option value="44" ${unit === '44' ? 'selected' : ''}>MVAr</option>`+
        `<option value="45" ${unit === '45' ? 'selected' : ''}>MW</option>`+
        `<option value="46" ${unit === '46' ? 'selected' : ''}>MWh</option>`+
        `<option value="47" ${unit === '47' ? 'selected' : ''}>n.m³</option>`+
        `<option value="48" ${unit === '48' ? 'selected' : ''}>Pa</option>`+
        `<option value="49" ${unit === '49' ? 'selected' : ''}>%</option>`+
        `<option value="50" ${unit === '50' ? 'selected' : ''}>ppm</option>`+
        `<option value="51" ${unit === '51' ? 'selected' : ''}>rpm</option>`+
        `<option value="52" ${unit === '52' ? 'selected' : ''}>sec</option>`+
        `<option value="53" ${unit === '53' ? 'selected' : ''}>sm</option>`+
        `<option value="54" ${unit === '54' ? 'selected' : ''}>t</option>`+
        `<option value="55" ${unit === '55' ? 'selected' : ''}>t/h</option>`+
        `<option value="56" ${unit === '56' ? 'selected' : ''}>t/m³</option>`+
        `<option value="57" ${unit === '57' ? 'selected' : ''}>V</option>`+
        `<option value="58" ${unit === '58' ? 'selected' : ''}>VA</option>`+
        `<option value="59" ${unit === '59' ? 'selected' : ''}>VAr</option>`+
        `<option value="60" ${unit === '60' ? 'selected' : ''}>W</option>`+
        `<option value="61" ${unit === '61' ? 'selected' : ''}>µS/cm</option>`+
      `</select>`+
    `</div>`+
    `<div class="col-2 mt-2">`+
      `<button type="button" class="btn down">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__arrow-down"></use>`+
        `</svg>`+
      `</button>`+
    `</div>`+
    `<div class="col-3 mt-2">`+
      `<input type="text" placeholder="LEG" class="form-control text-center form-control-sm name form__validator" value="${leg}">`+
    `</div>`+
    `<div class="col-3 mt-2">`+
      `<input type="text" placeholder="-" class="form-control text-center form-control-sm req ${regname}" disabled>`+
    `</div>`+
    `<div class="col-2 mt-2">`+
      `<input type="color" class="form-control form-control-color form-control-sm w-100 illum"  value="${color}">`+
    `</div>`+
    `<div class="col-2 form-check form-switch mt-auto ps-3 ps-md-4">`+
      `<input class="form-check-input mx-auto graph" type="checkbox" role="switch" ${visible ? 'checked' : ''}>`+
    `</div>`+
    `<div class="col-2 mt-2">`+
      `<button type="button" class="btn del">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__cross"></use>`+
        `</svg>`+
      `</button>`+
    `</div>`+
  `</div>`);

const widgetEditMain = (d) => (
  `<div class="row">`+
    `<hr class="mt-2 mb-0">`+
    `<div class="col-3 mt-2">`+
      `<select class="form-select form-select-sm" id="widgetid" ${['6', '7'].includes(d[0]) ? 'disabled' : ''}>`+
        `<option value="" disabled ${d[1] === null ? 'selected' : ''}>ID</option>`+
      `</select>`+
    `</div>`+
    `<div class="col-3 mt-2">`+
      `<select class="form-select form-select-sm" id="widgetfunction" ${['6', '7'].includes(d[0]) ? 'disabled' : ''}>`+
        `<option value="" disabled ${d[2] === null ? 'selected' : ''}>FC</option>`+
        `<option value="rc" ${['1', '2'].includes(d[0]) ? '' : 'disabled'}>01</option>`+
        `<option value="ris" ${['1', '2'].includes(d[0]) ? '' : 'disabled'}>02</option>`+
        `<option value="rhr" ${['5', '8', '9'].includes(d[0]) ? '' : 'disabled'}>03</option>`+
        `<option value="rir" ${['5', '8', '9'].includes(d[0]) ? '' : 'disabled'}>04</option>`+
        `<option value="wsc" ${['3', '4'].includes(d[0]) ? '' : 'disabled'}>05</option>`+
        `<option value="wsr" ${['3', '4'].includes(d[0]) ? '' : 'disabled'}>06</option>`+
        `<option value="wmc" disabled>0F</option>`+
        `<option value="wmr" ${['3', '4'].includes(d[0]) ? '' : 'disabled'}>10</option>`+
      `</select>`+
    `</div>`+
    `<div class="col-4 mt-2">`+
      `<select class="form-select form-select-sm" id="widgetregister" ${['6', '7'].includes(d[0]) ? 'disabled' : ''}>`+
        `<option value="" disabled ${d[3] === null ? 'selected' : ''}>REG</option>`+
      `</select>`+
    `</div>`+
    `<div class="col-2 mt-2">`+
      `<button type="button" class="btn" id="setwidget">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__check"></use>`+
        `</svg>`+
      `</button>`+
    `</div>`+
    `<div class="col-3 mt-2">`+
      `<select class="form-select form-select-sm" id="size" ${['4', '7'].includes(d[0]) ? 'disabled' : ''}>`+
        `<option value="-" disabled ${d[4] === null ? 'selected' : ''}>SZ</option>`+
        `<option value="1" ${d[4] === '1' ? 'selected' : ''}>1</option>`+
        `<option value="2" ${d[4] === '2' ? 'selected' : ''}>2</option>`+
        `<option value="3" ${d[4] === '3' ? 'selected' : ''}>3</option>`+
        `<option value="4" ${d[4] === '4' ? 'selected' : ''}>4</option>`+
        `<option value="5" ${d[4] === '5' ? 'selected' : ''}>5</option>`+
        `<option value="6" ${d[4] === '6' ? 'selected' : ''}>6</option>`+
        `<option value="7" ${d[4] === '7' ? 'selected' : ''}>7</option>`+
        `<option value="8" ${d[4] === '8' ? 'selected' : ''}>8</option>`+
        `<option value="9" ${d[4] === '9' ? 'selected' : ''}>9</option>`+
        `<option value="10" ${d[4] === '10' ? 'selected' : ''}>10</option>`+
        `<option value="11" ${d[4] === '11' ? 'selected' : ''}>11</option>`+
        `<option value="12" ${d[4] === '12' ? 'selected' : ''}>12</option>`+
      `</select>`+
    `</div>`+
    `<div class="col-3 mt-2">`+
      `<select class="form-select form-select-sm" id="shift" ${['7'].includes(d[0]) ? 'disabled' : ''}>`+
        `<option value="" disabled ${d[5] === null ? 'selected' : ''}>SF</option>`+
        `<option value="0" ${d[5] === '0' ? 'selected' : ''}>0</option>`+
        `<option value="1" ${d[5] === '1' ? 'selected' : ''}>1</option>`+
        `<option value="2" ${d[5] === '2' ? 'selected' : ''}>2</option>`+
        `<option value="3" ${d[5] === '3' ? 'selected' : ''}>3</option>`+
        `<option value="4" ${d[5] === '4' ? 'selected' : ''}>4</option>`+
        `<option value="5" ${d[5] === '5' ? 'selected' : ''}>5</option>`+
        `<option value="6" ${d[5] === '6' ? 'selected' : ''}>6</option>`+
      `</select>`+
    `</div>`+
    `<div class="col-2 mt-2">`+
      `<input type="checkbox" class="btn-check" id="widgetenable" autocomplete="off" ${d[7] === '2' ? 'checked' : ''}>`+
      `<label class="btn btn-outline" for="widgetenable">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__text-height"></use>`+
        `</svg>`+
      `</label>`+
    `</div>`+
    `<div class="col-2 mt-2">`+
      `<input type="checkbox" class="btn-check" id="widgetdisable" autocomplete="off" ${d[6] === true ? 'checked' : ''} ${['7'].includes(d[0]) ? 'disabled' : ''}>`+
      `<label class="btn btn-outline" for="widgetdisable">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__text-wrap"></use>`+
        `</svg>`+
      `</label>`+
    `</div>`+
    `<div class="col-2 mt-2">`+
      `<button type="button" class="btn" id="widgetremove">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__cross"></use>`+
        `</svg>`+
      `</button>`+
    `</div>`+
    `<hr class="mt-2 mb-0">`+
    `<div class="col-12 mt-2">`+
      `<input type="text" placeholder="-" class="form-control form-control-sm text-center" id="widgetname" disabled>`+
    `</div>`+
  `</div>`
);

const widgetEditIndicator = (d) => (
  `<hr class="mt-2 mb-0">`+
  `<div class="col-4 mt-2">`+
    `<input type="text" class="form-control form-control-sm text-center" value="false" disabled>`+
  `</div>`+
  `<div class="col-2 mt-2">`+
    `<input type="color" class="form-control form-control-color form-control-sm w-100 ledfalse" value="${d[10][0]}">`+
  `</div>`+
  `<div class="col-4 mt-2">`+
    `<input type="text" class="form-control form-control-sm text-center" value="true" disabled>`+
  `</div>`+
  `<div class="col-2 mt-2">`+
    `<input type="color" class="form-control form-control-color form-control-sm w-100 ledtrue" value="${d[10][1]}">`+
  `</div>`
);
  
const widgetEditTextIndicator = (d) => (
  `<hr class="mt-2 mb-0">`+
  `<div class="col-8 mt-2">`+
    `<input type="text" placeholder="Введіть значення для false" class="form-control form-control-sm text-center textledfalse" value="${d[10][0]}">`+
  `</div>`+
  `<div class="col-2 mt-2">`+
    `<input type="color" class="form-control form-control-color form-control-sm w-100 textfalse" value="${d[10][1]}">`+
  `</div>`+
  `<div class="col-2 mt-2">`+
    `<input type="color" class="form-control form-control-color form-control-sm w-100 ledfalse" value="${d[10][2]}">`+
  `</div>`+
  `<div class="col-8 mt-2">`+
    `<input type="text" placeholder="Введіть значення для true" class="form-control form-control-sm text-center textledtrue" value="${d[10][3]}">`+
  `</div>`+
  `<div class="col-2 mt-2">`+
    `<input type="color" class="form-control form-control-color form-control-sm w-100 texttrue" value="${d[10][4]}">`+
  `</div>`+
  `<div class="col-2 mt-2">`+
    `<input type="color" class="form-control form-control-color form-control-sm w-100 ledtrue" value="${d[10][5]}">`+
  `</div>`
);

const widgetEditTextIndicatorBit = (d) => (
  `<hr class="mt-2 mb-0">`+
  `<div class="col-12 mt-2">`+
    `<select class="form-select form-select-sm widget__edit__text-indicator-bit__bit">`+
      `<option value="0" ${d[10][6] === "0" ? 'selected' : ''}>Біт № 0</option>`+
      `<option value="1" ${d[10][6] === "1" ? 'selected' : ''}>Біт № 1</option>`+
      `<option value="2" ${d[10][6] === "2" ? 'selected' : ''}>Біт № 2</option>`+
      `<option value="3" ${d[10][6] === "3" ? 'selected' : ''}>Біт № 3</option>`+
      `<option value="4" ${d[10][6] === "4" ? 'selected' : ''}>Біт № 4</option>`+
      `<option value="5" ${d[10][6] === "5" ? 'selected' : ''}>Біт № 5</option>`+
      `<option value="6" ${d[10][6] === "6" ? 'selected' : ''}>Біт № 6</option>`+
      `<option value="7" ${d[10][6] === "7" ? 'selected' : ''}>Біт № 7</option>`+
      `<option value="8" ${d[10][6] === "8" ? 'selected' : ''}>Біт № 8</option>`+
      `<option value="9" ${d[10][6] === "9" ? 'selected' : ''}>Біт № 9</option>`+
      `<option value="10" ${d[10][6] === "10" ? 'selected' : ''}>Біт № 10</option>`+
      `<option value="11" ${d[10][6] === "11" ? 'selected' : ''}>Біт № 11</option>`+
      `<option value="12" ${d[10][6] === "12" ? 'selected' : ''}>Біт № 12</option>`+
      `<option value="13" ${d[10][6] === "13" ? 'selected' : ''}>Біт № 13</option>`+
      `<option value="14" ${d[10][6] === "14" ? 'selected' : ''}>Біт № 14</option>`+
      `<option value="15" ${d[10][6] === "15" ? 'selected' : ''}>Біт № 15</option>`+
    `</select>`+
  `</div>`+
  `<div class="col-8 mt-2">`+
    `<input type="text" placeholder="Введіть значення для false" class="form-control form-control-sm text-center textledfalse" value="${d[10][0]}">`+
  `</div>`+
  `<div class="col-2 mt-2">`+
    `<input type="color" class="form-control form-control-color form-control-sm w-100 textfalse" value="${d[10][1]}">`+
  `</div>`+
  `<div class="col-2 mt-2">`+
    `<input type="color" class="form-control form-control-color form-control-sm w-100 ledfalse" value="${d[10][2]}">`+
  `</div>`+
  `<div class="col-8 mt-2">`+
    `<input type="text" placeholder="Введіть значення для true" class="form-control form-control-sm text-center textledtrue" value="${d[10][3]}">`+
  `</div>`+
  `<div class="col-2 mt-2">`+
    `<input type="color" class="form-control form-control-color form-control-sm w-100 texttrue" value="${d[10][4]}">`+
  `</div>`+
  `<div class="col-2 mt-2">`+
    `<input type="color" class="form-control form-control-color form-control-sm w-100 ledtrue" value="${d[10][5]}">`+
  `</div>`
);

const widgetEditButton = (d) => (
  `<hr class="mt-2 mb-0">`+
  `<div class="col-6 mt-2">`+
    `<input type="text" placeholder="Введіть назву" class="form-control form-control-sm text-center buttontext form__validator" value="${d[10][0]}">`+
  `</div>`+
  `<div class="col-4 mt-2">`+
    `<input type="numeric" inputmode="decimal" placeholder="VAL" class="form-control form-control-sm text-center buttonval form__validator" value="${d[10][1]}">`+
  `</div>`+
  `<div class="col-2 mt-2">`+
    `<input type="color" class="form-control form-control-color form-control-sm w-100 colorbutton" value="${d[10][2]}">`+
  `</div>`
);

const  widgetEditTask = (d) => (
  `<hr class="mt-2 mb-0">`+
  `<div class="col-6 mt-2">`+
    `<input type="number" inputmode="decimal" placeholder="MUL" class="form-control form-control-sm text-center widget__edit__task__mul form__validator" value="${d[10][0]}">`+
  `</div>`+
  `<div class="col-6 mt-2">`+
    `<select class="form-select form-select-sm widget__edit__task__point">`+
      `<option value="0" ${d[10][1] === "0" ? 'selected' : ''}>0</option>`+
      `<option value="1" ${d[10][1] === "1" ? 'selected' : ''}>1</option>`+
      `<option value="2" ${d[10][1] === "2" ? 'selected' : ''}>2</option>`+
      `<option value="3" ${d[10][1] === "3" ? 'selected' : ''}>3</option>`+
    `</select>`+
  `</div>`
);

const widgetEditText = (d) => (
  `<hr class="mt-2 mb-0">`+
  `<div class="col-8 mt-2">`+
    `<input type="text" placeholder="Введіть значення" class="form-control form-control-sm text-center wi_text form__validator" value="${d[10][0]}">`+
  `</div>`+
  `<div class="col-2 mt-2">`+
    `<input type="radio" class="btn-check" name="w_align" value="text-start" id="alignleft" autocomplete="off" ${d[10][1] === 'text-start' ? 'checked' : ''}>`+
    `<label class="btn btn-outline" for="alignleft">`+
      `<svg class="icon">`+
        `<use xlink:href="#svg__text-align-left"></use>`+
      `</svg>`+
    `</label>`+
  `</div>`+
  `<div class="col-2 mt-2">`+
    `<input type="radio" class="btn-check" name="w_align" value="text-center" id="aligncenter" autocomplete="off" ${d[10][1] === 'text-center' ? 'checked' : ''}>`+
    `<label class="btn btn-outline" for="aligncenter">`+
      `<svg class="icon">`+
        `<use xlink:href="#svg__text-align-center"></use>`+
      `</svg>`+
    `</label>`+
  `</div>`
);

const widgetEditDynamicTextFirst = (d, i) => (
  `<div class="row mx-0 px-0 widget__edit__dynamic-text">`+
    `<div class="col-3 mt-2">`+
      `<input type="text" placeholder="VAL" class="form-control form-control-sm text-center widget__edit__dynamic-text__input-value form__validator" value="${d[10][Number(i) + 1]}">`+
    `</div>`+
    `<div class="col-7 mt-2">`+
      `<input type="text" placeholder="Введіть значення" class="form-control form-control-sm text-center widget__edit__dynamic-text__input-text form__validator" value="${d[10][Number(i)]}">`+
    `</div>`+
    `<div class="col-2 mt-2">`+
      `<button type="button" class="btn widget__edit__dynamic-text__button-add">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__plus"></use>`+
        `</svg>`+
      `</button>`+
    `</div>`+
    `<hr class="mt-2 mb-0">`+
  `</div>`
);
const widgetEditDynamicTextNext = (d, i) => (
  `<div class="row mx-0 px-0 widget__edit__dynamic-text">`+
  `<div class="col-3 mt-2">`+
    `<input type="text" placeholder="VAL" class="form-control form-control-sm text-center widget__edit__dynamic-text__input-value form__validator" value="${d[10][Number(i) + 1]}">`+
  `</div>`+
  `<div class="col-7 mt-2">`+
    `<input type="text" placeholder="Введіть значення" class="form-control form-control-sm text-center widget__edit__dynamic-text__input-text form__validator" value="${d[10][Number(i)]}">`+
  `</div>`+
  `<div class="col-2 mt-2">`+
    `<button type="button" class="btn widget__edit__dynamic-text__button-remove">`+
      `<svg class="icon">`+
        `<use xlink:href="#svg__cross"></use>`+
      `</svg>`+
    `</button>`+
  `</div>`+
  `<hr class="mt-2 mb-0">`+
  `</div>`
);

const widgetIndicator = (n, name) => (
  `<div class="col-${n[4]} offset-${n[5]} mt-${n[7]} widget" data-properties='${name}'>`+
    `<div class="w-100 h-100 led ${n[1] + n[2] + n[3]}" data-check="">`+
      `&nbsp;`+
    `</div>`+
  `</div>`
);

const widgetTextIndicator = (n, name) => (
  `<div class="col-${n[4]} offset-${n[5]} mt-${n[7]} widget" data-properties='${name}'>`+
    `<div class="w-100 h-100 text-center textled ${n[1] + n[2] + n[3]}" data-check="">`+
      `&nbsp;`+
    `</div>`+
  `</div>`
);

const widgetButton = (n, name) => (
  `<div class="col-${n[4]} offset-${n[5]} mt-${n[7]} widget" data-properties='${name}'>`+
    `<button type="button" style="background-color: ${n[10][2]}; border-color: ${n[10][2]}" class="btn w_button ${n[1] + n[2] + n[3]}">`+
      `${n[10][0]}`+
    `</button>`+
  `</div>`
);

const widgetTask = (n, name) => (
  `<div class="col-6 offset-${n[5]} mt-${n[7]} widget" data-properties='${name}'>`+
    `<div class="col-8 floating">`+
      `<input type="numeric" inputmode="decimal" placeholder="Значення" class="form-control form-control-sm text-center val_text">`+
    `</div>`+
    `<div class="col-4 ps-3 floating">`+
      `<button type="button" class="btn val_button ${n[1] + n[2] + n[3]}">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__pencil"></use>`+
        `</svg>`+
      `</button>`+
    `</div>`+
  `</div>`
);

const widgetRegisterValue = (n, name) => (
  `<div class="col-${n[4]} offset-${n[5]} mt-${n[7]} widget" data-properties='${name}'>`+
    `<label class="col-form-label form-control-sm px-0 w_value ${n[1] + n[2] + n[3]}">`+
      `VALUE`+
    `</label>`+
  `</div>`
);

const widgetText = (n, name) => (
  `<div class="col-${n[4]} offset-${n[5]} mt-${n[7]} widget ${n[10][1]}" data-properties='${name}'>`+
    `<label class="col-form-label form-control-sm px-0 w_text">`+
      `${n[10][0]}`+
    `</label>`+
  `</div>`
);

const widgetLine = (n, name) => (
  `<div class="widget px-0" data-properties='${name}'>`+
    `<hr class="mt-${n[7]} mb-0">`+
  `</div>`
);

const widgetDynamicText = (n, name) => (
  `<div class="col-${n[4]} offset-${n[5]} mt-${n[7]} widget overflow-hidden text-center" data-properties='${name}'>`+
    `<label class="col-form-label form-control-sm px-0 d_text ${n[1] + n[2] + n[3]}" data-check="">`+
      `${n[10][0]}`+
    `</label>`+
  `</div>`
);

const widgetIndicatorBit = (n, name) => (
  `<div class="col-${n[4]} offset-${n[5]} mt-${n[7]} widget" data-properties='${name}'>`+
    `<div class="w-100 h-100 text-center textledbit ${n[1] + n[2] + n[3]}">`+
      `&nbsp;`+
    `</div>`+
  `</div>`
);

const dirHeader = (data) => (
  `<li class="list-group-item py-1">`+
  ` <div class="row">`+
  `   <label class="col-10 col-form-label form-control-sm my-1 dir">${data['list'] + '...'}</label>`+
  `   <input type="text" class="d-none value" value="${data['list'] + '...'}">`+
  `   <div class="col-2 my-1">`+
  `     <button type="button" class="btn backfromhide">`+
  `       <svg class="icon">`+
  `         <use xlink:href="#svg__arrow-left"></use>`+
  `       </svg>`+
  `     </button>`+
  `   </div>`+
  ` </div>`+
  `</li>`
);

const dirFolder = (data, item, s) => (
  `<li class="list-group-item py-1">`+
    `<div class="row">`+
    ` <label class="col-10 col-form-label form-control-sm my-1 dir">${item}</label>`+
    ` <input type="text" class="d-none value" value="${data['list'] + s + item}">`+
    ` <div class="col-2 my-1">`+
    `   <button type="button" class="btn delete">`+
    `     <svg class="icon">`+
    `       <use xlink:href="#svg__trash"></use>`+
    `     </svg>`+
    `   </button>`+
    ` </div>`+
    `</div>`+
  `</li>`
);   

dirFile = (data, item, s, response, index) =>  (
  `<li class="list-group-item py-1">`+
    `<div class="row">`+
      `<label class="col-6 col-form-label form-control-sm my-1">${item}</label>`+
      `<input type="text" class="d-none value" value="${data['list'] + s + item}">`+
      `<label class="col-2 col-form-label form-control-sm my-1">${(response[index.replace('f', 's')] / 1024).toFixed(2)}</label>`+
      `<div class="col-2 my-1">`+
        `<button type="button" class="btn delete">`+
          `<svg class="icon">`+
            `<use xlink:href="#svg__trash"></use>`+
          `</svg>`+
        `</button>`+
      `</div>`+
      `<div class="col-2 my-1">`+
        `<button type="button" class="btn upload">`+
          `<svg class="icon">`+
            `<use xlink:href="#svg__file-load"></use>`+
          `</svg>`+
        `</button>`+
      `</div>`+
    `</div>`+
  `</li>`
);   

const messageChoice = (m) => (
  `<div class="row">`+
  `<label class="col-8 col-form-label form-control-sm my-1">${m}</label>`+
  `<div class="col-2 my-1">` +
    `<button type="button" class="btn yes">`+
      `<svg class="icon">`+
        `<use xlink:href="#svg__check"></use>`+
      `</svg>`+
    `</button>`+
  `</div>`+
  `<div class="col-2 my-1">`+
    `<button type="button" class="btn no">`+
      `<svg class="icon">`+
        `<use xlink:href="#svg__cross"></use>`+
      `</svg>`+
    `</button>` +
  `</div>` +
  `</div>`
);

const chartEditWindow = (n, id) => (
  `<div class="row mb-2 setting__charts__new-chart">`+
    `<div class="row mx-0 px-0 collapse setting__charts__new-chart__parameters" id="collapse__chart__${id}">`+
    `</div>`+
    `<div class="col-2">`+
      `<button type="button" class="btn setting__charts__new-chart__open-folder" data-bs-toggle="collapse" data-bs-target="#collapse__chart__${id}" aria-expanded="false" aria-controls="collapse">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__folder"></use>`+
        `</svg>`+
      `</button>`+
    `</div>`+
    `<div class="col-2">`+
      `<button type="button" class="btn setting__charts__new-chart__add-parameters">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__plus"></use>`+
        `</svg>`+
      `</button>`+
    `</div>`+
    `<div class="col-2">`+
      `<button type="button" class="btn setting__charts__new-chart__remove-chart">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__cross"></use>`+
        `</svg>`+
      `</button>`+
    `</div>`+
    `<div class="col-6">`+
      `<input type="text" placeholder="Введіть значення" class="form-control form-control-sm text-center form__validator setting__charts__new-chart__name" value="${n}">`+
    `</div>`+
    `<hr class="mt-2 mb-0">`+
  `</div>`
);

const chartParameter = (func) => (
  `<div class="row mx-0 px-0  setting__charts__new-chart__parameter">`+
    `<div class="col-3">`+
      `<select class="form-select form-select-sm form__validator setting__charts__new-chart__parameter__id">`+
        `<option value="" selected>ID</option>`+
      `</select>`+
    `</div>`+
    `<div class="col-3">`+
      `<select class="form-select form-select-sm form__validator setting__charts__new-chart__parameter__function">`+
        `<option value="rc" ${func === 'rc' ? 'selected' : ''}>01</option>`+
        `<option value="ris"${func === 'ris' ? 'selected' : ''}>02</option>`+
        `<option value="rhr"${func === 'rhr' ? 'selected' : ''}>03</option>`+
        `<option value="rir"${func === 'rir' ? 'selected' : ''}>04</option>`+
      `</select>`+
    `</div>`+
    `<div class="col-4">`+
      `<select class="form-select form-select-sm form__validator setting__charts__new-chart__parameter__register">`+
        `<option value="" disabled selected>REG</option>`+
      `</select>`+
    `</div>`+
    `<div class="col-2">`+
      `<button type="button" class="btn setting__charts__new-chart__parameter__remove">`+
        `<svg class="icon">`+
          `<use xlink:href="#svg__cross"></use>`+
        `</svg>`+
      `</button>`+
    `</div>`+
    `<hr class="my-2">`+
  `</div>`
);
var chartsObject = {};
var chartsArray = {};
var chartsName = [];
var chartPrevios;
var legendObject = {};
var widgetsObject = {};
var widgetObjectRegisterName = {};
var registerOldData = {};
var datadevice = {};                // JSON з пристроями та параметрами.
var move = true;                    // Флаг зупинки/запуску графыку.
var time;                           // Кінцеве положення шкали часу на графіку?
var timespan = 60000;               // Зміщення шкали часу при керування кнопками.
var created = false;                // Флаг заборони відображення вікна видалення теки/файлу.
var display = false;                // Зміная для екрану з файловим менеджером.
var sortable;
var page = 0;
var options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
var arrdevice = [];                 // Допоміжний масив з пристроями.
var arrwidgets = {};                // Допоміжний масив з типом регістрів. 
var body_color = getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-body-color');
var body_bg = getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-body-bg');
var emphasis_color = getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-emphasis-color');

//<------------------------------------------------------------------------------------------------------------------------------------------->
//                                                          Налаштування графіку.
//<------------------------------------------------------------------------------------------------------------------------------------------->
var chart = new Highcharts.Chart({
  chart:        { 
                  renderTo : 'charts_chart',
                  events: { 
                            update : function () {
                              chartLegend();
                            },
                            redraw : function () {
                              chartLegend();
                            },
                            addSeries : function () {
                              chartLegend();
                            },
                            show : function () {
                              chartLegend();
                            },
                            hide : function () {
                              chartLegend();
                            }
                          },
                  borderColor: getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-border-color'),
                  borderWidth: null,
                  type: 'line',
                  spacingTop: 20,
                  backgroundColor: getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-body-bg'),
                  animation: true
                },     
  title:        {
                   text: null
                },
  credits:      { 
                  enabled: false
                },
  tooltip:      { 
                  backgroundColor: getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-secondary-bg'),
                  borderColor: getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-border-color'),
                  useHTML: true,
                  style:  {  
                            color: getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-body-color'),
                            fontFamily: getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-font-sans-serif')
                          },
                  xDateFormat: '%A, %b %d, %H:%M:%S',
                  shared: false,
                  animation: true
                },
  legend:       { enabled: true,
                  maxHeight: 55,
                  itemMarginBottom: 2.5,
                  //useHTML: true,
                  itemStyle:  {
                                color: getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-body-color'),
                                fontWeight: 'bold',
                                fontFamily: getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-font-sans-serif')
                              },
                  itemHoverStyle: {
                                    color: getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-link-hover-color')
                                  },
                  itemHiddenStyle:  {
                                      color: getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-secondary-bg')
                                    }, 
                  animation: false
                },
  plotOptions:  {
                  line: {
                          animation: false, 
                          dataLabels: {
                                        enabled: false,
                                        //useHTML: true
                                      }
                        },
                  series: {
                            gapUnit : 'value',
                            gapSize:5 * 1000,
                              marker: {
                                        enabled: false
                                      }          
                        }
                },
  xAxis:        {
                  type: 'datetime',
                  dateTimeLabelFormats: {
                                          second: '%H:%M:%S'
                                        },
                  lineColor: getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-body-color'),
                  gridLineWidth: 0.1,
                  labels: {
                            //useHTML: true,
                            style: {
                                      color: getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-body-color')
                                    }
                          },
                  tickColor: getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-body-color')},
  yAxis:        {
                  title:  {
                            text: null
                          },
                  lineColor: getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-body-color'),
                  gridLineWidth: 0.1,
                  labels: {
                            //useHTML: true,
                            style:  {
                                      color: getComputedStyle(document.querySelector(':root')).getPropertyValue('--bs-body-color')
                                    }
                          }
                },
  time:         {
                  useUTC: false
                } 
});
Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', new Date());
Highcharts.setOptions({
  lang: {
    months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
    weekdays: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'],
    shortMonths: ['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд'],
  }
});

//<------------------------------------------------------------------------------------------------------------------------------------------->
//                                                Початок функцій завантаження налаштувань.
//<------------------------------------------------------------------------------------------------------------------------------------------->

// Завантаження /setting.json.
$.ajax({
  type: 'GET',
  url: '/setting.json',
  async: false,
  dataType: 'json',
  success: function(data) {
    $('#ssid').val(data.ssid);
    $('#password').val(data.password);
    $('input[name=wifimode]').filter('[value="' + data.wifimode + '"]').prop('checked', true);
    $('#apname').val(data.apname);
    $('#appassword').val(data.appassword);
    $('input[name=ipmode]').filter('[value="' + data.ipmode + '"]').prop('checked', true);
    $('#dns').val(data.dns);
    $('#localip').val(data.localip);
    $('#gateway').val(data.gateway);
    $('#subnet').val(data.subnet);
    $('#speed').val(data.speed);
    $('#delay').val(data.delay);
    $('#archive').val(data.archive);
    chart.update({plotOptions: {series: {gapSize: data.archive * 1000}}})
    consoleLog('Завантажено', '\'setting.json\'');
  },
  error: function() {
    consoleLog('Помилка', '\'setting.json\'');
  }
}); 

// Завантаження /parametres.json.
$.ajax({
  type: 'GET',
  url: '/parametres.json',
  async: false,
  dataType: 'text',
  success: function(data) {
    var dataArr = data.replace(/}{/g, '}|{').split('|');
    var dataParameters = {}
    $.each(dataArr, function(index) {
      dataParameters = $.extend(true, dataParameters, JSON.parse(dataArr[index]));
    });
    datadevice = dataParameters;
    $.each(dataParameters, function(index, item) {
      var rc = [], ris = [], rhr = [], rir = [];
      var numberdevice = $('.device').length + 1;
      var name = item[1], id = item[2], startphase = item[3], respause = item[4], reqpause = item[5], inwork = item[6], parametres = item[7];
      $("#devices").append($(html__elementdevice(numberdevice, name, id, startphase, respause, reqpause, inwork)));
      $.each(parametres, function(key, value) {
        var reg = value[1], func = value[2], type = value[3], mul = value[4], point = value[5], unit = value[6], leg = value[7], color = value[8], visible = value[9], regname, signal;
        div = $('.elements').eq(index);
        signal = ['1', '2'].includes(func) ? false : ['3', '4'].includes(func) ? true : null;
        switch(func) {
          case '1' :
            rc.push(reg);
            regname = id + 'rc' + reg;
            break;
          case '2' :
            ris.push(reg);
            regname = id + 'ris' + reg;
            break;
          case '3' :
            rhr.push(reg);
            regname = id + 'rhr' + reg;
            break;
          case '4' :
            rir.push(reg);
            regname = id + 'rir' + reg;
            break;
        }
        div.append($(html__elementparametres(reg, func, type, mul, point, unit, leg, regname, color, visible)));
        arrwidgets[id] = {
          'rc' : rc,
          'ris': ris,
          'rhr': rhr,
          'rir': rir,
          'wsc': rc,
          'wsr': rhr,
          'wmc': rc,
          'wmr': rhr
        }
        arrdevice.push([inwork, regname, signal, mul, point, visible, unit, leg]);
        var units = ['', 'A','atm','bar','°C','Gcal','Gcal/h','GJ','GJ/h','grad','h','ht','Hz','J/h','kg','kg/h','kgf/cm²','km/h','kPa','kVA','kVAr','kVArh','kW','kWh','l','m','m/s','m³','m³/day','m³/h','m³/min','m³/sec','mA ','mbar','mg/l','mg/m³','min','mm','mmhg','MPa','ms','mS/cm ','mV ','MVA','MVAr','MW','MWh','n.m³','Pa','%','ppm','rpm','sec','sm','t','t/h','t/m³','V','VA','VAr','W','µS/cm'];
        chart.addSeries({
          id : regname,
          name: leg,
          color: color,
          tooltip: {valueSuffix: ' ' + units[unit]},
          data: [],
          visible: false,
          showInLegend: false
        }, false);
        var legendObjectTemp = {
          [regname] : [inwork, visible]
        }
        legendObject = $.extend(true, legendObject, legendObjectTemp);
      }); 
    });
    consoleLog('Завантажено', '\'parameters.json\'');
  },
  error: function() {
    consoleLog('Помилка', '\'parameters.json\'');
  }
});


// Завантаження /widgets.json.
$.ajax({
  type: 'GET',
  url: '/widgets.json',
  async: false,
  dataType: 'text',
  success: function(data) {
    var dataArr = data.replace(/}{/g, '}|{').split('|');
    $.each(dataArr, function(index) {
      widgetsObject = $.extend(true, widgetsObject, JSON.parse(dataArr[index]));
    });
    $.each(widgetsObject, function(key, value) {
      var registerName = value[1] + value[2] + value[3];
      widgetObjectRegisterName[registerName] = $.extend(true,  widgetObjectRegisterName[registerName], {[key] : widgetsObject[key]});
    });
    var sortedKeys = Object.keys(widgetsObject).sort(function(a, b) {
      return parseInt(widgetsObject[a][9]) - parseInt(widgetsObject[b][9]);
    });
    var div = ('<div class="row d-none main__sortable"></div>')
    var h = $('#widgetmain');
    var w = $('.main__sortable');
    w.html('');
    $.each(sortedKeys, function(index) {
      var name = sortedKeys[index];
      var n = widgetsObject[sortedKeys[index]];
      if(n[8] > $('.main__sortable').length) {
        h.append(div);
        w = $('.main__sortable').eq(n[8] - 1);
        w.html('');
      }
      if ($('.main__sortable').length > 1) {
        $('.main__header').removeClass('d-none');
      }
      widgetClearfix(n[6], w);
      switch(n[0]) {
        case '1' :
          w.append($(widgetIndicator(n, name)));
          break;
        case '2' :
          w.append($(widgetTextIndicator(n, name)));
          break;  
        case '3' :
          w.append($(widgetButton(n, name)));
          break;
        case '4' :
          w.append($(widgetTask(n, name)));
          break;
        case '5' :
          w.append($(widgetRegisterValue(n, name)));
          break;
        case '6' :
          w.append($(widgetText(n, name)));
          break;
        case '7' :
          w.append($(widgetLine(n, name)));
          break;
        case '8' :
          w.append($(widgetDynamicText(n, name)));
        break;
        case '9' :
          w.append($(widgetIndicatorBit(n, name)));
        break;
      }  
    });
    function widgetClearfix (clearfix, widget) {
      var clearfix = clearfix;
      var widget = widget;
      var div = $('<div>').addClass('clearfix');
      clearfix === true ? widget.append(div) : '';
    }
    consoleLog('Завантажено', '\'widgets.json\'');
  },
  error: function() {
    consoleLog('Помилка', '\'widgets.json\'');
  }
}); 

// Завантаження /charts.json. 
$.ajax({
  type: 'GET',
  url: '/charts.json',
  async: false,
  dataType: 'text',
  success: function(data) {
    var dataArr = data.replace(/}{/g, '}|{').split('|');
    var dataParameters = {}
    $.each(dataArr, function(index) {
      dataParameters = $.extend(true, dataParameters, JSON.parse(dataArr[index]));
    });
    chartsObject = dataParameters;
    $.each(dataParameters, function(index, graph) {
      var numberGraph = $('.setting__charts__new-chart').length + 1;
      var nameGraph = Object.keys(graph)[0];
      var parameters = graph[Object.keys(graph)[0]];
      $('#setting__charts').append($(chartEditWindow(nameGraph, numberGraph)));
      $.each(parameters, function(key, value) {
        var id = value['id'], func = value['func'], reg = value['reg'];
        var div = $('#setting__charts').find('.setting__charts__new-chart').eq(numberGraph - 1).find('.setting__charts__new-chart__parameters');
        div.append($(chartParameter(func)));
        idSelect = div.find('.setting__charts__new-chart__parameter').find('.setting__charts__new-chart__parameter__id').eq(key);
        regSelect = div.find('.setting__charts__new-chart__parameter').find('.setting__charts__new-chart__parameter__register').eq(key);
        $.each(arrwidgets, function(i, t) {
          idSelect.append($('<option>').val(i).text(i));
        });
        idSelect.find("option[value='" + id + "']").length > 0 ? idSelect.val(id) : idSelect.val(null);
        if(id in arrwidgets && func in arrwidgets[id]) {
          $.each(arrwidgets[id][func], function(j, r) {
            regSelect.append($('<option>').val(r).text(r));
          });
          regSelect.html(regSelect.find('option').sort(function(a, b) {
            return $(a).text() - $(b).text();
          }));
        }
        regSelect.find("option[value='" + reg + "']").length > 0 ? regSelect.val(reg) : regSelect.val(null);
      });
    });
    $.each(chartsObject, function(i, j) {
      $.each(j, function(n, m) {
        chartsName.push(n);
        $('#charts__menu').append($('<option>').val(n).text(n));
        $.each(m, function(x, y) {
          if (chartsArray.hasOwnProperty(n)) {
            chartsArray[n].push(y['id'] + y['func'] + y['reg']);
          } else {
            chartsArray[n] = [y['id'] + y['func'] + y['reg']];
          }
        }); 
      });
    });
    $.each(chartsArray[chartsName[0]], function(i, j) {
      chart.get(j) ? chart.get(j).setVisible(legendObject[j][1], false) : '';
      chart.get(j) ? chart.get(j).update({showInLegend: legendObject[j][0]}, false) : '';  
    });
    $('#charts__menu').val(chartsName[0]);
    chartPrevios = chartsName[0];
    consoleLog('Завантажено', '\'charts.json\'');
  },
  error: function() {
    consoleLog('Помилка', '\'charts.json\'');
  }
}); 

// Завантаження projectlist.json.
$.ajax({
  type: 'GET',
  url: '/projectlist',
  async: false,
  dataType: 'json',
  success: function(data) {
    $.each(data, function(index) {
      $("#projectlist").prepend(`<option value="${data[index]}">${data[index]}</option>`);
    });
    consoleLog('Завантажено', '\'projectlist.json\'');
  },
  error: function() {
    consoleLog('Помилка', '\'projectlist.json\'');
  }
}); 

//<------------------------------------------------------------------------------------------------------------------------------------------->
//                                                     Початок функцій стосовно графіку.
//<------------------------------------------------------------------------------------------------------------------------------------------->

// Функція кастомного меню легенд графіку.
function chartLegend() {
  if ((chart.legend.currentPage) === 1 || typeof(chart.legend.currentPage) === 'undefined' || chart.legend.pages.length === 0) {
    $('#charts__legend-up').prop('disabled', true);
  } else if (chart.legend.currentPage !== 1) {
    $('#charts__legend-up').prop('disabled', false);
  }
  if ((chart.legend.pages.length - chart.legend.currentPage) <= 3 || typeof(chart.legend.currentPage) === 'undefined'){
    $('#charts__legend-down').prop('disabled', true);
  } else if ((chart.legend.pages.length - chart.legend.currentPage) >= 4) {
    $('#charts__legend-down').prop('disabled', false);
  }
  if (chart.legend.pages.length >= 3) {
    $('.highcharts-legend-box').next('g').attr('clip-path', `inset(calc(${chart.legend.currentPage - 1} * 17.5px) 0 0 0)`)
    chart.legend.nav.attr('display', 'none');
  }
}

// Функця вибору типу выдображаємих параметрів на графіку.
$(document).on('change', '#charts__menu', function() {
  $.each(chartsArray[chartPrevios], function(i, j) {
    chart.get(j) ? chart.get(j).setVisible(false, false): '';
    chart.get(j) ? chart.get(j).update({showInLegend: false}, false) : '';  
  });
  chartPrevios = $('#charts__menu').val();
  $.each(chartsArray[$('#charts__menu').val()], function(i, j) {
    chart.get(j) ? chart.get(j).setVisible(legendObject[j][1], false) : '';
    chart.get(j) ? chart.get(j).update({showInLegend: legendObject[j][0]}, false) : '';  
  });
  chart.redraw(false);
  chart.update({chart: {animation: true}}, false);
});

// Функція гортання навігаційного меню легенд графіка.
$(document).on('click', '#charts__legend-up', function() {
  chart.legend.scroll(-1, 0);
  $('.highcharts-legend-box').next('g').attr('clip-path', `inset(calc(${chart.legend.currentPage - 1} * 17.5px) 0 0 0)`)
  if ((chart.legend.currentPage) === 1) {
    $('#charts__legend-up').prop('disabled', true);
  }
  if ((chart.legend.pages.length - chart.legend.currentPage) >= 4) {
    $('#charts__legend-down').prop('disabled', false);
  }
});

// Функція гортання навігаційного меню легенд графіка.
$(document).on('click', '#charts__legend-down', function() { 
  if ((chart.legend.pages.length - chart.legend.currentPage) === 4){
    $('#charts__legend-down').prop('disabled', true);
  }
  if ((chart.legend.pages.length - chart.legend.currentPage) >= 4){
    chart.legend.scroll(1, 0);
    $('.highcharts-legend-box').next('g').attr('clip-path', `inset(calc(${chart.legend.currentPage - 1} * 17.5px) 0 0 0)`)
  }
  if ((chart.legend.currentPage) !== 1) {
    $('#charts__legend-up').prop('disabled', false);
  }
});

// Функція керування графіком.
$(document).on('click', '#back, #forward, #interval, #play', function() {
  if ($(this).is('#play')) {
    chart.xAxis[0].setExtremes((new Date()).getTime() - timespan, (new Date()).getTime());
    move = true;
  } else {
    var offset = timespan / 6;
    time = move === true ? (new Date()).getTime() : time;
    move = false;
    if ($(this).is('#interval') && $('#fromtime').val() !== '' && $('#totime').val() !== '') {
      var unix =  Math.floor((new Date()).getTime() / 1000);
      unix = unix - (unix % 86400);
      var from = (unix + (Number($('#fromtime').val().slice(0, 2)) * 3600) + ((Number($('#fromtime').val().slice(3)) + (new Date()).getTimezoneOffset()) * 60)) * 1000;
      var to = (unix + (Number($('#totime').val().slice(0, 2)) * 3600) + ((Number($('#totime').val().slice(3)) + (new Date()).getTimezoneOffset()) * 60)) * 1000;
      chart.update({chart: {animation: false}}, false);
      chart.xAxis[0].setExtremes(from, to);
      chart.redraw(false);
      chart.update({chart: {animation: true}}, false);
      time = to;
    } else {
      if ($(this).is('#back')) {
        offset = -offset;
      }
      if ($(this).is('#forward')) {
        offset = offset;
      }
      chart.xAxis[0].setExtremes(time - timespan + offset, time + offset);
      time = time + offset;
      move = time >= (new Date()).getTime() ? true : false;
    }
  }
});

// Функція зберігання легенд.
$(document).on('click', '#savelegend', function() {
  $(this).prop('checked') ? chart.update({plotOptions: {series: {gapSize: 0 }}}) : chart.update({plotOptions: {series: {gapSize: $('#archive').val() * 1000}}});
});

// Функція зрізу параметрів на графіку.
$(document).on('change', '#shared', function() {
  if ($('#shared').prop('checked')) {
    chart.tooltip.update({shared: true}, false);
  } else {
    chart.tooltip.update({shared: false}, false);
  }
});

// Функція переходу до сторінки СД карти.
$(document).on('click', '#getarchive', function() {
  $('#charts__main').css('display', 'none');
  $('#chartsd').css('display', 'block');
});

// Функція очищення графіку.
$(document).on('click', '#clean', function() {
  chart.update({chart: {animation: false}}, false);
  $.each(arrdevice, function(content, [w, r, s, m, p, v, u, l]) {
    if (w) {
      chart.get(r).setData([]);
    }
  });
  chart.redraw(false);
  chart.update({chart: {animation: true}}, false);
});

// Функція зрізу параметрів на графіку.
$(document).on('change', '#timespan', function() {
  timespan = $(this).val();
  chart.update({chart: {animation: false}}, false);
  chart.xAxis[0].setExtremes(chart.xAxis[0].getExtremes().max - timespan, chart.xAxis[0].getExtremes().max);
  chart.redraw(false);
  chart.update({chart: {animation: true}}, false);
});

//<------------------------------------------------------------------------------------------------------------------------------------------->
//                                                       Початок функцій СД карти.
//<------------------------------------------------------------------------------------------------------------------------------------------->

// Функця переходу по текам СД карти.
$(document).on('click', '.dir', function() {
  var data = {list : $(this).next('.value').val()};
  if (data['list'].indexOf('...') !== -1) {
    data['list'] = data['list'].substring(0, data['list'].lastIndexOf('/'));
    data['list'] = data['list'] === '' ? '/' : data['list'];
  }
  var s = data['list'] === '/' ? '' : '/';
  if(data['list'] === '/' && this.closest('#chartsd')) {
    data['list'] = '/archive';
    s = '/';
  }
  sdcard(data, s, this);
});

// Функця відтворення інформації СД карти.
function sdcard(data, s, place) {
  $.get('/sdcard', data, function(response) {
    var d = $(place).closest('.dirlist');
    d.html('');
    d.append($(dirHeader(data))); 
    $.each(response, function(index, item) {
      if (index[0] === 'd') {
        d.append($(dirFolder(data, item, s))); 
      } else if (index[0] === 'f') {
        d.closest('.dirlist').append($(dirFile(data, item, s, response, index)));  
      }
    });
  });
}

// Функця відтворення вікна видалення з СД карти.
$(document).on('click', '.delete', function() {
  if (!created) {
    created = true;
    var m;
    if ($(this).closest('.row').find('.dir').length) {
      m = 'ВИ БАЖАЄТЕ ВИДАЛИТИ ТЕКУ?';
    } else {
      m = 'ВИ БАЖАЄТЕ ВИДАЛИТИ ФАЙЛ?';
    }
  $(this).closest('.row').after($(messageChoice(m)));
  }
});

// Функція підтвердження видалення з СД карти.
$(document).on('click', '#chartsd .yes', function() {
  var click  = this;
  var remove = {};
  var list = {};
  if ($(this).closest('.row').prev('.row').find('.dir').length) {
    remove['removedir'] = $(this).closest('.row').prev('.row').find('.value').val()
    list['list'] = remove['removedir'];
  } else {
    remove['deletefile'] = $(this).closest('.row').prev('.row').find('.value').val()
    list['list'] = remove['deletefile'];
  }
  $.get('/sdcard', remove, function(response) { 
    list['list'] = $('.yes').closest('.row').prev('.row').find('.value').val();
    list['list'] = list['list'].substring(0, list['list'].lastIndexOf('/'));
    list['list'] = list['list'] === '' ? '/' : list['list'];
    var s = list['list'] === '/' ? '' : '/';
    sdcard(list, s, click);
    created = false;
  });
});

// Функція завантаження архіву.
$(document).on('click', '.upload', function() {
  var element = $(this);
  var path = {};
  path['name'] = $(this).closest('.row').find('.value').val();
  var file = $(this).closest('.row').find('label:first-child').text();
  file = file.substring(0, file.lastIndexOf('.'));
  $('.upload').prop('disabled', true);
  $.get('/name', path, function() { 
    $.get(path['name'], function(data) {
      var begin;
      var end;
      var arr = data.split('\n');
      var csv = [];
      var temp;
      begin = JSON.parse(arr[0])['time']+ ((new Date()).getTimezoneOffset() * 60);
      end = JSON.parse(arr[arr.length - 2])['time'] + ((new Date()).getTimezoneOffset() * 60);
      move = false;
      chart.update({chart: {animation: false}}, false);
      chart.xAxis[0].setExtremes(begin * 1000, end * 1000);
      time = end * 1000;
      $.each(arr.slice(0, -1), function(index) {
        temp = JSON.parse(arr[index]);
        csv.push(JSON.parse(arr[index]))
        var x = (temp['time'] * 1000) + (new Date().getTimezoneOffset() * 1000 * 60);
        $.each(arrdevice, function(content, [w, r, s, m, p , v, u, l]) {
          if (w) {
            if(chart.get(r).xData.indexOf(x) === -1 && temp[r] !== '-') {
              s ? chart.get(r).addPoint([x, converter(temp[r], m, p)], false, false, false, false) : chart.get(r).addPoint([x, Number(temp[r])], false, false, false, false);
            }
          }
        });
      });
      var csvData = convertJsonToCsv(csv);
      var blob = new Blob([csvData], {type: "text/csv;charset=utf-8;" });
      var downloadLink = (`<a href="${URL.createObjectURL(blob)}" download="${file + '.csv'}" class="alert-link">${file + '.csv'}</a>`);
      alert('Файл архіву: ' + downloadLink, 'secondary', element.closest('.row'));
      chart.redraw(false);
      chart.update({chart: {animation: true}}, false);
    }, 'text')
    .done(function() {
      $('.upload').prop('disabled', false);
    })
    .fail(function() {
      $('.upload').prop('disabled', false);
    });
  });
});

// Функція повернення до сторінки графіку.
$(document).on('click', '.backfromhide', function() {
  if($(this).closest('#chartsd').length) {
    $('#chartsd').css('display', 'none');
    $('#charts__main').css('display', 'block');
  }
});

//Функція конвертації у CSV.
function convertJsonToCsv(jsonObjects) {
  var csvString = "";
  var headers = [];
  if (jsonObjects.length > 0) {
    $.each(jsonObjects, function(i, j) {
      $.each(j, function(key, value) {
        $.inArray(key, headers) === -1 ? headers.push(key) : '';
      });
    });
    var arr = ["ip", "modbus", "cycle", "file"]
    headers = $.grep(headers, function(item) {
      return $.inArray(item, arr) === -1;
    });
    csvString += headers.join(";") + "\n";
    for (var i = 0; i < jsonObjects.length; i++) {
      var row = [];
      for (var j = 0; j < headers.length; j++) {
        var key = headers[j];
        var value = jsonObjects[i][key];
        if (key === "ip" || key === "modbus" || key === "cycle" || key === "file") {
          continue;
        }
        row.push(value);
      }
      csvString += row.join(";") + "\n";
    }
  }
  return csvString;
}

//<------------------------------------------------------------------------------------------------------------------------------------------->
//                                                 Початок функцій налаштування приладу.
//<------------------------------------------------------------------------------------------------------------------------------------------->

// Функція встановлення часу/дати.
$(document).on('click', '.settime', function() {
  var time = new Date();
  var data = {
    yyyy : time.getUTCFullYear(),
    dd : time.getUTCDate(),
    mm : time.getUTCMonth() + 1,
    h : time.getUTCHours() - (time.getTimezoneOffset() / 60),
    m : time.getUTCMinutes(),
    s : time.getUTCSeconds()
  }
  $.get('/settime', data);
});

// Функція перезавантаження пристрою.
$(document).on('click', '.reboot', function() {
  $.get('/reboot', function() {});
});

// Фукнція зберігання налаштувань.
$(document).on('click', '.savesetting', function() {
  var clicked = event.target.closest('.row');
  var data = {
    ssid: $('#ssid').val(),
    password: $('#password').val(),
    wifimode: $('input[name=wifimode]:checked').val(),
    apname: $('#apname').val(),
    appassword: $('#appassword').val(),
    ipmode: $('input[name=ipmode]:checked').val(),
    dns: $('#dns').val(),
    localip: $('#localip').val(),
    gateway: $('#gateway').val(),
    subnet: $('#subnet').val(),
    speed: $('#speed').val(),
    delay: $('#delay').val(),
    archive: $('#archive').val(),
  };
  if (formValidator($('#netsetting'))) {
    $.ajax({
      type: 'POST',
      url: '/savesetting',
      timeout: 2000,
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json',
      success: function() {
        alert('УСПІШНЕ ЗБЕРІГАННЯ НАЛАШТУВАНЬ', 'success', clicked);
      },
      error: function() {
        alert('ПОМИЛКА ЗБЕРІГАННЯ НАЛАШТУВАНЬ', 'danger', clicked);
      }
    });
  } else {
    alert('ВВЕДІТЬ ЗНАЧЕННЯ', 'warning', clicked);
  }
});

// Функція відображення меню редагування віджетів.
$(document).on('change', '#widgetmenu', function() {
  var check = $('#widgetmenu').prop('checked');
  var div = $('.main__header__page-count, .widgetmenushow, #widgetswindow');
  var disable = $('.widget button,.widget input');
  disable.prop('disabled', check);
  check ? div.removeClass('d-none') : div.addClass('d-none');
  widgetsPages();
});

//<------------------------------------------------------------------------------------------------------------------------------------------->
//                                                 Початок функцій налаштування параметрів.
//<------------------------------------------------------------------------------------------------------------------------------------------->

// Функція зберігання приладів.
$(document).on('click', '#saveparametres', function() {
  var num = 0;
  var button = $(this);
  var div = button.closest('.row');
  var idNewArr = [];
  var idOldArr = [];
  var clicked = event.target.closest('.row');
  var devicearr = {};
  var reg = {}
  var regarr = [];
  $('.device').each(function(i) {
    var nameDevice = $(this).find('.namedevice').val();
    var idDevice = $(this).find('.iddevice').val();
    var cycleTimeDevice = $(this).find('.startdelay').val();
    var responceTimeDevice = $(this).find('.resdelay').val();
    var requestTimeDevice = $(this).find('.reqdelay').val();
    var toggleDevice = $(this).find('.onoffdevice').prop('checked');
    var device = {
      1 : nameDevice,
      2 : idDevice,
      3 : cycleTimeDevice,
      4 : responceTimeDevice,
      5 : requestTimeDevice,
      6 : toggleDevice,
      7 : {}
    }
    reg[idDevice] =  {
      'sd' : cycleTimeDevice,
      'res' : responceTimeDevice,
      'req' : requestTimeDevice,
      'rc' : [],
      'ris' : [],
      'rhr' : [],
      'rhrf' : [],
      'rhrif' : [],
      'rir' : [],
      'rirf' : [],
      'ririf' : []
    }
    $(this).find('.parametres').each(function(j) {
      var registerParameter = $(this).find('.register').val();
      var functionParameter =  $(this).find('.function').val();
      var typeParameter = $(this).find('.type').val();
      var multiplierParameter = $(this).find('.mul').val();
      var pointParameter = $(this).find('.point').val();
      var unitParameter =$(this).find('.units').val();
      var nameParameter =  $(this).find('.name').val();
      var colorParameter = $(this).find('.illum').val();
      var toggleParameter = $(this).find('.graph').prop('checked');
      var parametres = {
        1 : registerParameter,
        2 : functionParameter,
        3 : typeParameter,
        4 : multiplierParameter,
        5 : pointParameter,
        6 : unitParameter,
        7 : nameParameter,
        8 : colorParameter,
        9 : toggleParameter,
      }
      device['7'][j] = parametres;
      if (!device['6']) {
        return
      }
      switch (functionParameter) {
        case '1':
          reg[idDevice]['rc'].push(registerParameter);
          break;
        case '2':
          reg[idDevice]['ris'].push(registerParameter);
          break;
        case '3':
          reg[idDevice]['rhr'].push(registerParameter);
          switch (typeParameter) {
            case '3':
              reg[idDevice]['rhr'].push(Number(registerParameter) + 1);
              reg[idDevice]['rhrf'].push(registerParameter);
              break;
            case '4':
              reg[idDevice]['rhr'].push(Number(registerParameter) + 1);
              reg[idDevice]['rhrif'].push(registerParameter);
              break; 
            }
          break;
        case '4':
          reg[idDevice]['rir'].push(registerParameter);
          switch (typeParameter) {
            case '3':
              reg[idDevice]['rir'].push(Number(registerParameter) + 1);
              reg[idDevice]['rirf'].push(registerParameter);
              break;
            case '4':
              reg[idDevice]['rir'].push(Number(registerParameter) + 1);
              reg[idDevice]['ririf'].push(registerParameter);
              break; 
            }
          break;
      }
    });
    devicearr[i] = device;
    idNewArr.push(idDevice);
  });
  $.each(arrwidgets, function(i, a) {
    idOldArr.push(i);
  });
  var idOld = getUniqueNumbers(idOldArr, idNewArr);
  var idNew = getUniqueNumbers(idNewArr, idOldArr);
  $.each($('.widget'), function() {
    var key = $(this).attr('data-properties');
    if (widgetsObject[key][1] === idOld[0]) {
      widgetsObject[key][1] = idNew[0];
    }
  });
  $.each(chartsObject, function(i, j) {
    $.each(j, function(n, m) {
      $.each(m, function(x, y) {
        if (y['id'] === idOld[0]) {
          y['id'] = idNew[0];
          $('.setting__charts__new-chart__parameter__id').eq(num).find('option[value="' + idOld[0] + '"]').remove();
          $('.setting__charts__new-chart__parameter__id').eq(num).append($('<option>').val(idNew[0]).text(idNew[0]).prop('selected', true));
        }
        num++;
      }); 
    });
  });
  if (idNew[0] !== idOld[0]) {
    arrwidgets[idNew[0]] = arrwidgets[idOld[0]];
    delete arrwidgets[idOld[0]]
  }
  $.each(reg, function(index, value) {
    reg[index]['rc'] = registersSort(reg[index]['rc']);
    reg[index]['ris'] = registersSort(reg[index]['ris']);
    reg[index]['rhr'] = registersSort(reg[index]['rhr']);
    reg[index]['rir'] = registersSort(reg[index]['rir']);
  });
  $.each(reg, function(index, value) {
    regarr.push(index);
    regarr.push(value);
  });
  if (!$('.device').length) {
    button.prop('disabled', true);
    var sendArray = {};
    $.ajax({
      type: 'POST',
      url: '/saveparameters',
      timeout: 2000,
      data: JSON.stringify(sendArray),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function() {
        $.ajax({
          type: 'POST',
          url: '/saveparameters/end',
          timeout: 2000,
          success: function() {
            button.prop('disabled', false);
            alert('УСПІШНЕ ЗБЕРІГАННЯ ПАРАМЕТРІВ', 'success', clicked);
          },
          error: function() {
            button.prop('disabled', false);
            alert('ПОМИЛКА ЗБЕРІГАННЯ ПАРАМЕТРІВ', 'danger', clicked);
          }
        });
      },
      error: function() {
        button.prop('disabled', false);
        alert('ПОМИЛКА ЗБЕРІГАННЯ ПАРАМЕТРІВ', 'danger', clicked);
      }
    });
  } else if (formValidator($('#devices'))) {
    $(this).prop('disabled', true);
    div.append(progressBar);
    var progress = $('.progress-bar');
    sendParameters(0, 0);
  } else {
    alert('ВВЕДІТЬ ЗНАЧЕННЯ', 'warning', clicked);
  }
  var number = 0;
  function sendParameters(n, m) {
    var sendArray = {};
    $.each(devicearr, function(i, device) {
      if (Number(i) >= n) {
        number++
        var index = 0;
        sendArray[i] = JSON.parse(JSON.stringify(device));
        sendArray[i]['7'] = {};
        var deviceLength = Object.keys(devicearr).length - 1;
        var parametersLength = Object.keys(device['7']).length -1;
        if (parametersLength < 0) {
          $('#save__progress-bar').remove();
          button.prop('disabled', false);
          alert('НЕМАЄ ПАРАМЕТРІВ У #' + (+i + 1), 'warning', clicked);
        }
        $.each(device['7'], function(j, parameter) {
          if (Number(j) >= m) {
            sendArray[i]['7'][j] = parameter;
            if (index === 50 || Number(j) === parametersLength) {
              $.ajax({
                type: 'POST',
                url: '/saveparameters',
                timeout: 2000,
                data: JSON.stringify(sendArray),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function() {
                  number += index
                  progress.css('width', number / $('.parametres').length  * 100 + '%');
                  if (Number(i) <= deviceLength) {
                    Number(j) < parametersLength ? sendParameters(i, Number(j) + 1) : '';
                    Number(j) === parametersLength ? sendParameters(Number(i) + 1, 0) : '';
                  }
                  if (Number(i) === deviceLength && Number(j) === parametersLength) {
                    $.ajax({
                      type: 'POST',
                      url: '/saveparameters/end',
                      timeout: 2000,
                      success: function() {
                        $('#save__progress-bar').remove();
                        alert('УСПІШНЕ ЗБЕРІГАННЯ ПАРАМЕТРІВ', 'success', clicked);
                        $.ajax({
                          type: 'POST',
                          url: '/saveregisters',
                          timeout: 2000,
                          data: JSON.stringify(regarr),
                          contentType: 'application/json; charset=utf-8',
                          dataType: 'json',
                          success: function() {
                            button.prop('disabled', false);
                            alert('УСПІШНЕ ЗБЕРІГАННЯ РЕГІСТРІВ', 'success', clicked);
                          },
                          error: function() {
                            button.prop('disabled', false);
                            alert('ПОМИЛКА ЗБЕРІГАННЯ РЕГІСТРІВ', 'danger', clicked);
                          }
                        });
                      },
                      error: function() {
                        button.prop('disabled', false);
                        $('#save__progress-bar').remove();
                        alert('ПОМИЛКА ЗБЕРІГАННЯ ПАРАМЕТРІВ', 'danger', clicked);
                      }
                    });
                  }
                },
                error: function() {
                  button.prop('disabled', false);
                  $('#save__progress-bar').remove();
                  alert('ПОМИЛКА ЗБЕРІГАННЯ ПАРАМЕТРІВ', 'danger', clicked);
                }
              });
              return false;
            }
            index++
          }
        });
        return false;
      }
    });
  }
});

// Функція редагування приладів.
$(document).on('click', '#add, .deletedevice, .updevice, .downdevice', function() {
  var button = $(this);
  var div = $(this).closest('.device');
  var addDevice = '#add';
  var removeDevice = '.deletedevice';
  var scrollUpDevice = '.updevice';
  var scrollDownDevice = '.downdevice';
  var numberdevice = $('.device').length + 1;
  button.is(addDevice) ? $("#devices").append($(html__elementdevice(numberdevice, '', '', '', '', ''))) : '';
  if (button.is(removeDevice)) {
    div.remove();
    $.each($('.device'), function(index) {
      $(this).find('.opendevice').attr('data-bs-target', '#collapse' + (index + 1));
      $(this).find('.onoffdevice').attr('id', 'id' + (index + 1));
      $(this).find('.onoffdevice').next('label').attr('for', 'id' + (index + 1));
      $(this).find('.elements').attr('id', 'collapse' + (index + 1));
    });
  }
  button.is(scrollUpDevice) ? div.insertBefore(div.prev('.device')) : '';
  button.is(scrollDownDevice) ? div.insertAfter(div.next('.device')) : '';
});

// Функція редагування параметрів.
$(document).on('click', '.addparameter, .del, .up, .down', function() {
  var button = $(this);
  var div = $(this).closest('.parametres');
  var device = $(this).closest('.device').find(".elements");
  var addParameters = '.addparameter';
  var removeParameters = '.del';
  var scrollUpParameters = '.up';
  var scrollDownParameters = '.down'
  button.is(addParameters) ? device.append($(html__elementparametres('', '1', '1', '', '', '', '', '', getRandomColor(), false))).addClass('show') : '';
  button.is(removeParameters) ? div.remove() : '';
  button.is(scrollUpParameters) ? div.insertBefore(div.prev('.parametres')) : '';
  button.is(scrollDownParameters) ? div.insertAfter(div.next('.parametres')) : '';
});

// Функція приховування елементів вікна опитування регістрів.
$(document).on('change', '.function', function() {
  if (['3', '4'].includes($(this).closest('.parametres').find('.function').val())) {
    $(this).closest('.parametres').find('.mul, .point, .units').prop('disabled', false);
    $(this).closest('.parametres').find('.type option[value ="1"]').prop('disabled', true);
    $(this).closest('.parametres').find('.type option[value ="2"], .type option[value ="3"], .type option[value ="4"]').prop('disabled', false);
    $(this).closest('.parametres').find('.type').val('2');
  } else {
    $(this).closest('.parametres').find('.mul, .point, .units').prop('disabled', true);
    $(this).closest('.parametres').find('.type option[value="1"]').prop('disabled', false);
    $(this).closest('.parametres').find('.type option[value="2"], .type option[value="3"], .type option[value ="4"]').prop('disabled', true);
    $(this).closest('.parametres').find('.type').val('1');
  }
});

//<------------------------------------------------------------------------------------------------------------------------------------------->
//                                                          ПАРАМЕТРИ ГРАФІКІВ.
//<------------------------------------------------------------------------------------------------------------------------------------------->

// Функції додавання нових графиків.
$(document).on('click', '#setting__charts_add__new-chart, .setting__charts__new-chart__add-parameters, .setting__charts__new-chart__remove-chart', function() {
  var button = $(this);
  var n = $('.setting__charts__new-chart').length + 1;
  var mainWindow = $('#setting__charts');
  var chartsWindow = $(this).closest('.setting__charts__new-chart');
  var parametersWindow = chartsWindow.find('.setting__charts__new-chart__parameters');
  var addChart = '#setting__charts_add__new-chart';
  var addParameter = '.setting__charts__new-chart__add-parameters';
  var removeChart = '.setting__charts__new-chart__remove-chart';
  button.is(addChart) ? mainWindow.append($(chartEditWindow('', n))) : '';
  if (button.is(addParameter)) {
    parametersWindow.append($(chartParameter('', '', ''))).addClass('show');
    var parameterWindow = parametersWindow.find('.setting__charts__new-chart__parameter');
    $.each(arrwidgets, function(i, t) {
      parameterWindow.find('.setting__charts__new-chart__parameter__id').eq(parameterWindow.find('.setting__charts__new-chart__parameter__id').length - 1).append($('<option>').val(i).text(i));
    });
  }
  if (button.is(removeChart)) {
    chartsWindow.remove();
    $.each($('.setting__charts__new-chart'), function(index) {
      $(this).find('.setting__charts__new-chart__open-folder').attr('data-bs-target', '#collapse__chart__' + (index + 1));
      $(this).find('.setting__charts__new-chart__parameters').attr('id', 'collapse__chart__' + (index + 1));
    });
  }
});

// Функція видалення графика.
$(document).on('click', '.setting__charts__new-chart__parameter__remove', function() {
  $(this).closest('.setting__charts__new-chart__parameter').remove();
});

// Функція збереження графиків.
$(document).on('click', '#setting__charts__save-charts', function() {
  var button = $(this);
  var div = button.closest('.row');
  var clicked = event.target.closest('.row');
  var chartsObjectTemp = {};
  $.each($('.setting__charts__new-chart'), function(i) {
    var key = $(this).find('.setting__charts__new-chart__name').val();
    var parameters = $(this).find('.setting__charts__new-chart__parameter');
    var chartObjectTemp = {[key] : {}}; 
    $.each(parameters, function(j) {
      var id = parameters.eq(j).find('.setting__charts__new-chart__parameter__id').val();
      var func = parameters.eq(j).find('.setting__charts__new-chart__parameter__function').val();
      var reg = parameters.eq(j).find('.setting__charts__new-chart__parameter__register').val();
      var parametersObjectTemp = {
        id: id,
        func: func,
        reg: reg
      }
      chartObjectTemp[key][j] = parametersObjectTemp;
    });
    chartsObjectTemp[i] = chartObjectTemp;
  });
  if (!$('.setting__charts__new-chart').length) {
    button.prop('disabled', true);
    var sendArray = {};
    $.ajax({
      type: 'POST',
      url: '/savecharts',
      timeout: 2000,
      data: JSON.stringify(sendArray),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function() {
        $.ajax({
          type: 'POST',
          url: '/savecharts/end',
          timeout: 2000,
          success: function() {
            button.prop('disabled', false);
            alert('УСПІШНЕ ЗБЕРІГАННЯ ГРАФІКІВ', 'success', clicked);
          },
          error: function() {
            button.prop('disabled', false);
            alert('ПОМИЛКА ЗБЕРІГАННЯ ГРАФІКІВ', 'danger', clicked);
          }
        });
      },
      error: function() {
        button.prop('disabled', false);
        alert('ПОМИЛКА ЗБЕРІГАННЯ ГРАФІКІВ', 'danger', clicked);
      }
    });
  } else if (formValidator($('#setting__charts'))) {
    button.prop('disabled', true);
    div.append(progressBar);
    var progress = $('.progress-bar');
    sendCharts(0, 0);
  } else {
    alert('ВВЕДІТЬ ЗНАЧЕННЯ', 'warning', clicked);
  }
  var num = 0;
  function sendCharts(n, m) {
    var sendArray = {};
    $.each(chartsObjectTemp, function(i, device) {
      if (Number(i) >= n) {
        num++;
        var index = 0;
        sendArray[i] = JSON.parse(JSON.stringify(device));
        sendArray[i][Object.keys(device)[0]] = {};
        var deviceLength = Object.keys(chartsObjectTemp).length - 1;
        var parametersLength = Object.keys(device[Object.keys(device)[0]]).length - 1;
        if (parametersLength < 0) {
          $('#save__progress-bar').remove();
          button.prop('disabled', false);
          alert('НЕМАЄ ПАРАМЕТРІВ У #' + (+i + 1), 'warning', clicked);
        }
        $.each(device[Object.keys(device)[0]], function(j, parameter) {
          if (Number(j) >= m) {
            sendArray[i][Object.keys(device)[0]][j] = parameter;
            if (index === 50 || Number(j) === parametersLength) {
              $.ajax({
                type: 'POST',
                url: '/savecharts',
                timeout: 2000,
                data: JSON.stringify(sendArray),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function() {
                  num += index;
                  progress.css('width', num / $('.setting__charts__new-chart__parameter').length * 100 + '%');
                  if (Number(i) <= deviceLength) {
                    Number(j) < parametersLength ? sendCharts(i, Number(j) + 1) : '';
                    Number(j) === parametersLength ? sendCharts(Number(i) + 1, 0) : '';
                  }
                  if (Number(i) === deviceLength && Number(j) === parametersLength) {
                    $.ajax({
                      type: 'POST',
                      url: '/savecharts/end',
                      timeout: 2000,
                      success: function() {
                        button.prop('disabled', false);
                        $('#save__progress-bar').remove();
                        alert('УСПІШНЕ ЗБЕРІГАННЯ ГРАФІКІВ', 'success', clicked);
                      },
                      error: function() {
                        button.prop('disabled', false);
                        $('#save__progress-bar').remove();
                        alert('ПОМИЛКА ЗБЕРІГАННЯ ГРАФІКІВ', 'danger', clicked);
                      }
                    });
                  }
                },
                error: function() {
                  button.prop('disabled', false);
                  $('#save__progress-bar').remove();
                  alert('ПОМИЛКА ЗБЕРІГАННЯ ГРАФІКІВ', 'danger', clicked);
                }
              });
              return false;
            }
            index++
          }
        });
        return false;
      }
    });
  }
});

// Функції додавання нових параметрів.
$(document).on('change', '.setting__charts__new-chart__parameter__id, .setting__charts__new-chart__parameter__function', function() {
  var parent = $(this).closest('.setting__charts__new-chart__parameter');
  var id = parent.find('.setting__charts__new-chart__parameter__id');
  var func = parent.find('.setting__charts__new-chart__parameter__function');
  var reg = parent.find('.setting__charts__new-chart__parameter__register');
  reg.empty().prepend($('<option>', {value: '', text: 'REG', disabled: 'disabled', selected: 'selected'}));;
  if(id.val() in arrwidgets && func.val() in arrwidgets[id.val()]) {
    $.each(arrwidgets[id.val()][func.val()], function(i, r) {
      reg.append($('<option>').val(r).text(r));
    });
    reg.html(reg.find('option').sort(function(a, b) {
      return $(a).text() - $(b).text();
    }));
  }
});
//<------------------------------------------------------------------------------------------------------------------------------------------->
//                                                  Початок функцій менеджеру проєктів.
//<------------------------------------------------------------------------------------------------------------------------------------------->
// Функція створення нового проєкту.
$(document).on('click', '#clearproject', function() {
  var clicked = event.target.closest('.row');
  var data = {
    name: $('#projectname').val()
  }
  if (formValidator($('#setting__project'))) {
    $.get('/projectnew', data)
    .done(function() {
      if (!$(`#projectlist option[value="${$('#projectname').val()}"]`).length) {
        $("#projectlist").prepend(`<option value="${$('#projectname').val()}">${$('#projectname').val()}</option>`);
      }
      alert('УСПІШНЕ СТВОРЕННЯ ПРОЄКТУ', 'success', clicked);
      $('#projectname').val('');
    })
    .fail(function() {
      alert('ПОМИЛКА СТВОРЕННЯ ПРОЄКТУ', 'danger', clicked);
      $('#projectname').val('');
    });
  } else {
    alert('ВВЕДІТЬ НАЗВУ ПРОЄКТУ', 'warning', clicked);
  }
});

// Функція зберігання проєкту.
$(document).on('click', '#saveproject', function() {
  var button = $(this);
  var clicked = event.target.closest('.row');
  var data = {
    name: $('#projectname').val()
  }
  if (formValidator($('#setting__project'))) {
    button.prop('disabled', true);
    $.get('/saveproject', data)
    .done(function() {
      button.prop('disabled', false);
      if (!$(`#projectlist option[value="${$('#projectname').val()}"]`).length) {
        $("#projectlist").prepend(`<option value="${$('#projectname').val()}">${$('#projectname').val()}</option>`);
      }
      alert('УСПІШНЕ ЗБЕРІГАННЯ ПРОЄКТУ', 'success', clicked);
      $('#projectname').val('');
    })
    .fail(function() {
      button.prop('disabled', false);
      alert('ПОМИЛКА ЗБЕРІГАННЯ ПРОЄКТУ', 'danger', clicked);
      $('#projectname').val('');
    });
  } else {
    alert('ВВЕДІТЬ НАЗВУ ПРОЄКТУ', 'warning', clicked);
  }
});

// Функція видаленя проєкту.
$(document).on('click', '#projectremove', function() {
  if (!created) {
    created = true;
    var m = 'БАЖАЄТЕ ВИДАЛИТИ ПРОЄКТ?';
    $(this).closest('.row').after($(messageChoice(m))).next('.row').addClass('mt-1');
  }
});

// Функція підтвердження видалення з СД карти.
$(document).on('click', '#setting__project .yes', function() {
  var data = {
    name: $('#projectlist').val()
  }
  $.get('/projectremove', data);
  $(this).closest('.row').remove();
  $(`#projectlist option[value="${$('#projectlist').val()}"]`).remove();
  created = false;
});

// Функція завантаження проєкту.
$(document).on('click', '#loadproject', function() {
  var button = $(this);
  var clicked = event.target.closest('.row');
  var data = {
    name: $('#projectlist').val()
  }
  button.prop('disabled', true);
  $.get('/loadproject', data)
  .done(function() {
    button.prop('disabled', false);
    alert('УСПІШНЕ ЗАВАНТАЖЕННЯ ПРОЄКТУ', 'success', clicked);
  })
  .fail(function() {
    button.prop('disabled', false);
    alert('ПОМИЛКА ЗАВАНТАЖЕННЯ ПРОЄКТУ', 'danger', clicked);
  });
});

//<------------------------------------------------------------------------------------------------------------------------------------------->
//                                                 Початок функцій редагування віджетів.
//<------------------------------------------------------------------------------------------------------------------------------------------->

// Функція взаємодії іконок віджетів.
$(document).on('change', '#widgetswap, #widgetsort, #widgetedit', function() {
  var widgetWindow = $('#widgetswindow');
  var widgetOpen = $('#widgetopen');
  var widgetSwap = $('#widgetswap');
  var widgetSwapCheck = $('#widgetswap').prop('checked');
  var widgetSort = $('#widgetsort');
  var widgetSortCheck = $('#widgetsort').prop('checked');
  var widgetEdit = $('#widgetedit');
  var widgetEditCheck = $('#widgetedit').prop('checked');
  widgetEditCheck ? widgetWindow.collapse('hide') : widgetWindow.collapse('hide');
  widgetOpen.prop('disabled', widgetSortCheck || widgetEditCheck);
  widgetSwap.prop({
    disabled: !widgetSortCheck,
    checked: widgetSwapCheck && widgetSortCheck
  });
  widgetSort.prop('disabled', widgetEditCheck);
  widgetEdit.prop('disabled', widgetSortCheck);
  sortable.option('disabled', !widgetSortCheck);
  sortable.option('swap', widgetSwapCheck);
});

// Фукція натискання на іконку редагування віджетів.
$(document).on('change', '#widgetedit', function() {
  var disable = $('.widget button,.widget input');
  var w = $('#widgets');
  var widgetEditCheck = $('#widgetedit').prop('checked');
  var widgetSandBox = $('.main__edit__widgets-sandbox');
  w.html('');
  widgetEditCheck ? widgetSandBox.addClass('d-none') : widgetSandBox.removeClass('d-none');
  disable.prop('disabled', widgetEditCheck);
});

// Функція зберігання віджетів.
$(document).on('click', '#savewidgets', function() {
  var button = $(this);
  var wi =  event.target.closest('.row');
  var div = $(this).closest('.row')
  $.each($('.widget'), function(j) {
    var name = $(this).attr('data-properties');
    widgetsObject[name][9] = j;
  });
  div.append(progressBar);
  var progress = $('.progress-bar');
  button.prop('disabled', true);
  sendWidgets(0);
  function sendWidgets(n) {
    var sendArray = {};
    var index = 0;
    var length = $('.widget').length - 1;
    $.each($('.widget'), function(i) {
      var name = $(this).attr('data-properties');
      if (i >= n) {
        sendArray[name] = widgetsObject[name];
        if (index === 20 || i === length) {
          $.ajax({
            type: 'POST',
            url: '/savewidgets',
            timeout: 10000,
            data: JSON.stringify(sendArray),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function() {
              progress.css('width', i / length * 100 + '%');
              if (i < length) {
                sendWidgets(i + 1);
              } 
              if (i === length) {
                $.ajax({
                  type: 'POST',
                  url: '/savewidgets/end',
                  timeout: 10000,
                  success: function() {
                    button.prop('disabled', false);
                    $('#save__progress-bar').remove();
                    alert('УСПІШНЕ ЗБЕРІГАННЯ ВІДЖЕТІВ', 'success', wi);
                  },
                  error: function() {
                    button.prop('disabled', false);
                    $('#save__progress-bar').remove();
                    alert('ПОМИЛКА ЗБЕРІГАННЯ ВІДЖЕТІВ', 'danger', wi);
                  }
                });
              }
            },
            error: function() {
              button.prop('disabled', false);
              $('#save__progress-bar').remove();
              alert('ПОМИЛКА ЗБЕРІГАННЯ ВІДЖЕТІВ', 'danger', wi);
            }
          });
          return false;
        }
        index++;
      }
    });
  }
});

// Функція додавання нового віджета.
$(document).on('click', '#addwidget', function() {
  var name = Math.floor(Math.random() * 1000) + Date.now();
  widgetsObject[name] = {
    0: $('#widgetitem').val(),
    1: null,
    2: null,
    3: null,
    4: '3',
    5: '0',
    6: false,
    7: '2',
    8: $('.main__sortable:not(.d-none)').index(),
    9: '',
    10 : {}
  }
  var p = $('.main__sortable:not(.d-none)');
  switch($('#widgetitem').val()) {
    case '1' :
      widgetsObject[name][10] = {
        0: body_bg,
        1: emphasis_color
      }
      p.append($(widgetIndicator(widgetsObject[name], name)));
      break;
    case '2' :
      widgetsObject[name][10] = {
        0: '',
        1: body_color,
        2: body_bg,
        3: '',
        4: body_bg,
        5: emphasis_color
      }
      p.append($(widgetTextIndicator(widgetsObject[name], name)));
      break;  
    case '3' :
      widgetsObject[name][10] = {
        0: 'PUSH',
        1: '',
        2: body_color,
      }
      p.append($(widgetButton(widgetsObject[name], name)));
      break;
    case '4' :
      widgetsObject[name][4] = null;
      widgetsObject[name][10] = {
        0: '',
        1: '0',
      }
      p.append($(widgetTask(widgetsObject[name], name)));
      break;
    case '5' :
      p.append($(widgetRegisterValue(widgetsObject[name], name)));
      break;
    case '6' :
      widgetsObject[name][10] = {
        0: 'TEXT',
        1: 'text-start',
      }
      p.append($(widgetText(widgetsObject[name], name)));
      break;
    case '7' :
      widgetsObject[name] = {
        0: $('#widgetitem').val(),
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: '2',
        8: $('.main__sortable:not(.d-none)').index(),
        9: '',
        10: {}
      }
      p.append($(widgetLine(widgetsObject[name], name)));
      break;
    case '8' :
      widgetsObject[name][10] = {
        0: 'TEXT',
        1: '',
      }
      p.append($(widgetDynamicText(widgetsObject[name], name)));
      break;
    case '9' :
      widgetsObject[name][10] = {
        0: '',
        1: body_color,
        2: body_bg,
        3: '',
        4: body_bg,
        5: emphasis_color,
        6: 0
      }
      p.append($(widgetIndicatorBit(widgetsObject[name], name)));
  }
});

// Функція редагування віджету.
$('#widgetmain').on('click', '.widget', function(event) {
  var e = $(this);
  var name = $(this).attr('data-properties');
  var d = widgetsObject[$(this).attr('data-properties')];
  var w = $('#widgets');
  if ($('#widgetedit').prop('checked')) {
    w.html('');
    w.append($(widgetEditMain(d)));
    switch (d[0]) {
      case '1' :
        w.find('.row').prepend($(widgetEditIndicator(d)));
        $('#widgetname').val('Індикатор');
        break;
      case '2' :
        w.find('.row').prepend($(widgetEditTextIndicator(d)));
        $('#widgetname').val('Індикатор з надписом');
        break;
      case '3' :
        w.find('.col-4').replaceWith(
          '<div class="col-4 mt-2">'+
            '<input type="number" inputmode="numeric" placeholder="REG" class="form-control form-control-sm text-center form__validator" id="widgetregister">'+
          '</div>'
        );
        w.find('.row').prepend($(widgetEditButton(d)));
        $('#widgetname').val('Кнопка');
        break;
      case '4' :
        w.find('.col-4').replaceWith(
          '<div class="col-4 mt-2">'+
            '<input type="number" inputmode="numeric" placeholder="REG" class="form-control form-control-sm text-center form__validator" id="widgetregister">'+
          '</div>'
        );
        w.find('.row').prepend($(widgetEditTask(d)));
        $('#widgetname').val('Завдання');
        break;
      case '5' :
        $('#widgetname').val('Значення регістру');
        break;
      case '6' :
        w.find('.row').prepend($(widgetEditText(d)));
        $('#widgetname').val('Надпис');
        break;
      case '7' :
        $('#widgetname').val('Горизонтальна лінія');
        break;
      case '8' :
        var arrNumber = 0;
        $('#widgetname').val('Дінамічний надпис');
        $.each(d[10], function(i) {
          if((Number(i) + 2) % 2) {
            return
          }
          if (arrNumber === 0) {
            w.find('#widgetid').parent().before($(widgetEditDynamicTextFirst(d, i)));
          } else {
            w.find('#widgetid').parent().before($(widgetEditDynamicTextNext(d, i)));
          }
          arrNumber += 1;
        });
        break;
      case '9' :
        w.find('.row').prepend($(widgetEditTextIndicatorBit(d)));
        $('#widgetname').val('Індикатор з надписом (біт)');
        break;
    }
    setdata(d);
    $('#widgetswindow').collapse('show');
    $('#setwidget').on('click', function() {
      if (formValidator($('#widgets'))) {
        var n = getwidgetdata(d);
        if (n[6] === true && !e.prev('div').hasClass('clearfix')) {
          var div = $('<div>').addClass('clearfix');
          div.insertBefore(e);  
        } else if (n[6] === false && e.prev('div').hasClass('clearfix')) {
          e.prev('div').remove();
        }
        switch (d[0]) {
          case '1' :
            n[10][0] = $('.ledfalse').val();
            n[10][1] = $('.ledtrue').val();
            e.replaceWith($(widgetIndicator(n, name)));
            break;
          case '2' :
            n[10][0] = $('.textledfalse').val();
            n[10][1] = $('.textfalse').val();
            n[10][2] = $('.ledfalse').val();
            n[10][3] = $('.textledtrue').val();
            n[10][4] = $('.texttrue').val();
            n[10][5] = $('.ledtrue').val();
            e.replaceWith($(widgetTextIndicator(n, name)));
            break;
          case '3' :
            n[10][0] = $('.buttontext').val();
            n[10][1] = $('.buttonval').val();
            n[10][2] = $('.colorbutton').val();
            e.replaceWith($(widgetButton(n, name)));
            break;
          case '4' :
              n[10][0] = $('.widget__edit__task__mul').val();
              n[10][1] = $('.widget__edit__task__point').val();
              e.replaceWith($(widgetTask(n, name)));
            break;
          case '5' :
            e.replaceWith($(widgetRegisterValue(n, name)));
            break;
          case '6' :
            n[10][0] = $('.wi_text').val();
            n[10][1] = $('input[name=w_align]:checked').val();
            e.replaceWith($(widgetText(n, name)));
            break;
          case '7' :
            e.replaceWith($(widgetLine(n, name)));
            break;
          case '8' :
            var j = 0;
            $.each($('.widget__edit__dynamic-text'), function(i) {
              n[10][j] = $('.widget__edit__dynamic-text__input-text').eq(i).val();
              n[10][j + 1] = $('.widget__edit__dynamic-text__input-value').eq(i).val();
              j += 2;
            }); 
            e.replaceWith($(widgetDynamicText(n, name)));
            break;
          case '9' :
            n[10][0] = $('.textledfalse').val();
            n[10][1] = $('.textfalse').val();
            n[10][2] = $('.ledfalse').val();
            n[10][3] = $('.textledtrue').val();
            n[10][4] = $('.texttrue').val();
            n[10][5] = $('.ledtrue').val();
            n[10][6] = $('.widget__edit__text-indicator-bit__bit').val();
            e.replaceWith($(widgetIndicatorBit(n, name)));
            break;
        }
        widgetsObject[name] = n; 
        var registerName = n[1] + n[2] + n[3];
        widgetObjectRegisterName[registerName] = $.extend(true,  widgetObjectRegisterName[registerName], {[name] : widgetsObject[name]});
        $('#widgetswindow').collapse('hide');
        w.html('');
      } else {
        alert('ВВЕДІТЬ ЗНАЧЕННЯ', 'warning', $('#widgetmain').closest('.row'));
      }
    });
    $('#widgetremove').one('click', function() {
      $('#widgetswindow').collapse('hide');
      e.remove();
      w.html('');
    });
  }
});

// Функція виведення актуальних данних про пристрої.
function setdata(widget) {
  $.each(arrwidgets, function(i, t) {
    $('#widgetid').append($('<option>').val(i).text(i));
  });
  if(widget[1] in arrwidgets && widget[2] in arrwidgets[widget[1]]) {
    $.each(arrwidgets[widget[1]][widget[2]], function(i, r) {
      $('#widgetregister').append($('<option>').val(r).text(r));
    });
    $('#widgetregister').html($('#widgetregister').find('option').sort(function(a, b) {
      return $(a).text() - $(b).text();
    }));
  }
  $('#widgetid').find("option[value='" + widget[1] + "']").length > 0 ? $('#widgetid').val(widget[1]) : $('#widgetid').val(null);
  $('#widgetfunction').val(widget[2]);
  $('#widgetregister').is('input') ? $('#widgetregister').val(widget[3]) : $('#widgetregister').find("option[value='" + widget[3] + "']").length > 0 ? $('#widgetregister').val(widget[3]) : $('#widgetregister').val(null);
}

// Функція читання данних з вікна віджетів.
function getwidgetdata(d) {
  var data = {
    0: d[0],
    1: $('#widgetid').val(),
    2: $('#widgetfunction').val(),
    3: $('#widgetregister').val(),
    4: $('#size').val(),
    5: $('#shift').val(),
    6: $('#widgetdisable').prop('checked'),
    7: $('#widgetenable').prop('checked') ? '2' : '0',
    8: $('.main__sortable:not(.d-none)').index(),
    9: d[9],
    10: {}
  }
  return data;
}

// Функця додавання дійсниого типу функції до списку після зміни id.
$(document).on('change', '#widgetid', function() {
  $('#widgetfunction').val(null);
});

// Функця додавання дійсних регістрів до списку після зміни id чи типу функції.
$(document).on('change', '#widgetid, #widgetfunction', function() {
  $('#widgetregister').empty();
  $('#widgetregister').prepend($('<option>', {value: '', text: 'REG', disabled: 'disabled', selected: 'selected'}));
  if ($('#widgetid').val() !== null && $('#widgetfunction').val() !== null) {
    $.each(arrwidgets[$('#widgetid').val()][$('#widgetfunction').val()], function(i, r) {
      $('#widgetregister').append($('<option>').val(r).text(r));
    });
    $('#widgetregister').html($('#widgetregister').find('option').sort(function(a, b) {
      return $(a).text() - $(b).text();
    }));
  }
});

$(document).on('click', '.widget__edit__dynamic-text__button-add', function() {
  var w = $('#widgets');
  var d = {10: ['', '']}
  var i = 0;
  w.find('#widgetid').parent().before($(widgetEditDynamicTextNext(d, i)));
});

$(document).on('click', '.widget__edit__dynamic-text__button-remove', function() {
  $(this).closest('.widget__edit__dynamic-text').remove();
});




//<------------------------------------------------------------------------------------------------------------------------------------------->
//                                                                 ЦИКЛ.
//<------------------------------------------------------------------------------------------------------------------------------------------->

// Циклічний запит.
setInterval(function() {
  $.ajax({
    url: "/query",
    method: "GET",
    timeout: 500,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(parametres) {
      var units = ['', 'A','atm','bar','°C','Gcal','Gcal/h','GJ','GJ/h','grad','h','ht','Hz','J/h','kg','kg/h','kgf/cm²','km/h','kPa','kVA','kVAr','kVArh','kW','kWh','l','m','m/s','m³','m³/day','m³/h','m³/min','m³/sec','mA ','mbar','mg/l','mg/m³','min','mm','mmhg','MPa','ms','mS/cm ','mV ','MVA','MVAr','MW','MWh','n.m³','Pa','%','ppm','rpm','sec','sm','t','t/h','t/m³','V','VA','VAr','W','µS/cm'];
      var x = Math.floor((new Date()).getTime() / 1000) * 1000;
      $('#cycletime').is(':visible') ? $('#cycletime').val(parametres.cycle + ' мс') : '';  
      $('#ipadress').is(':visible') ? $('#ipadress').val(parametres.ip) : '';
      $('#time').is(':visible') ? $('#time').val(new Date(parametres.time * 1000 + (new Date().getTimezoneOffset() * 1000 * 60)).toLocaleString('uk-UA', options)) : '';
      if ($(".log__main__message").is(':visible')) {
        if (parametres.modbus.length) {
          if (parametres.modbus[0] === 'e') {
            var message = true;
            $(".log__main__message").each(function() {
              var divText = $(this).text();
              if (divText === `ModBus. Result: 0x${parametres.modbus.toUpperCase()}.`) {
                message = false;
                $(this).prev('div').text(new Date().toLocaleTimeString('uk-UA'));
              }
            });
            if (message) {
              consoleLog('ModBus. Result', `0x${parametres.modbus.toUpperCase()}`);
            }
          }
        }
        if (parametres.file === 'SD error.') {
          var message = true;
          $(".log__main__message").each(function() {
            var divText = $(this).text();
            if (divText === `${parametres.file}`) {
              message = false;
              $(this).prev('div').text(new Date().toLocaleTimeString('uk-UA'));
            }
          });
          if (message) {
            consoleLog('SD card', `${parametres.file}`);
          }
        }  
      }     
      $.each(arrdevice, function(index, [w, r, s, m, p, v, u, l]) {
        if (w) {
          if (typeof(parametres[r]) === 'undefined') {
            return false;
          }
          if ($('.elements').is(':visible') && registerOldData[r] !== parametres[r]) {
            //if ($('.' + r).offset().top - $(window).scrollTop() < $(window).height() && $('.' + r).offset().top - $(window).scrollTop() > 0) {
              $('.' + r).val(parametres[r]);
              registerOldData[r] =  parametres[r];
            //}
          }
          if (s) {
            v && parametres[r] !== '-' ? chart.get(r).addPoint([x, converter(parametres[r], m, p)], false, false, false, false) : '';
            if ($('#widgetmain').is(':visible')) {
              if (widgetObjectRegisterName.hasOwnProperty(r) ) {
                $.each(widgetObjectRegisterName[r], function(position, element) {
                  var e = $(`.widget[data-properties=${position}] .${r}`);
                  if (e.is(':visible')) {
                    var val = converter(parametres[r], m, p);
                    element[0] === '5' ? e.text() !== val + ' ' + units[u] ? e.text(val + ' ' + units[u]) : '' : '';
                    if (element[0] === '8') {
                      var key = Object.keys(element[10]).find(function(key) {
                        return element[10][key] === converter(parametres[r], m, p).toString();
                      });
                      e.text() !== element[10][+key - 1] ? e.text(element[10][+key - 1]) : '';
                    } 
                    if (element[0] === '9') {
                      if (((val >> parseInt(element[10][6])) & 1) === 1 && e.data('data-check') !== true) {
                        e.data('data-check', true);
                        e.text(element[10][3]);
                        e.css('color', element[10][4]);
                        e.css('background-color', element[10][5]);
                      } else {
                        e.data('data-check', false);
                        e.text(element[10][0]);
                        e.css('color', element[10][1]);
                        e.css('background-color', element[10][2]);
                      }
                    }
                  }      
                });
              }
            }  
          } else if (!s) {
            v && parametres[r] !== '-' ? chart.get(r).addPoint([x, Number(parametres[r])], false, false, false, false) : '';
            if ($('#widgetmain').is(':visible')) {
              if (widgetObjectRegisterName.hasOwnProperty(r)) {
                $.each(widgetObjectRegisterName[r], function(position, element) {
                  var e = $(`.widget[data-properties=${position}] .${r}`);
                  if (e.is(':visible')) {
                    if (element[0] === '1') {
                      if (parametres[r] === false && e.data('data-check') !== false) {
                        e.data('data-check', false);
                        e.css('background-color', element[10][0])
                      } else if (parametres[r] === true && e.data('data-check') !== true) {
                        e.data('data-check', true);
                        e.css('background-color', element[10][1])
                      }
                    } 
                    if (element[0] === '2') {
                      if (parametres[r] === false && e.data('data-check') !== false) {
                        e.data('data-check', false);
                        e.text(element[10][0]);
                        e.css('color', element[10][1]);
                        e.css('background-color', element[10][2]);
                      } else if (parametres[r] === true && e.data('data-check') !== true) {
                        e.data('data-check', true);
                        e.text(element[10][3]);
                        e.css('color', element[10][4]);
                        e.css('background-color', element[10][5]);
                      }
                    }
                  }
                });
              }
            }
          }
          //s ? chart.get(r).addPoint([x, converter(parametres[r], m, p)], false, false, false, false) : chart.get(r).addPoint([x, Number(parametres[r])], false, false, false, false);
        }
      });
      if (move === true && $('#nav-charts').is(':visible')) {
        chart.xAxis[0].setExtremes((new Date()).getTime() - timespan, (new Date()).getTime());
        //chart.redraw();
      }  
    },
    error: function() {
      
    }
  });
}, 1000);

//<------------------------------------------------------------------------------------------------------------------------------------------->
//                                                                Віджети.
//<------------------------------------------------------------------------------------------------------------------------------------------->

// Функція віджета кнопки.
$(document).on('click', '.w_button', function() {
  var d = widgetsObject[$(this).closest('.widget').attr('data-properties')];
  var path = {fc: d[2], id: d[1], reg: d[3], data: parseFloat(d[10][1].replace(',', '.'))};
  $.get('/senddata', path, function() {});
});

// Функція віджета завдання.
$(document).on('click', '.val_button', function() {
  var i = $(this).closest('.widget').find('.val_text').val();
  i = parseFloat(i.replace(',', '.'));
  if (i) {
    var d = widgetsObject[$(this).closest('.widget').attr('data-properties')];
    i = converter(i, d[10][0], d[10][1]);
    var path = {fc: d[2], id: d[1], reg: d[3], data: i};
    $.get('/senddata', path, function() {});
    $(this).closest('.widget').find('.val_text').val('');
  }
});

//<------------------------------------------------------------------------------------------------------------------------------------------->
//                                                               Додаткові функціі.
//<------------------------------------------------------------------------------------------------------------------------------------------->

// Функція сортування номерів опитуванних регістрів.
function registersSort(numbers) {
  function empty(array) {
    var isEmpty = true;
    $.each(numbers, function(index, value) {
      if (value !== "") {
        isEmpty = false;
        return true;
      } 
    });
    return isEmpty;
  }
  if (!Array.isArray(numbers) || numbers.length === 0 || empty(numbers)) {
    return;
  }
  numbers = numbers.filter(function(num) {
    return num !== "";
  }).filter(function(num, index, arr) {
    return arr.indexOf(num) === index;
  }).map(Number).sort(function(a, b) {
    return a - b;
  });
  var sequences = [];
  var sequence = [numbers[0]];
  for (var i = 1; i < numbers.length; i++) {
    if (numbers[i] === sequence[sequence.length - 1] + 1) {
      sequence.push(numbers[i]);
    } else {
      sequences.push(sequence);
      sequence = [numbers[i]];
    }
  }
  sequences.push(sequence);
  var pairs = sequences.map(function(sequence) {
    return [sequence[0], sequence.length];
  });
  var result = [].concat.apply([], pairs);
  result = result.map(String);
  return result;
}

// Функція виведення повідомлення.
function alert(message, type, element) {
  $(element).after(
    `<div class=" col-12 alert alert-${type} alert-dismissible py-1 my-2" role="alert">`+
      `<div><small>${message}</small></div>`+
      `<button type="button" class="btn-close p-2" data-bs-dismiss="alert" aria-label="Close"></button>`+
    `</div>`
  ); 
}

// Функція помноження читаємого параметра.
function converter(parameter, mul, point) {
  if (parameter === '-') {
    return '-';
  }
  if (typeof(parameter) === 'undefined') {
    return;
  }
  var res;
  res = (mul > 0) ? parameter * mul : parameter;
  res = res.toFixed(point);
  res = parseFloat(res);
  return res;
}

// Функція пошуку унікальних елементів.
function getUniqueNumbers(array1, array2) {
  var uniqueArray = [];
  $(array1).each(function(index, element) {
    if ($.inArray(element, array2) === -1) {
      uniqueArray.push(element);
    }
  });
  return uniqueArray;
}

// Функція валідації.
function formValidator(parent) {
  var validator = true;
  $.each(parent.find('.form__validator'), function() {
    if ($(this).val() === null ? true : !$(this).val().length ? true : false) {
      $(this).addClass('is-invalid');
      validator = false;
    }
  });
  return validator;
}
$(document).on('input', 'input', function() {
  $(this).removeClass('is-invalid');
});
$(document).on('change', 'select', function() {
  $(this).removeClass('is-invalid');
});

// Функція сортування віджктів.
sortable = Sortable.create($('.main__sortable')[page], {
  disabled: true,
  swap: false,
  animation: 150,
 });;

// Функція додавання головного вікна.
$(document).on('click', '.main__edit__add-page', function() {
  var div = ('<div class="row d-none main__sortable"></div>')
  var h = $('#widgetmain');
  h.append(div);
  if ($('.main__sortable').length > 1) {
    $('.main__header').removeClass('d-none');
  }
  widgetsPages();
});

// Функція видалення головного вікна.
$(document).on('click', '.main__edit__remove-page', function() {
  var content = $('.main__sortable');
  if (content.length > 1) {
    $('.main__sortable:not(.d-none)').remove();
    page--;
    if(page < 0) {
      page = content.length - 1;
    }
    content.eq(page).removeClass('d-none');
    var pageArr = [];
    $.each($('.widget'), function() {
      pageArr = JSON.parse($(this).attr('data-properties'));
      pageArr[8] = $(this).closest('.main__sortable').index()
      $(this).attr('data-properties', JSON.stringify(pageArr));
    });
    if ($('.main__sortable').length < 2) {
      $('.main__header').addClass('d-none');
    }
    widgetsPages();
  }
});

// Функція гортання головного вікна.
$(document).on('click', '.main__header__button-left', function() {
  var w = $('#widgets');
  $('#widgetswindow').collapse('hide');
  w.html('');
  $('#widgetitem').closest('div').removeClass('d-none');
  $('#addwidget').closest('div').removeClass('d-none');
  $('#widgets').closest('.row').find('hr').removeClass('d-none');
  var content = $('.main__sortable');
  content.eq(page).addClass('d-none');
  page--;
  if(page < 0) {
    page = content.length - 1;
  }
  content.eq(page).removeClass('d-none');
  sortable.destroy();
  sortable = Sortable.create($('.main__sortable')[page], {
    disabled: true,
    swap: false,
    animation: 150,
   });;
  if ($('#widgetsort').prop('checked')) {
    sortable.option('disabled', false);
  } 
  if (!$('#widgetsort').prop('checked')) {
    sortable.option('disabled', true);
  }
  if ($('#widgetswap').prop('checked')) {
    sortable.option('swap', true);
  }
  if (!$('#widgetswap').prop('checked')) {
    sortable.option('swap', false);
  }
  widgetsPages();
});

// Функція гортання головного вікна.
$(document).on('click', '.main__header__button-right', function() {
  var w = $('#widgets');
  $('#widgetswindow').collapse('hide');
  w.html('');
  $('#widgetitem').closest('div').removeClass('d-none');
  $('#addwidget').closest('div').removeClass('d-none');
  $('#widgets').closest('.row').find('hr').removeClass('d-none');
  var content = $('.main__sortable');
  content.eq(page).addClass('d-none');
  page++;
  if(page > content.length - 1) {
    page = 0 ;
  }
  content.eq(page).removeClass('d-none');
  sortable.destroy();
  sortable = Sortable.create($('.main__sortable')[page], {
    disabled: true,
    swap: false,
    animation: 150,
   });;
  if ($('#widgetsort').prop('checked')) {
    sortable.option('disabled', false);
  } 
  if (!$('#widgetsort').prop('checked')) {
    sortable.option('disabled', true);
  }
  if ($('#widgetswap').prop('checked')) {
    sortable.option('swap', true);
  }
  if (!$('#widgetswap').prop('checked')) {
    sortable.option('swap', false);
  }
  widgetsPages();
});

//Функція консолі.
function consoleLog(m, v) {
  $('.log__main').append(
    `<div class="col-3 mt-2 log__main__time">`+
      `${new Date().toLocaleTimeString('uk-UA')}`+
    `</div>`+
    `<div class="col-9 mt-2 log__main__message">`+
      `${m}: ${v}.`+
    `</div>`
  );
}

// Функція відображання кільскості сторінок віджетів.
function widgetsPages() {
  $('.main__header__page-count').text(page + 1 + ' / ' + $('.main__sortable').length);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Функція відмови.
$(document).on('click', '.no', function() {
  $(this).closest('.row').remove();
  created = false;
});