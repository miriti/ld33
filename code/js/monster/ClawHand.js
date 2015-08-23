define([
    'res',
    'monster/hand'
], function (Res,
             Hand) {
    var ClawHand = function () {
        Hand.call(this);

        var anim = new PIXI.Container();
        var sprite = new PIXI.Sprite(Res.hand_2_arm.texture);

        sprite.pivot.set(22, 18);
        var claw = new PIXI.Sprite(Res.hand_2_palm.texture);
        claw.pivot.set(10, 30);
        claw.x = 55;

        claw.y = 30;

        this.claw = claw;
        anim.addChild(sprite);

        anim.addChild(claw);

        this.sprite = anim;
        this.price = 300;
        this._clawPhase = 0;
        
        this.scareFactor = 5;
        
        this.addChild(this.sprite);
    };

    ext(ClawHand, Hand);

    ClawHand.prototype.update = function (delta) {
        Hand.prototype.update.call(this, delta);

        this.claw.rotation = -Math.PI / 16 + (Math.PI / 8 * Math.cos(this._clawPhase));
        this._clawPhase += Math.PI/4 * delta;
    };

    return ClawHand;
});