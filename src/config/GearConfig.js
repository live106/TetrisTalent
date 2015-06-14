/**
 * Created by None on 5/25/15.
 */

var TTGearType =
{
    gear_type_decline: 1,
    gear_type_repair: 2,
    gear_type_bomb:3,
    gear_type_hammer:4,
    gear_type_tape:5
};
var TTGears = {
    gearDecLine: {
        type: TTGearType.gear_type_decline,
        name: "减行",
        res: res.gear_minus_png
    },

    gearRepair: {
        type: TTGearType.gear_type_repair,
        name: "胶带",
        res: res.gear_tape_png
    },

    gearBomb: {
        type: TTGearType.gear_type_bomb,
        name: "炸弹",
        res: res.gear_bomb_png
    },

    gearHammer: {
        type: TTGearType.gear_type_hammer,
        name: "锤子",
        res: res.gear_hammer_png
    }

};

var TTGearTrigger = {
    trigger_type_score: 1,
    trigger_type_clear_lines: 2,
    trigger_type_combo_score: 3
};

var TTGearConfig = {
    configure: [
        {
            condition: {type: TTGearTrigger.trigger_type_clear_lines, value: 2},
            gear: {type: TTGears.gearDecLine, count: 2}
        },
        {
            condition: {type: TTGearTrigger.trigger_type_score, value: 10},
            gear: {type: TTGears.gearRepair, count: 1}
        }
    ]
}