var btnClicks = Rx.Observable.fromEvent($('#btn'), "click");

// btnClicksオブジェクトは、observaleProtoが持っている関数を持っている。
// 例えば、filter()やsubscribe()がそれにあたる。
btnClicks
    .filter(function (value) {
        return value.altKey;
    })
    .subscribe(function () {
        console.log('altを押しましたね');
    });