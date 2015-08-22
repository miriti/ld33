define([
    'base',
    'res',
    'monster',
    'game',
    'terrorize'
], function (Base,
             Res,
             Monster,
             Game,
             Terrorize) {
    var Lair = function () {
        Base.GameObject.call(this);
        
        var monster = this.monster = new Monster();
        
        this.terrorizeBtn = new Base.Button(Res.terrorize_btn.texture, function () {
            Game.instance.setState(new Terrorize(monster));
        });

        this.addChild(this.monster);
        this.addChild(this.terrorizeBtn);
    };

    ext(Lair, Base.GameObject);

    Lair.prototype.resize = function (windowWidth, windowHeight) {
        this.terrorizeBtn.x = windowWidth / 2 - this.terrorizeBtn.width / 2 - 30;
        this.terrorizeBtn.y = windowHeight / 2 - this.terrorizeBtn.height / 2 - 30;
    };

    return Lair;
});