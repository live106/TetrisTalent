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
    block_select_png : "res/block_select.png",
    background_game_png : "res/background_game.png",
    button_pause_png : "res/button_pause.png",
    button_back_png : "res/button_back.png",
    background_level_png : "res/background_level.png",
    gear_bomb_png : "res/gear/bomb.png",
    gear_clock_png : "res/gear/clock.png",
    gear_hammer_png : "res/gear/hammer.png",
    gear_minus_png : "res/gear/minus.png",
    gear_plus_png : "res/gear/plus.png",
    gear_tape_png : "res/gear/tape.png"
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
    brickupmp3 : "res/sound/brickup.mp3",
    brickup_1_mp3 : "res/sound/brickup_1.mp3",
    brickup_2_mp3 : "res/sound/brickup_2.mp3",
    brickup_3_mp3 : "res/sound/brickup_3.mp3",
    brickup_4_mp3 : "res/sound/brickup_4.mp3",
    rotate_wav : "res/sound/rotate.wav",
    throwdown_wav : "res/sound/throwdown.wav"
};

var g_sounds = [];

for (var i in sound) {
    g_sounds.push(sound[i]);
};