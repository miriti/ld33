define([
    'pixi',
    'res',
    'sound'], function (PIXI,
                        Res,
                        Sound) {
    var GameObject = function () {
        PIXI.Container.call(this);
    };

    ext(GameObject, PIXI.Container);

    GameObject.prototype.addChild = function (child) {
        PIXI.Container.prototype.addChild.call(this, child);

        if (child.resize) {
            child.resize(window.innerWidth, window.innerHeight);
        }
    };

    GameObject.prototype.update = function (delta) {
        for (var i in this.children) {
            var child = this.children[i];
            if (child.update) {
                child.update(delta);
            }
        }
    };

    GameObject.prototype.resize = function (windowWidth, windowHeight) {
        this.children.forEach(function (i, child) {
            if (child.resize) {
                child.resize(windowWidth, windowHeight);
            }
        });
    };

    var Button = function (texture, action) {
        GameObject.call(this);

        var sprite = new PIXI.GameSprite(texture);
        this.addChild(sprite);

        this.interactive = true;
        this.buttonMode = true;

        this.mouseover = function () {
            Sound.bip_1.play();
            this.scale.set(1.2);
        };

        this.mouseout = function () {
            this.scale.set(1);
        };

        this.click = function () {
            action.call(null);
        }
    };

    ext(Button, GameObject);

    return {
        GameObject: GameObject,
        Button: Button
    }
});