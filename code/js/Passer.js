define([
    'pixi',
    'res',
    'enemy',
    'bottle',
    'sound'
], function (PIXI,
             Res,
             Enemy,
             Bottle,
             Sound) {
    var Passer = function (monster) {
        Enemy.call(this, monster);

        if (!this.head) {
            this.head = new PIXI.Sprite(Res.passer_head.texture);
            this.head.y = -45;
            this.head.pivot.set(20, 34);
        }

        this.head_dead = new PIXI.Sprite(Res.passer_head_dead.texture);
        this.head_dead.pivot.set(20, 34);
        this.head_dead.y = -45;

        if (!this.body) {
            this.body = new PIXI.Sprite(Res.passer_body.texture);
            this.body.anchor.set(0.5, 0.5);
        }

        this.legs = [
            new PIXI.Sprite(Res.passer_leg.texture),
            new PIXI.Sprite(Res.passer_leg.texture)
        ];


        var bodyContainer = new PIXI.Container();
        this.addChild(bodyContainer);

        bodyContainer.addChild(this.body);
        bodyContainer.addChild(this.head);

        for (var i = 0; i < 2; i++) {
            this.legs[i].pivot.set(14, 7);

            var legContainer = new PIXI.Container();
            legContainer.x = -10 + i * 20;
            legContainer.y = 40;

            legContainer.addChild(this.legs[i]);
            bodyContainer.addChild(legContainer);
        }

        this._phase = 0;

        this._deathEarn = 15;

        this.resistance = 1.6 + Math.random() * 0.6;
    };

    ext(Passer, Enemy);

    Passer.prototype.kill = function () {
        Sound.attack.play();
        Enemy.prototype.kill.call(this);
        this.pivot.set(this.width / 2, this.height);
        this.x += this.width / 2;
        this.y += this.height;

        this.removeChild(this.head);
        this.addChild(this.head_dead);
    };

    Passer.prototype.attack = function (delta) {
        var bottle = new Bottle(this.monster);

        bottle.x = this.x + this.parent.x;
        bottle.y = this.y + this.parent.y;

        bottle.throw({
            x: this.monster.x + this.monster.width / 2,
            y: this.monster.y + this.monster.height / 4
        });

        Sound.bottle.play();
        this.parent.parent.addChild(bottle);

        this._mode = 'run';
    };

    Passer.prototype.update = function (delta) {
        Enemy.prototype.update.call(this, delta);

        if (this._mode == 'run') {
            for (var i = 0; i < 2; i++) {
                var fnx = i == 0 ? Math.cos : Math.sin;

                this.legs[i].y = fnx(this._phase) * 5;
            }

            this._phase += (Math.PI * 2) * delta;
        }

        if (this._mode == 'die') {
            if (this.rotation < Math.PI / 2) {
                this.rotation += Math.PI * delta;
            }
        }

        if (this._mode == 'attack') {
            this.attack(delta);
        }
    };

    return Passer;
});