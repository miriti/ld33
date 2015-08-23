define([
    'pixi',
    'base',
    'game',
    'monster/basicHead',
    'monster/leg',
    'monster/basicHand',
    'monster/body'], function (PIXI,
                               Base,
                               Game,
                               BasicHead,
                               Leg,
                               BasicHand,
                               Body) {


    var HealthBar = function (monster) {
        Base.GameObject.call(this);

        this.monster = monster;

        var back = new PIXI.Graphics();
        back.beginFill(0x333333);
        back.drawRect(0, 0, 300, 30);
        back.endFill();

        var indicator = new PIXI.Graphics();
        indicator.beginFill(0xaaaaaa);
        indicator.drawRect(0, 0, 290, 20);
        indicator.endFill();

        indicator.x = indicator.y = 5;

        this.indicator = indicator;

        this.addChild(back);
        this.addChild(indicator);
    };

    ext(HealthBar, Base.GameObject);

    HealthBar.prototype.update = function (delta) {
        Base.GameObject.prototype.update.call(this, delta);

        this.indicator.width = 290 * (this.monster.health / this.monster.maxHealth);
    };

    var Monster = function () {
        this.maxHealth = 100;
        this.health = 100;

        Base.GameObject.call(this);

        this.healthBar = new HealthBar(this);
        this.healthBar.y = -130;

        this.addChild(this.healthBar);

        this.body = new Body();
        this.body.attachPart('leg', new Leg());
        this.body.attachPart('leg', new Leg());

        this.addChild(this.body);
    };

    ext(Monster, Base.GameObject);

    Monster.prototype.hit = function (hitPoints) {
        this.health -= hitPoints;

        if (this.health <= 0) {
            if (this.death) {
                this.death.call(this);
            }
        }
    };

    Monster.prototype.eachPart = function (callback) {
        for (var type in this.body.pivots) {
            for (var i in this.body.pivots[type]) {
                if (this.body.pivots[type][i].part) {
                    callback.call(this, this.body.pivots[type][i].part);
                }
            }
        }
    };

    Monster.prototype.getScareness = function () {
        var sum = 0;
        this.eachPart(function (part) {
            sum += part.scareFactor;
        });
        return sum;
    };

    Monster.prototype.getPrice = function () {
        var sum = 0;
        this.eachPart(function (part) {
            if (!part.bought) {
                sum += part.price;
            }
        });
        return sum;
    };

    Monster.prototype.update = function (delta) {
        Base.GameObject.prototype.update.call(this, delta);
    };

    return Monster;
});