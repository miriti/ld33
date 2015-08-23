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

        var logo = new PIXI.Text("Freak Craft", {font: "160px Creepster", fill: "#eee", align: "center"});
        logo.anchor.set(0.5, 0);
        logo.y = -200;

        var startButton = new Base.Button(Res.start_btn.texture, function () {
            Game.instance.setState(new Lair());
        });
        startButton.y = 100;

        this.addChild(logo);
        this.addChild(startButton);
    };

    return ext(Menu, Base.GameObject);
});