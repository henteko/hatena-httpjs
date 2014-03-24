[![Build Status](https://travis-ci.org/henteko/hatena-httpjs.svg?branch=master)](https://travis-ci.org/henteko/hatena-httpjs)

# はてな記法のhttp記法のパーサー
[http記法](http://d.hatena.ne.jp/keyword/http%B5%AD%CB%A1)

# 使い方
lib/hatena-http.jsが本体  

```javascript
var text = '[http://google.com]';
var hatena = new HatenaHttp();
hatena.parse(text, function(replacedText) {
  // replacedTextに変換したhtmlが入ってくる
  console.log(replacedText); //ここでは<a href="http://google.com">http://google.com</a>が入ってくる
});
```

# サポートしてるhttp記法
## 普通の
* [http://google.com]でリンク作成

## title
* [http://google.com:title]で自動でページのタイトルを取得してきてリンクを作成  
* [http://google.com:title=hoge]でhogeというリンクを作成  

## barcode
* [http://google.com:barcode]でQRコードを表示

## image
* [http://example.com/hoge.jpg:image]で画像表示

## テストとか
### テストの実行
```
$ bundle install --path vender/bundle
$ bundle exec rake jasmine:ci
```

### ESLintの実行
```
$ npm install eslint
$ eslint lib/*.js
```
