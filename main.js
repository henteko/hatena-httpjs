$(function() {
  var $text = $('#text');
  var $pre = $('#preview');

  var hatena = new HatenaHttp();
  $text.keyup(function() {
    var text = $text.val();
    hatena.parse(text, function(replacedText) {
      $pre.html(replacedText);
    });
  });
});
