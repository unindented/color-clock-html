################################################################################
#
# Color clock.
#
# Idea lifted from http://thecolourclock.co.uk/.
#
################################################################################

TIMEOUT_DELAY = 250

################################################################################

bodyElem   = null

modeElem   = null

nowDecElem = null
nowHexElem = null

butDecElem = null
butHexElem = null

################################################################################

init = ->
  initElements()
  updateValues()

initElements = ->
  bodyElem    = document.body
  modeElem    = document.getElementById('mode')
  nowDecElem  = document.getElementById('now-dec')
  nowHexElem  = document.getElementById('now-hex')
  butDecElem  = document.getElementById('but-dec')
  butHexElem  = document.getElementById('but-hex')

  # add event listeners
  butDecElem.onclick = (() -> setMode('dec'))
  butHexElem.onclick = (() -> setMode('hex'))

updateValues = ->
  now = new Date()
  decValues = getDecValues(now)
  hexValues = getHexValues(now)

  # update content of elements
  updateElem(nowDecElem, decValues)
  updateElem(nowHexElem, hexValues)

  # set the background
  setBackground(hexValues)

  # and call itself
  setTimeout(updateValues, TIMEOUT_DELAY)


getDecValues = (now) ->
  h = now.getHours()
  m = now.getMinutes()
  s = now.getSeconds()
  # pad values
  h = pad(h, 10)
  m = pad(m, 10)
  s = pad(s, 10)
  # return them
  [h, m, s]

getHexValues = (now) ->
  h = now.getHours()
  m = now.getMinutes()
  s = now.getSeconds()
  x = 0 # x = now.getMilliseconds()
  # transform to a value in the range [0,255]
  h = Math.round(((h * 60) + m) * 255 / (24 * 60))
  m = Math.round(((m * 60) + s) * 255 / (60 * 60))
  s = Math.round(((s * 1000) + x) * 255 / (60 * 1000))
  # convert to hex and pad values
  h = pad(h, 16)
  m = pad(m, 16)
  s = pad(s, 16)
  # return them
  [h, m, s]

updateElem = (elem, values) ->
  [h, m, s] = values
  elem.innerHTML = "#{h}:#{m}:#{s}"


setBackground = (color) ->
  bodyElem.style.backgroundColor = "##{color.join('')}"

setMode = (mode) ->
  modeElem.className = mode


pad = (i, base) ->
  (if i < base then '0' else '') + i.toString(base)

################################################################################

window.onload = init
