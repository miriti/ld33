define([
    'res',
    'pixi',
    'base',
    'monster/pivot'], function (Res,
                                PIXI,
                                Base,
                                Pivot) {

    var Body = function () {
        Base.GameObject.call(this);

        var legsLayer = new Base.GameObject();
        this.addChild(legsLayer);

        var sprite = new PIXI.Sprite(Res.body.texture);
        this.addChild(sprite);

        this.pivots = {
            head: [
                new Pivot(120, 30, this)
            ],
            hand: [
                new Pivot(100, 100, this)
            ],
            leg: [
                new Pivot(40, 260, legsLayer),
                new Pivot(110, 260, legsLayer)
            ]
        };
    };

    ext(Body, Base.GameObject);

    Body.prototype.getAvailablePivot = function (type) {
        if (this.pivots[type]) {
            for (var i in this.pivots[type]) {
                if (this.pivots[type][i].part == null) {
                    return this.pivots[type][i];
                }
            }
        }

        return null;
    };

    Body.prototype.attachPart = function (type, part, pivot) {
        pivot = pivot || this.getAvailablePivot(type);

        if (pivot != null) {
            if (pivot.part != null) {
                pivot.part.parent.removeChild(pivot.part);
            }
            pivot.part = part;

            var shim = new Base.GameObject();

            shim.x = pivot.x;
            shim.y = pivot.y;
            shim.addChild(part);
            pivot.layer.addChild(shim);

            part.setNum(this.pivots[type].indexOf(pivot));
            part.bodyPivot = pivot;
        }
    };

    return Body;
});