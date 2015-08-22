define([
    'res',
    'pixi',
    'monster/bodyPart'
], function (Res,
             PIXI,
             BodyPart) {

    var Head = function () {
        BodyPart.call(this);

        var sprite = new PIXI.Sprite(Res.head.texture);
        sprite.pivot.set(45, 115);

        this.addChild(sprite);

        this._swingPhase = 0;
    };

    ext(Head, BodyPart);

    Head.prototype.update = function (delta) {
        this.rotation = Math.sin(this._swingPhase) * Math.PI / 64;
        this._swingPhase += delta;
    };

    return Head;
});