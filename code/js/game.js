define(['base'], function (Base) {
    var Game = function () {
        Base.GameObject.call(this);

        this.interactive = true;
        this.currentState = null;

        Game.instance = this;
    };

    ext(Game, Base.GameObject);

    Game.prototype.setState = function (newState) {
        if (this.currentState != null) {
            this.removeChild(this.currentState);
        }

        this.currentState = newState;
        this.addChild(this.currentState);
    };

    return Game;
});