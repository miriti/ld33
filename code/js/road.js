define([
    'pixi',
    'res',
    'base'], function (PIXI,
                       Res,
                       Base) {

    var StreetLamp = function () {
        Base.GameObject.call(this);

        var sprite = new PIXI.Sprite(Res.street_lamp.texture);

        sprite.anchor.set(0.5, 1);
        this.addChild(sprite);
    };

    ext(StreetLamp, Base.GameObject);

    var Road = function () {
        Base.GameObject.call(this);

        var roadSprite = new PIXI.Sprite(Res.road.texture);
        this.addChild(roadSprite);

        var lampPos = [
            roadSprite.width / 4,
            roadSprite.width / 2,
            roadSprite.width / 2 + roadSprite.width / 4
        ];

        for (var i = 0; i < 2; i++) {
            var lamp = new StreetLamp();
            lamp.x = 100 + roadSprite.width / 2 * i;
            lamp.y = 40;
            this.addChild(lamp);
        }
    };

    ext(Road, Base.GameObject);

    return Road;
});