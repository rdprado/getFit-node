var ActivityFactory = require('../services/activityFactory');
var MongoCommon = require('./mongoCommon');
var ActivityValidator = require('../services/activityValidator')


var ActivityRepositoryMongoDB = function() {

    var db;
    var mongoCommon;
    const COLLECTION_NAME = 'activities';

    // var activityNamesPerType = [ 
    //     { 
    //         activityType: "Aerobic",
    //         names: ["Running", "Cycling", "Rowing"] 
    //     },
    //     { 
    //         activityType: "Anaerobic",
    //         names: ["Weights"]
    //     },

    // ];

    function init(DB, MongoCommon) {
         db = DB;
         mongoCommon = MongoCommon;
         mongoCommon.init(db, COLLECTION_NAME);
    }

    // function activityTypeForName(activityName) {
    //     for(pair in activityNamesPerType) {
    //         if(activityNamesPerType[pair].names.indexOf(activityName) >= 0) {
    //             return activityNamesPerType[pair].activityType;
    //         } 
    //     }
    //     return '';
    // }


    //function addActivity(activity){
    //    return mongoCommon.addDoc(activity);
    //}

    function addActivity(activity) {
        var p = new Promise(function(resolve, reject) {
            try {
                var activityValidator = ActivityValidator();
                if(activityValidator.isValidActivity(activity)) {
                    var doc = activity.toObjLiteral();
                    mongoCommon.addDoc(doc);
                    resolve();    
                } else {
                    reject("Can't add activity with invalid parameters");
                }
            } catch(err) {
                reject(err);
            }
        })

        return p;
    }


    function removeActivity(date, title) {

        var p = new Promise(function(resolve, reject){
            try{

                var activityValidator = ActivityValidator();
                if(activityValidator.isValidDate(date) && activityValidator.isValidTitle(title)) {
                    var filter = {date: date, title: title};
                    mongoCommon.removeDoc(filter);
                    resolve();
                } else {
                    reject("Can't remove activity with invalid parameters");
                }
            } catch(err) {
                reject(err);
            }
        });

        return p;
    }

    function fetchActivities() {
        mongoCommon.fetchDocs();
    }

    function updateActivity(activity) {
        var filter = {date: activity.getDate(), title: activity.getTitle()};
        var paramsToUpdate = {done: activity.getIsDone()}
        mongoCommon.updateActivity(filter, paramsToUpdate);
    }

    // function fetchActivities(done) {
    //     var mapCB = (mongoDoc) => {
    //         return ActivityFactory().createActivity(activityTypeForName(mongoDoc.name), mongoDoc);
    //     }

    //     fetchDocs(done, mapCB);
    // }

    // function fetchActivityNames(done) {
    //     done(activityNamesPerType);
    // }



    // // API

    return {
         init: init,
    //     activityTypeForName: activityTypeForName,
         //addActivity: addActivity,
         addActivity: addActivity,
    //     fetchActivityNames: fetchActivityNames,
         fetchActivities: fetchActivities,
         removeActivity: removeActivity,
         updateActivity: updateActivity
    };
}

module.exports = ActivityRepositoryMongoDB;
