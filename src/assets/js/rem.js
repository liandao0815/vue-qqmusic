;(function(window, document) {
  var docEl = document.documentElement

  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 16 + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize()

  function setRemUnit() {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      setRemUnit()
    }
  })
})(window, document)
