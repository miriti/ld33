window.ext = function (a, b) {
    a.prototype = Object.create(b.prototype);
    a.prototype.constructor = a;
    return a;
};

require([
    'pixi',
    'res',
    'game',
    'menu',
    'sound'], function (PIXI,
                        Res,
                        Game,
                        Menu,
                        Sound) {

    var renderer = new PIXI.WebGLRenderer(800, 600);
    renderer.backgroundColor = 0x222222;
    document.body.appendChild(renderer.view);

    var game = new Game();

    var resize = window.onresize = function () {
        renderer.resize(window.innerWidth, window.innerHeight);
        game.x = window.innerWidth / 2;
        game.y = window.innerHeight / 2;
        game.resize(window.innerWidth, window.innerHeight);
    };

    resize();

    var render = function () {
        game.update(60 / 1000);
        renderer.render(game);
        requestAnimationFrame(render);
    };

    render();

    Res.go(function () {
        Sound.init();
        game.setState(new Menu());
    });
});