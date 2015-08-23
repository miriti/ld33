define([
        'pixi',
        'base',
        'res'
    ], function (PIXI,
                 Base,
                 Res) {
        var Bottle = function (monster) {
            this.monster = monster;
            Base.GameObject.call(this);

            var sprite = new PIXI.Sprite(Res.bottle.texture);
            sprite.anchor.set(0.5, 0.5);
            this.addChild(sprite);

            this.to = null;
            this.from = null;

            this._timeTotal = 2;
            this._time = 0;
        };

        ext(Bottle, Base.GameObject);

        Bottle.prototype.throw = function (to) {
            this.from = {x: this.x, y: this.y};
            this.to = to;
        };

        Bottle.prototype.update = function (delta) {
            Base.GameObject.prototype.update.call(this, delta);

            if (this.to !== null) {
                if (this._time < this._timeTotal) {
                    var t = this._time / this._timeTotal;

                    this.x = this.from.x + (this.to.x - this.from.x) * t;
                    this.y = this.from.y + (this.to.y - this.from.y) * t;

                    this._time += delta;

                    this.rotation -= (Math.PI * 2) * delta;
                } else {
                    this.monster.hit(10);
                    this.parent.removeChild(this);
                }
            }
        };

        return Bottle;
    }
)
;