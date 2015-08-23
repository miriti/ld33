define(['pixi'], function (PIXI) {
    var basePath = "data/";

    var list = {
        body: "img/monster/body.png",
        hand: "img/monster/hand.png",
        hand_2_arm: "img/monster/hand_2_arm.png",
        hand_2_palm: "img/monster/hand_2_palm.png",
        hand_3_arm: "img/monster/hand_3_arm.png",
        hand_3_palm: "img/monster/hand_3_palm.png",
        head_1: "img/monster/head_1.png",
        head_2: "img/monster/head_2.png",
        head_3: "img/monster/head_3.png",
        bottle: "img/bottle.png",
        leg: "img/monster/leg.png",
        logo: "img/logo.png",
        start_btn: "img/start_btn.png",
        terrorize_btn: "img/terrorize_btn.png",
        moon: "img/moon.png",
        back: "img/back.png",
        road: "img/road.jpg",
        street_lamp: "img/street_lamp.png",
        grass: "img/grass.png",
        passer_head: "img/passer/head.png",
        passer_head_dead: "img/passer/head_dead.png",
        passer_body: "img/passer/body.png",
        passer_leg: "img/passer/leg.png",
        policeman_body: "img/policeman/body.png",
        policeman_head: "img/policeman/head.png",
        policeman_hand: "img/policeman/hand.png",
        policeman_gun_shot: "img/policeman/gun_shot.png",
        snd_shot: "snd/shot.mp3",
        snd_attack: "snd/attack.mp3",
        snd_bottle: "snd/bottle.mp3",
        snd_bip_1: "snd/bip_1.mp3",
        snd_bip_2: "snd/bip_2.mp3"
    };

    var Resources = function () {
        this.loader = PIXI.loader;

        for (var id in list) {
            this.loader.add(id, basePath + list[id]);
        }
    };

    Resources.prototype.go = function (callback) {
        var self = this;

        this.loader.once('complete', function () {
            for (var r in this.resources) {
                self[r] = this.resources[r];
            }
            callback.call();
        });

        this.loader.load();
    };

    return new Resources();
});