define([
    'res',
    'monster/hand'
], function (Res,
             Hand) {
    var BasicHand = function () {
        Hand.call(this);

        this.sprite = new PIXI.Sprite(Res.hand.texture);
        this.sprite.pivot.set(23, 20);
        this.price = 100;

        this.scareFactor = 1;

        this.eyes_pos = [
            {x: 40, y: 90},
            {x: 135, y: 95}
        ];

        this.addChild(this.sprite);
    };

    ext(BasicHand, Hand);

    return BasicHand;
});