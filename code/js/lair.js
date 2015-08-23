define([
    'pixi',
    'base',
    'res',
    'monster',
    'game',
    'terrorize',
    'monster/basicHead',
    'monster/angryHead',
    'monster/devilHead',
    'monster/basicHand',
    'monster/clawHand',
    'monster/sawHand'
], function (PIXI,
             Base,
             Res,
             Monster,
             Game,
             Terrorize,
             BasicHead,
             AngryHead,
             DevilHead,
             BasicHand,
             ClawHand,
             SawHand) {

    var PartSelectButton = function (Part, monster) {
        PIXI.Container.call(this);

        var shadowFilters = [new PIXI.filters.DropShadowFilter()];
        this.interactive = true;
        this.buttonMode = true;

        this.part = new Part();

        this.partSprite = this.part.sprite;

        var maxSize = 80;

        var partScale = this.part.width > this.part.height ? maxSize / this.part.width : maxSize / this.part.height;
        this.partSprite.pivot.set(0, 0);
        this.partSprite.scale.set(partScale);
        this.partSprite.pivot.set(this.partSprite.width / 2, this.partSprite.height / 2);
        this.partSprite.x = this.partSprite.y = 50;
        this.addChild(this.partSprite);

        this.priceText = new PIXI.Text("$" + this.part.price, {font: "30px Creepster", fill: "#ddd", align: "center"});
        this.priceText.y = 130;
        this.priceText.anchor.set(0.5, 0);
        this.priceText.x = 50;
        this.priceText.filters = shadowFilters;
        this.addChild(this.priceText);

        this.mouseover = function () {
            this.partSprite.filters = shadowFilters
            this.partSprite.scale.set(partScale * 1.2);
        };

        this.mouseout = function () {
            this.partSprite.filters = null;
            this.partSprite.scale.set(partScale);
        };

        this.click = function () {
            for (var i in monster.body.pivots[this.part.type]) {
                var pivot = monster.body.pivots[this.part.type][i];
                monster.body.attachPart(this.part.type, new Part(), pivot);
            }
        }
    };

    ext(PartSelectButton, PIXI.Container);

    var PartsSelectGroup = function (title, items, monster) {
        Base.GameObject.call(this);

        this.title = new PIXI.Text(title, {font: "35px Creepster", fill: "#ddd", align: "left"});
        this.addChild(this.title);

        var itemsContainer = new PIXI.Container();
        itemsContainer.y = this.title.height + 10;

        this.items = items;

        var nextX = 0;

        for (var i in this.items) {
            var item = this.items[i];

            item.x = nextX;
            itemsContainer.addChild(item);

            nextX += 80 + 20;
        }

        this.addChild(itemsContainer);
    };

    ext(PartsSelectGroup, Base.GameObject);

    var Lair = function (monster) {
        Base.GameObject.call(this);

        monster = this.monster = monster || new Monster();

        monster.health = monster.maxHealth;

        monster.death = function () {
            Game.instance.setState(new Lair(monster));
        };

        this.monster.healthBar.visible = false;

        var self = this;
        this.terrorizeBtn = new Base.Button(Res.terrorize_btn.texture, function () {
            if (monster.getPrice() <= Game.instance.founds) {
                Game.instance.founds -= self.monster.getPrice();
                self.monster.eachPart(function (part) {
                    part.bought = true;
                    console.log(part.bought);
                });
                Game.instance.setState(new Terrorize(monster));
            } else {
                self.foundsInfo.scale.set(2);
            }
        });

        var hintText = new PIXI.Text("Build a monster!", {font: "60px Creepster", fill: "#ccc", align: "center"});
        hintText.anchor.set(0.5, 0);
        hintText.y = -300;
        this.addChild(hintText);

        var headGroup = new PartsSelectGroup("Head", [
            new PartSelectButton(BasicHead, monster),
            new PartSelectButton(AngryHead, monster),
            new PartSelectButton(DevilHead, monster)
        ], monster);
        headGroup.y = -220;
        this.addChild(headGroup);

        var handGroup = new PartsSelectGroup("Hand", [
            new PartSelectButton(BasicHand, monster),
            new PartSelectButton(ClawHand, monster),
            new PartSelectButton(SawHand, monster)
        ]);
        handGroup.y = headGroup.y + headGroup.height + 30;
        this.addChild(handGroup);

        this.monsterInfo = new PIXI.Text("Price: $0\nScareness: 0", {font: "40px Creepster", fill: "#ccc"});
        this.monsterInfo.x = -300;
        this.monsterInfo.y = 170;
        this.addChild(this.monsterInfo);

        this.foundsInfo = new PIXI.Text("Founds: $" + Game.instance.founds, {font: "40px Creepster", fill: "#ccc"});
        this.foundsInfo.x = -300;
        this.foundsInfo.y = -220;
        this.addChild(this.foundsInfo);

        this.monster.x = -300;
        this.monster.y = -100;
        this.monster.scale.set(0.6);
        this.addChild(this.monster);
        this.addChild(this.terrorizeBtn);
    };

    ext(Lair, Base.GameObject);

    Lair.prototype.update = function (delta) {
        Base.GameObject.prototype.update.call(this, delta);
        this.monsterInfo.text = "Price: $" + this.monster.getPrice() + "\nScareness: " + this.monster.getScareness(), {
            font: "40px Creepster",
            fill: "#ccc"
        };

        if (this.foundsInfo.scale.x != 1) {
            this.foundsInfo.scale.x -= delta / 2;
            this.foundsInfo.scale.y -= delta / 2;

            if (this.foundsInfo.scale.x < 1) {
                this.foundsInfo.scale.set(1);
            }
        }
    };

    Lair.prototype.resize = function (windowWidth, windowHeight) {
        this.terrorizeBtn.x = windowWidth / 2 - this.terrorizeBtn.width / 2 - 30;
        this.terrorizeBtn.y = windowHeight / 2 - this.terrorizeBtn.height / 2 - 30;
    };

    return Lair;
});