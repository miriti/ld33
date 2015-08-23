define([
    'res',
    'enemy',
    'passer',
    'sound'], function (Res,
                        Enemy,
                        Passer,
                        Sound) {
    var PoliceMan = function (monster) {
        this.head = new PIXI.Sprite(Res.policeman_head.texture);

        this.head.pivot.set(27, 42);
        this.head.y = -45;

        this.body = new PIXI.Sprite(Res.policeman_body.texture);

        this.body.anchor.set(0.5, 0.5);

        this.hand = new PIXI.Sprite(Res.policeman_hand.texture);
        this.hand.anchor.set(1, 0.5);
        this.hand.x = -15;
        this.hand.y = -15;

        this.shot = new PIXI.Sprite(Res.policeman_gun_shot.texture);
        this.shot.anchor.set(1, 0.5);
        this.shot.x = this.hand.x - this.hand.width;
        this.shot.y = this.hand.y - 10;
        this.shot.visible = false;

        Passer.call(this, monster);

        this.resistance = 5 + 5 * Math.random();

        this.addChild(this.hand);
        this.addChild(this.shot);

        this._shotTime = 0;
        this._shotVisibleTime = 0;
    };

    ext(PoliceMan, Passer);

    PoliceMan.prototype.attack = function (delta) {

        if (this.toMonster() <= 200) {
            if (Math.random() > 0.8) {
                this._deathEarn = 25;
                this._deathReason = 'Heart Attack';
                this.kill();
            } else {
                this._mode = 'run';
            }
        } else {
            if (this._shotTime <= 0) {
                this._shotVisibleTime = 0.2;
                this.shot.visible = true;
                this._shotTime = 3;
                this.monster.hit(3);
                Sound.shot.play();
            } else {
                this._shotTime -= delta;
                if (this._shotVisibleTime <= 0) {
                    this.shot.visible = false;
                } else {
                    this._shotVisibleTime -= delta;
                }
            }
        }
    };

    return PoliceMan;
});