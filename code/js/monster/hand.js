define([
    'res',
    'monster/bodyPart'], function (Res,
                                   BodyPart) {
    var Hand = function () {
        BodyPart.call(this);
        
        this.type = 'hand';
        this._swingPhase = 0;
    };

    ext(Hand, BodyPart);

    Hand.prototype.update = function (delta) {
        this.rotation = -Math.PI / 32 + (Math.cos(this._swingPhase) * Math.PI / 16);
        this._swingPhase += (Math.PI / 6) * delta;
    };

    return Hand;
});