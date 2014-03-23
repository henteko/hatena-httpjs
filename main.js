$(function() {
  var $text = $('#text');
  var $pre = $('#preview');

  var text = $text.val();
  var hatena = new HatenaHttp(text);
  hatena.parse();
  setTimeout(function() {
    $pre.html(hatena.text);
  }, 1000);
});
