define(function () {
    var Pivot = function (x, y, layer) {
        this.x = x;
        this.y = y;
        this.part = null;
        this.layer = layer || null;
    };

    return Pivot;
});