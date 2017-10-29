//var AerobicActivity = require('../entities/aerobicActivity')
//var AnaerobicActivity = require('../entities/anaerobicActivity')

"use strict"

var Activity = require('../entities/activity.js');

function ActivityFactory() {

    function createActivity(params) {
        var activity = Activity();
        activity.init(params.date, params.title, params.instructions);
        return activity;
    }

    // function createActivity(activityType, params) {
    //     if(activityType === "Aerobic") {
    //         var activity = AerobicActivity();
    //         activity.initAerobicActivity(params.name,
    //                       params.date,
    //                       params.title,
    //                       params.comments, 
    //                       params.duration, 
    //                       params.distance);


    //         return activity; 
    //     } else {
    //         var activity = AnaerobicActivity();
    //         activity.initAnaerobicActivity(params.name,
    //                       params.date,
    //                       params.title,
    //                       params.comments,
    //                       params.duration,
    //                       params.sets,
    //                       params.reps,
    //                       params.weight);
    //         return activity; 
    //     }
    // }

    return {
         createActivity: createActivity
    }
}

module.exports = ActivityFactory;
