new function () {
  var _self = this;
  _self.width = 750;//设置默认最大宽度
  _self.minWidth = 320;//设置最小宽度
  _self.min = _self.minWidth / _self.width;
  _self.fontSize = 100;//默认字体大小 1rem == 10px
  _self.widthProportion = function () {
    var p = (document.getElementsByTagName("html")[0].offsetWidth) / _self.width;//document.body && document.body.clientWidth ||
    return p > 1 ? 1 : p < _self.min ? _self.min : p;
  };
  _self.changePage = function () {
    document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + _self.widthProportion() * _self.fontSize + "px !important");
  };
  _self.changePage();
  window.addEventListener('resize', function () {
    _self.changePage();
  }, false);
};
