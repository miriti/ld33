define([
    'pixi',
    'res',
    'monster/head'
], function (PIXI,
             Res,
             Head) {
    var DevilHead = function () {
        Head.call(this);

        this.sprite = new PIXI.Sprite(Res.head_3.texture);
        this.sprite.pivot.set(25, 130);
        this.price = 500;

        this.scareFactor = 5;

        this.addChild(this.sprite);
    };

    ext(DevilHead, Head);

    return DevilHead;
});