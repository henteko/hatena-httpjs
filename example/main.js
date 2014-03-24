$(function() {
  var $input = $('#input');
  var $pre = $('#preview');

  $input.val('[http://google.com:title] [http://google.com:title=hoge] [http://google.com:barcode] [http://static.squarespace.com/static/506e0a88e4b04973cff5d846/t/51474197e4b0f7aa3ca2467d/1363624349696/good.gif:image]');

  var hatena = new HatenaHttp();
  var parse = function() {
    var text = $input.val();
    hatena.parse(text, function(replacedText) {
      $pre.html(replacedText);
    });
  };
  $input.keyup(function() {
    parse();
  });

  parse();
});
