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

## rx.all.js
### Observable.fromEvent() 
```js
  Observable.fromEvent = function (element, eventName, selector) {
    // Node.js specific
    if (element.addListener) {
      return fromEventPattern(
        function (h) { element.addListener(eventName, h); },
        function (h) { element.removeListener(eventName, h); },
        selector);
    }

    // Use only if non-native events are allowed
    if (!Rx.config.useNativeEvents) {
      if (marionette) {
        return fromEventPattern(
          function (h) { element.on(eventName, h); },
          function (h) { element.off(eventName, h); },
          selector);
      }
      if (ember) {
        return fromEventPattern(
          function (h) { Ember.addListener(element, eventName, h); },
          function (h) { Ember.removeListener(element, eventName, h); },
          selector);
      }
      if (jq) { ★ここに入る
        var $elem = jq(element);
        return fromEventPattern(šfromEventPattern()‚★fromEventPattern()を呼び出す
          function (h) { $elem.on(eventName, h); },
          function (h) { $elem.off(eventName, h); },
          selector);
      }
    }
    return new AnonymousObservable(function (observer) {
      return createEventListener(
        element,
        eventName,
        function handler (e) {
          var results = e;

          if (selector) {
            try {
              results = selector(arguments);
            } catch (err) {
              observer.onError(err);
              return
            }
          }

          observer.onNext(results);
        });
    }).publish().refCount();
  };
```

### fromEventPattern()
```js
  var fromEventPattern = Observable.fromEventPattern = function (addHandler, removeHandler, selector) {
    return new AnonymousObservable(function (observer) {
      function innerHandler (e) {
        var result = e;
        if (selector) {
          try {
            result = selector(arguments);
          } catch (err) {
            observer.onError(err);
            return;
          }
        }
        observer.onNext(result);
      }

      var returnValue = addHandler(innerHandler);
      return disposableCreate(function () {
        if (removeHandler) {
          removeHandler(innerHandler, returnValue);
        }
      });
    }).publish().refCount();
  };
```

## 参考
https://liginc.co.jp/web/js/151272