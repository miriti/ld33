define(['pixi'], function (PIXI) {
    var basePath = "data/";

    var list = {
        body: "img/body.png",
        hand: "img/hand.png",
        head: "img/head_1.png",
        leg: "img/leg.png",
        logo: "img/logo.png",
        start_btn: "img/start_btn.png",
        terrorize_btn: "img/terrorize_btn.png",
        moon: "img/moon.png",
        back: "img/back.png",
        road: "img/road.jpg",
        street_lamp: "img/street_lamp.png"
    };

    var Resources = function () {
        this.loader = PIXI.loader;

        for (var id in list) {
            this.loader.add(id, basePath + list[id]);
        }
    };

    Resources.prototype.go = function (callback) {
        var self = this;

        this.loader.once('complete', function () {
            for (var r in this.resources) {
                self[r] = this.resources[r];
            }
            callback.call();
        });

        this.loader.load();
    };

    return new Resources();
});