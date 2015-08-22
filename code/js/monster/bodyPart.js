define(['base'], function (Base) {
    var BodyPart = function () {
        Base.GameObject.call(this);
        this._pivot = null;
    };

    ext(BodyPart, Base.GameObject);

    Object.defineProperties(BodyPart.prototype, {
        bodyPivot: {
            set: function (pivot) {
                this._pivot = pivot;
                this.x = pivot.x;
                this.y = pivot.y;
            },
            get: function () {
                return this._pivot;
            }
        }
    });
    
    return BodyPart;
});