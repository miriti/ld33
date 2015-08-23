define([
    'pixi',
    'res',
    'monster/head'
], function (PIXI,
             Res,
             Head) {
    var AngryHead = function () {
        Head.call(this);
        
        this.sprite = new PIXI.Sprite(Res.head_2.texture);
        this.sprite.pivot.set(45, 115);
        this.price = 250;
        
        this.scareFactor = 3;
        
        this.addChild(this.sprite);
    };

    ext(AngryHead, Head);

    return AngryHead;
});