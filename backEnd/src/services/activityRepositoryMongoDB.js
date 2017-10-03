var ActivityFactory = require('../services/activityFactory');
var MongoCommon = require('./mongoCommon');

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
        var doc = activity.toObjLiteral();
        mongoCommon.addDoc(doc);
         //addDoc(doc, done);
    }

    // function removeActivity(date, title, done) {
    //     var filter = {date: date, title: title};
    //     removeDoc(filter, done);
    // }

    function fetchActivities() {
        return mongoCommon.fetchDocs();
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
    //     removeActivity: removeActivity
    };
}

module.exports = ActivityRepositoryMongoDB;
