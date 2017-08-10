var btnClicks = Rx.Observable.fromEvent($('#btn'), "click");

btnClicks
    .filter(function (value) {
        return value.altKey;
    })
    .subscribe(function () {
        console.log('altを押しましたね');
    });