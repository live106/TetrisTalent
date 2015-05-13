var res = {
    HelloWorld_png : "res/HelloWorld.png",
    button_normal_png : "res/button_normal.png",
    button_selected_png : "res/button_selected.png",
    blank_png : "res/blank.png",
    block_blue_png : "res/block_blue.png",
    block_green_png : "res/block_green.png",
    block_purple_png : "res/block_purple.png",
    block_red_png : "res/block_red.png",
    block_yellow_png : "res/block_yellow.png",
    block_select_png : "res/block_select.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
};

var sound = {
    button_pressed_normal_mp3 : "res/sound/button_pressed_normal.mp3",
    rotate_mp3 : "res/sound/rotate.mp3",
    landing_mp3 : "res/sound/landing.mp3",
    gameover_mp3 : "res/sound/gameover.mp3",
    brickup_mp3 : "res/sound/brickup.mp3",
    rotate_wav : "res/sound/rotate.wav",
    throwdown_wav : "res/sound/throwdown.wav"
};

var g_sounds = [];

for (var i in sound) {
    g_sounds.push(sound[i]);
};