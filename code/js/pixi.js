define(['../lib/pixi.js/bin/pixi'], function (PIXI) {
    var GameSprite = function (texture) {
        PIXI.Sprite.call(this, texture);
        this.anchor.set(0.5, 0.5);
    };

    GameSprite.prototype = Object.create(PIXI.Sprite.prototype);
    GameSprite.prototype.constructor = GameSprite;

    PIXI.GameSprite = GameSprite;

    PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

    return PIXI;
});