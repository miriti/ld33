define([
    'pixi',
    'base'
], function (PIXI,
             Base) {

    var DeathReason = function (reason, earn) {
        Base.GameObject.call(this);

        var text = new PIXI.Text(reason + "\n+ $" + earn, {font: "40px Creepster", fill: "#ccc", align: "center"});
        this.addChild(text);

        this._totaltime = 10;
        this._time = 0;
    };

    ext(DeathReason, Base.GameObject);

    DeathReason.prototype.update = function (delta) {
        if (this._time >= this._totaltime) {
            this.parent.removeChild(this);
        } else {
            Base.GameObject.prototype.update.call(this, delta);

            this.y -= 20 * delta;

            this._time += delta;
            this.alpha = 1 - (this._time / this._totaltime);
        }
    };

    return DeathReason;
});