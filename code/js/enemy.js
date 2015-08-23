define([
    'pixi',
    'base',
    'game',
    'deathReason'
], function (PIXI,
             Base,
             Game,
             DeathReason) {

    var Enemy = function (monster) {
        this.monster = monster;
        this.resistance = 10;
        this._mode = 'idle';
        this._deathReason = '';
        this._deathEarn = 10;

        Base.GameObject.call(this);
    };

    ext(Enemy, Base.GameObject);

    Enemy.prototype.toMonster = function () {
        return (this.parent.x + this.x) - this.monster.x;
    };
    
    Enemy.prototype.kill = function () {
        this._mode = 'die';

        Game.instance.founds += this._deathEarn;

        var reason = new DeathReason(this._deathReason, this._deathEarn);
        reason.x = this.x;
        reason.y = this.y;

        this.parent.addChild(reason);
    };

    Enemy.prototype.update = function (delta) {
        Base.GameObject.prototype.update.call(this, delta);

        if (this._mode == 'idle') {
            if (this.toMonster() < 500) {
                if (this.monster.getScareness() > this.resistance) {
                    this._deathReason = 'Heart Attack';
                    this.kill();
                } else {
                    this._mode = 'attack';
                    return;
                    if (Math.random() > 0.5) {
                        this._mode = 'run';
                    } else {
                        this._mode = 'attack';
                    }
                }
            }
        }

        if (this._mode == 'run') {
            this.scale.x = -1;
            this.x += 150 * delta;

            if (this.toMonster() > 2000) {
                this.parent.removeChild(this);
            }
        }
    };

    return Enemy;
});