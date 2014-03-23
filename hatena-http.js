function HatenaHttp(text) {
  this.text = text;
  this.cache = {};
}

HatenaHttp.prototype.getLinkTitle = function(url, callback) {
  var apiEndPoint, callback, requestUrl, script;
  HatenaHttp.getLinkTitleCallback = callback;

  apiEndPoint = 'http://www.usamimi.info/~ryouchi/title/get_title_jsonp.php';
  callbackName = 'HatenaHttp.getLinkTitleCallback';
  requestUrl = apiEndPoint + "?callback=" + callbackName + "&url=" + url;
  script = document.createElement('script');
  script.src = requestUrl;
  script.type = 'text/javascript';
  if (document.body !== null) {
    document.body.appendChild(script);
  }
};

HatenaHttp.prototype.getQRCodeUrl = function(url, size) {
  var apiEndPoint, callback, requestUrl, script;
  apiEndPoint = 'http://chart.apis.google.com/chart?';
  return apiEndPoint + 'chs=' + size + 'x' + size + '&cht=qr&chl=' + url;
};

HatenaHttp.prototype.textReplace = function(body, replaceText) {
  this.text = this.text.replace(body, replaceText);
};

HatenaHttp.prototype.setLink = function(body, url, title) {
  if(title === '') title = url;
  var link = '<a href=' + url + '>' + title + '</a>';
  this.textReplace(body, link);
};

HatenaHttp.prototype.setTitle = function(body, url, title) {
  if(title == undefined) title = this.cache[url];
  if(title == undefined) {
    // tmp string
    replaceText = '(HatenaHttpTitleGetRequest' + url + ')';
    this.textReplace(body, replaceText);
    body = replaceText;
    self = this;
    this.getLinkTitle(url, function(data) {
      var _title = data.title;
      self.cache[url] = title;
      if(_title == null || _title == undefined) _title = '';
      self.setLink(body, url, _title);
    });
  }else {
    this.setLink(body, url, title);
  }
};

HatenaHttp.prototype.setImage = function(body, url) {
  var img = '<img src=' + url + '>';
  this.textReplace(body, img);
};

HatenaHttp.prototype.setQRCode = function(body, url) {
  var qrCodeUrl = this.getQRCodeUrl(url, 150);
  this.setImage(body, qrCodeUrl);
};

HatenaHttp.prototype.parse = function() {
  var re = /\[(https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?\@&=+\$,%#]+)(:title=?(\w+)?|:image|:barcode)?\]/;

  var match = null;
  while(match = this.text.match(re)) {
    console.log(match);
    var body = match[0];
    var url = match[1];
    var type = match[2];
    var title = match[3];

    if(url != undefined && type != undefined) {
      if(type.match(/:title=?(\w+)?/)) {
        this.setTitle(body, url, title);
      }else if(type.match(/:image=?(.+)?/)) {
        this.setImage(body, url);
      }else if(type.match(/:barcode=?(.+)?/)) {
        this.setQRCode(body, url);
      }
    }else if(url != undefined){
      this.setLink(body, url, '');
    }
  }
};
