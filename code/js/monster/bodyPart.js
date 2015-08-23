define(['base'], function (Base) {
    var BodyPart = function () {
        Base.GameObject.call(this);
        this._pivot = null;
        this.type = 'none';
        this.price = 0;
        this.scareFactor = 0;
        this.bought = false;
    };

    ext(BodyPart, Base.GameObject);

    Object.defineProperties(BodyPart.prototype, {
        bodyPivot: {
            set: function (pivot) {
                this._pivot = pivot;
            },
            get: function () {
                return this._pivot;
            }
        }
    });

    BodyPart.prototype.setNum = function (num) {

    };

    return BodyPart;
});