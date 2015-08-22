define([
    'base',
    'monster/head',
    'monster/leg',
    'monster/hand',
    'monster/body'], function (Base,
                               Head,
                               Leg,
                               Hand,
                               Body) {


    var Monster = function () {
        Base.GameObject.call(this);

        this.body = new Body();
        this.body.attachPart('head', new Head());
        this.body.attachPart('leg', new Leg());
        this.body.attachPart('leg', new Leg());
        this.body.attachPart('hand', new Hand());
        this.body.attachPart('hand', new Hand());

        this.addChild(this.body);
    };

    ext(Monster, Base.GameObject);

    Monster.prototype.update = function (delta) {
        Base.GameObject.prototype.update.call(this, delta);
    };

    return Monster;
});