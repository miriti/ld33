define([
    'res',
    'pixi',
    'monster/bodyPart'
], function (Res,
             PIXI,
             BodyPart) {

    var Head = function () {
        BodyPart.call(this);
        
        this.eyes_pos = [];
        this._swingPhase = 0;
        this.type = 'head';
    };

    ext(Head, BodyPart);

    Head.prototype.update = function (delta) {
        this.rotation = Math.sin(this._swingPhase) * Math.PI / 64;
        this._swingPhase += delta;
    };

    return Head;
});