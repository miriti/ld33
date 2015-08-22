define([
    'res',
    'monster/bodyPart'], function (Res,
                                   BodyPart) {
    var Hand = function () {
        BodyPart.call(this);

        var sprite = new PIXI.Sprite(Res.hand.texture);
        sprite.pivot.set(23, 20);

        this.addChild(sprite);
        this._swingPhase = 0;
    };

    ext(Hand, BodyPart);

    Hand.prototype.update = function (delta) {
        this.rotation = -Math.PI / 32 + (Math.cos(this._swingPhase) * Math.PI / 16);
        this._swingPhase += delta;
    };

    return Hand;
});