define([
    'res',
    'monster/bodyPart'], function (Res,
                                   BodyPart) {
    var Leg = function () {
        BodyPart.call(this);

        var sprite = new PIXI.Sprite(Res.leg.texture);
        sprite.pivot.set(20, 20);

        this.addChild(sprite);
    };

    ext(Leg, BodyPart);

    Leg.prototype.update = function (delta) {

    };

    return Leg;
});