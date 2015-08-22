define([
    'base',
    'res',
    'monster',
    'scroll',
    'road'
], function (Base,
             Res,
             Monster,
             Scroll,
             Road) {

    var Back = function () {
        Base.GameObject.call(this);

        var sprite = new PIXI.Sprite(Res.back.texture);
        this.addChild(sprite);
    };

    ext(Back, Base.GameObject);

    var Terrorize = function (monster) {
        monster = monster || new Monster();

        Base.GameObject.call(this);

        this.scale.set(0.75);

        this.moon = new PIXI.GameSprite(Res.moon.texture);
        this.moon.x = 600;
        this.moon.y = -500;

        this.back = new Scroll(Back);
        this.back.y = -this.back.height;

        this.road = new Scroll(Road);

        this.addChild(this.moon);

        this.addChild(this.back);
        this.addChild(this.road);

        this.monster = monster;
        this.monster.y = -monster.height / 2;

        this.addChild(monster);
    };

    ext(Terrorize, Base.GameObject);

    Terrorize.prototype.update = function (delta) {
        Base.GameObject.prototype.update.call(this, delta);

        this.back.scroll(-10 * delta);
        this.road.scroll(-20 * delta);
    };

    return Terrorize;
});