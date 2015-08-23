define([
    '../lib/buzz/dist/buzz.js',
    'res'], function (buzz,
                      Res) {

    var Sound = {};

    Sound.init = function () {
        Sound.bip_1 = new buzz.sound(Res.snd_bip_1.url);
        Sound.bip_2 = new buzz.sound(Res.snd_bip_2.url);
        Sound.shot = new buzz.sound(Res.snd_shot.url);
        Sound.attack = new buzz.sound(Res.snd_attack.url);
        Sound.bottle = new buzz.sound(Res.snd_bottle.url);
    };

    return Sound;
});