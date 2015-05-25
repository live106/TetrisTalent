/**
 * Created by None on 5/25/15.
 */

var TTGears = {
    gearDecLine: {
        name: "减行",
        res: res.block_blue_png
    },

    gearRepair: {
        name: "胶带",
        res: res.block_green_png
    },

    gearBomb: {
        name: "炸弹",
        res: res.block_blue_png
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