define([
    'res',
    'base',
    'game',
    'lair'
], function (Res,
             Base,
             Game,
             Lair) {
    var Menu = function () {
        Base.GameObject.call(this);

        var logo = new PIXI.GameSprite(Res.logo.texture);
        logo.y = -100;

        var startButton = new Base.Button(Res.start_btn.texture, function () {
            Game.instance.setState(new Lair());
        });
        startButton.y = 100;

        this.addChild(logo);
        this.addChild(startButton);
    };

    return ext(Menu, Base.GameObject);
});