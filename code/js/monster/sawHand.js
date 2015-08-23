define([
    'res',
    'monster/hand'
], function (Res,
             Hand) {
    var SawHand = function () {
        Hand.call(this);

        var anim = new PIXI.Container();
        var sprite = new PIXI.Sprite(Res.hand_3_arm.texture);

        sprite.pivot.set(30, 30);
        var claw = new PIXI.Sprite(Res.hand_3_palm.texture);
        claw.pivot.set(70, 70);
        claw.x = -10;

        claw.y = 215;

        this.claw = claw;
        anim.addChild(sprite);

        anim.addChild(claw);

        this.sprite = anim;
        this.price = 600;
        this._clawPhase = 0;

        this.scareFactor = 10;

        this.addChild(this.sprite);
    };

    ext(SawHand, Hand);

    SawHand.prototype.update = function (delta) {
        Hand.prototype.update.call(this, delta);

        this.claw.rotation -= (Math.PI * 2) * delta;
    };

    return SawHand;
});