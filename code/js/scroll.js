define(['base'], function (Base) {

    var Scroll = function (Pattern, minWidth) {
        Base.GameObject.call(this);

        this.Pattern = Pattern;
        this.shiftX = 0;

        this.pieces = [];
        this.minWidth = minWidth || window.innerWidth;

        this.plane = new PIXI.Container();
        this.addChild(this.plane);

        this.init();
    };

    ext(Scroll, Base.GameObject);

    Scroll.prototype.init = function () {
        for (var i in this.pieces) {
            this.plane.removeChild(this.pieces[i]);
        }

        this.pieces = [];

        var currentX = 0;
        while ((this.plane.width < this.minWidth) || (this.pieces.length < 4)) {
            var piece = new this.Pattern();
            piece.x = currentX;
            currentX += piece.width;

            this.plane.addChild(piece);

            this.pieces.push(piece);
        }
        
        this.scroll(this.shiftX);
    };

    Scroll.prototype.scroll = function (dx) {
        this.shiftX += dx;
        this.plane.x = -this.plane.width / 2 + this.shiftX % this.pieces[0].width;
    };

    return Scroll;
});