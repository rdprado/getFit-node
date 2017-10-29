"use strict"

var ActivityFactory = require('../services/activityFactory')

var ActivitiesUseCaseInteractor = function() {
    var activityRepository;
    var activitiesUseCaseInteractorOutput;

    function init(ActivityRepository, UseCaseInteractorOutput){
        activityRepository = ActivityRepository;
        activitiesUseCaseInteractorOutput = UseCaseInteractorOutput;
    };

    function addActivity(requestModel) {

        return new Promise(function(resolve, reject){
            var activity = ActivityFactory().createActivity(requestModel)
            activityRepository.addActivity(activity).then(function(){
                resolve();
            }).catch(function(err){
                reject(err);
            });
        })
    }

    function updateActivity(requestModel) {

        return new Promise(function(resolve,reject) {
            var activity = ActivityFactory().createActivity(requestModel);
            
            activityRepository.updateActivity(activity).then(function(){
                resolve();
            }).catch(function(err){
                reject(err);
            });
        })
    }

    function removeActivity(date, title) {

        return new Promise(function(resolve,reject) {
            activityRepository.removeActivity(date, title).then(function(){
                resolve();
            }).catch(function(err){
                reject(err);
            });
        })
    }

    function getActivities() {

        return new Promise(function(resolve,reject){
            activityRepository.getActivities().then(function(activities){
                var responseModel = {activities: activities.map(activityToRes)}; 
                resolve(responseModel);
            }).catch(function(err){
                reject(err);
            });
        })
    }

    function activityToRes(activity) {
        return activity.toObjLiteral();
    }

    return {
        init: init,
        addActivity: addActivity,
        updateActivity: updateActivity,
        removeActivity: removeActivity,
        getActivities: getActivities
    };
};

module.exports = ActivitiesUseCaseInteractor;
