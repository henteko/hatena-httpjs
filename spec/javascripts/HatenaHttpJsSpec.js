describe("HatenaHttp class is", function() {
  var QRCODE_API_ENDPOINT = "http://chart.apis.google.com/chart?";
  var hatena = null;

  beforeEach(function() {
    hatena = new HatenaHttp();
  });

  afterEach(function() {
    hatena = null;
  });

  it("success image", function() {
    var text = '[http://example.com/hoge.img:image]';
    var result = '<img src=http://example.com/hoge.img>';
    hatena.parse(text, function(replacedText) {
      expect(replacedText).toEqual(result);
    });
  });

  it("success barcode", function() {
    var text = '[http://example.com:barcode]';
    var result = '<img src=' + QRCODE_API_ENDPOINT + 'chs=150x150&cht=qr&chl=http://example.com>';
    hatena.parse(text, function(replacedText) {
      expect(replacedText).toEqual(result);
    });
  });

  it("success set title", function() {
    var text = '[http://example.com:title=example]';
    var result = '<a href=http://example.com target="_blank">example</a>';
    hatena.parse(text, function(replacedText) {
      expect(replacedText).toEqual(result);
    });
  });

  it("not set type to generate link", function() {
    var text = '[http://example.com]';
    var result = '<a href=http://example.com target="_blank">http://example.com</a>';
    hatena.parse(text, function(replacedText) {
      expect(replacedText).toEqual(result);
    });
  });
});
