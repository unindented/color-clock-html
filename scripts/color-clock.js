(function() {
  var TIMEOUT_DELAY, bodyElem, butDecElem, butHexElem, getDecValues, getHexValues, init, initElements, modeElem, nowDecElem, nowHexElem, pad, setBackground, setMode, updateElem, updateValues;
  TIMEOUT_DELAY = 250;
  bodyElem = null;
  modeElem = null;
  nowDecElem = null;
  nowHexElem = null;
  butDecElem = null;
  butHexElem = null;
  init = function() {
    initElements();
    return updateValues();
  };
  initElements = function() {
    bodyElem = document.body;
    modeElem = document.getElementById('mode');
    nowDecElem = document.getElementById('now-dec');
    nowHexElem = document.getElementById('now-hex');
    butDecElem = document.getElementById('but-dec');
    butHexElem = document.getElementById('but-hex');
    butDecElem.onclick = (function() {
      return setMode('dec');
    });
    return butHexElem.onclick = (function() {
      return setMode('hex');
    });
  };
  updateValues = function() {
    var decValues, hexValues, now;
    now = new Date();
    decValues = getDecValues(now);
    hexValues = getHexValues(now);
    updateElem(nowDecElem, decValues);
    updateElem(nowHexElem, hexValues);
    setBackground(hexValues);
    return setTimeout(updateValues, TIMEOUT_DELAY);
  };
  getDecValues = function(now) {
    var h, m, s;
    h = now.getHours();
    m = now.getMinutes();
    s = now.getSeconds();
    h = pad(h, 10);
    m = pad(m, 10);
    s = pad(s, 10);
    return [h, m, s];
  };
  getHexValues = function(now) {
    var h, m, s, x;
    h = now.getHours();
    m = now.getMinutes();
    s = now.getSeconds();
    x = 0;
    h = Math.round(((h * 60) + m) * 255 / (24 * 60));
    m = Math.round(((m * 60) + s) * 255 / (60 * 60));
    s = Math.round(((s * 1000) + x) * 255 / (60 * 1000));
    h = pad(h, 16);
    m = pad(m, 16);
    s = pad(s, 16);
    return [h, m, s];
  };
  updateElem = function(elem, values) {
    var h, m, s;
    h = values[0], m = values[1], s = values[2];
    return elem.innerHTML = "" + h + ":" + m + ":" + s;
  };
  setBackground = function(color) {
    return bodyElem.style.backgroundColor = "#" + (color.join(''));
  };
  setMode = function(mode) {
    return modeElem.className = mode;
  };
  pad = function(i, base) {
    return (i < base ? '0' : '') + i.toString(base);
  };
  window.onload = init;
}).call(this);
