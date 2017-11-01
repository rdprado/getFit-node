"use strict"

var ActivityFactory = require('../services/activityFactory');
var MongoCommon = require('./mongoCommon');

var ActivityRepositoryMongoDB = function() {

    var db;
    var mongoCommon;
    const COLLECTION_NAME = 'activities';

    function init(DB, MongoCommon) {
         db = DB;
         mongoCommon = MongoCommon;
         mongoCommon.init(db, COLLECTION_NAME);
    }

    function addActivity(activity) {
        var p = new Promise(function(resolve, reject) {
            var doc = activity.toObjLiteral();
                mongoCommon.addDoc(doc).then(function(){
                resolve();
            }).catch(function(err){
                reject(new Error("CannotAddError: cannot add the required activity."));
            })
        })

        return p;
    }

    function removeActivity(date, title) {

        var p = new Promise(function(resolve, reject){
            var filter = {date: date, title: title};
            mongoCommon.removeDoc(filter).then(function(){
                resolve();
            }).catch(function(err){
                reject(new Error("CannotRemoveError: cannot remove activity with date " + date + " and title " + title + "."));
            });
        });

        return p;
    }

    function fetchActivities() {
        return new Promise( function(resolve,reject){
            mongoCommon.fetchDocs().then(function(docs){
                var activities = docs.map((mongoDoc) => {
                    return ActivityFactory().createActivity(mongoDoc);
                })

                resolve(activities);
            }).catch(function(err){
                reject(new Error("CannotFetchError: cannot fetch activities."));
            })
        })
        
    }

    function updateActivity(activity) {
        return new Promise(function(resolve,reject){

            var filter = {date: activity.getDate(), title: activity.getTitle()};
            var paramsToUpdate = {done: activity.getIsDone()}

            mongoCommon.updateDoc(filter, paramsToUpdate).then(function(){
                resolve();
            }).catch(function(err){
                reject(new Error("CannotUpdateError: cannot update the required activity."));
            });
        })
    }

    // // API

    return {
         init: init,
         addActivity: addActivity,
         fetchActivities: fetchActivities,
         removeActivity: removeActivity,
         updateActivity: updateActivity
    };
}

module.exports = ActivityRepositoryMongoDB;
//module.exports = CannotAdd;
