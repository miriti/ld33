define([
    'res',
    'monster/bodyPart'], function (Res,
                                   BodyPart) {
    var Leg = function () {
        BodyPart.call(this);

        var sprite = new PIXI.Sprite(Res.leg.texture);
        sprite.pivot.set(20, 20);

        this.addChild(sprite);
        this._phase = 0;
        this.radius = 10;
    };

    ext(Leg, BodyPart);

    Leg.prototype.update = function (delta) {
        this.x = -this.radius / 2 + Math.cos(this._phase) * this.radius;
        this.y = -this.radius / 2 + Math.sin(this._phase) * this.radius;

        this._phase += (Math.PI / 3) * delta;
    };

    Leg.prototype.setNum = function (num) {
        this._phase = Math.PI * num;
    };

    return Leg;
});