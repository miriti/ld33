define([
    'base',
    'res',
    'monster',
    'scroll',
    'road',
    'passer',
    'policeMan'
], function (Base,
             Res,
             Monster,
             Scroll,
             Road,
             Passer,
             PoliceMan) {

    var Back = function () {
        Base.GameObject.call(this);

        var sprite = new PIXI.Sprite(Res.back.texture);
        this.addChild(sprite);
    };

    ext(Back, Base.GameObject);

    var Grass = function () {
        Base.GameObject.call(this);

        var sprite = new PIXI.Sprite(Res.grass.texture);
        this.addChild(sprite);
    };

    ext(Grass, Base.GameObject);

    var Terrorize = function (monster) {
        monster = monster || new Monster();

        monster.healthBar.visible = true;

        Base.GameObject.call(this);

        this.scale.set(0.75);

        this.mobsPlain = new Base.GameObject();

        this.moon = new PIXI.GameSprite(Res.moon.texture);
        this.moon.x = 600;
        this.moon.y = -500;

        this.back = new Scroll(Back);
        this.back.y = -this.back.height;

        this.road = new Scroll(Road);

        this.grass = new Scroll(Grass);
        this.grass.y = 450;

        this.addChild(this.moon);

        this.addChild(this.back);
        this.addChild(this.road);

        this.addChild(this.mobsPlain);

        var startX = 0;

        for (var i = 0; i < 10; i++) {
            var passer = new Passer(monster);
            startX = passer.x = i * 300;
            passer.y = 110 + (Math.random() * 330 - passer.height);
            this.mobsPlain.addChild(passer);
        }

        startX += 400;

        for (var i = 0; i < 10; i++) {
            var policeman = new PoliceMan(monster);
            policeman.x = startX + i * 300;
            policeman.y = 110 + (Math.random() * 330 - passer.height);
            this.mobsPlain.addChild(policeman);
        }

        this.addChild(this.grass);

        this.monster = monster;
        this.monster.x = -800;
        this.monster.y = 260 - this.monster.height;

        this.addChild(monster);
    };

    ext(Terrorize, Base.GameObject);

    Terrorize.prototype.update = function (delta) {
        Base.GameObject.prototype.update.call(this, delta);

        this.moon.x -= 0.10 * delta;
        this.back.scroll(-10 * delta);
        this.road.scroll(-20 * delta);
        this.mobsPlain.x -= 20 * delta;
        this.grass.scroll(-60 * delta);
    };

    return Terrorize;
});