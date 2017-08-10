# alt-button-click

## html
```html
<body>
  altボタンを押しながらクリックすると、
  コンソールに出力される。<br>
  <button id="btn">Click Me</button>


  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/rxjs/2.3.22/rx.all.js"></script>
  <script src="./sample.js"></script>
</body>
```

## js
```js
var btnClicks = Rx.Observable.fromEvent($('#btn'), "click");
 
btnClicks
    .filter(function (value) {
        return value.altKey;
    })
    .subscribe(function () {
        console.log('altを押しましたね');
    });
```
## 参考
https://liginc.co.jp/web/js/151272