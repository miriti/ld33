define([
    'pixi',
    'res',
    'monster/head'
], function (PIXI,
             Res,
             Head) {
    var BasicHead = function () {
        Head.call(this);
        this.sprite = new PIXI.Sprite(Res.head_1.texture);
        this.sprite.pivot.set(45, 115);
        this.price = 100;
        this.scareFactor = 1;
        
        this.addChild(this.sprite);
    };

    ext(BasicHead, Head);

    return BasicHead;
});