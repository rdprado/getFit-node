"use strict"

var ActivitiesUseCaseInteractor = require('../src/scenes/activitiesUseCaseInteractor.js');
var Activity = require('../src/entities/activity')
var assert = require("assert");

var ActivityRepositorySpy = function() {
    var addActivityCalled = false;
    var updateActivityCalled = false;
    var removeActivityCalled = false;
    var getActivitiesCalled = false;

    var activities = [];

    function setActivities(Activities) {
        activities = Activities;
    }

    function addActivity(activity) {
        addActivityCalled = true;
        return new Promise(function(resolve,reject){
            resolve();
        })
    }

    function updateActivity(activity) {
        updateActivityCalled = true;
        return new Promise(function(resolve,reject){
            resolve();
        })
    }

    function getActivities() {

        getActivitiesCalled = true;
        return new Promise(function(resolve,reject){
            resolve(activities);
        })
    }

    function removeActivity() {
        removeActivityCalled = true;
        return new Promise(function(resolve,reject){
            resolve();
        })
    }

    function getAddActivityCalled(){
        return addActivityCalled;
    };

    function getUpdateActivityCalled(){
        return updateActivityCalled;
    };

    function getRemoveActivityCalled(){
        return removeActivityCalled;
    }

    function getGetActivitiesCalled(){
        return getActivitiesCalled;
    }

    return {
        addActivity: addActivity,
        updateActivity: updateActivity,
        removeActivity: removeActivity,
        getActivities: getActivities,
        getAddActivityCalled: getAddActivityCalled,
        getUpdateActivityCalled: getUpdateActivityCalled,
        getRemoveActivityCalled: getRemoveActivityCalled,
        getGetActivitiesCalled: getGetActivitiesCalled,
        setActivities: setActivities

    }
}


var ActivityRepositorySpyError = function() {
    var addActivityCalled = false;
    var updateActivityCalled = false;
    var removeActivityCalled = false;
    var getActivitiesCalled = false;

    function addActivity(activity) {
        addActivityCalled = true;
        return new Promise(function(resolve,reject){
            reject();
        })
    }

    function updateActivity(activity) {
        updateActivityCalled = true;
        return new Promise(function(resolve,reject){
            reject();
        })
    }

    function getActivities() {

        getActivitiesCalled = true;
        return new Promise(function(resolve,reject){
            reject();
        })
    }

    function removeActivity() {
        removeActivityCalled = true;
        return new Promise(function(resolve,reject){
            reject();
        })
    }

    function getAddActivityCalled(){
        return addActivityCalled;
    };

    function getUpdateActivityCalled(){
        return updateActivityCalled;
    };

    function getRemoveActivityCalled(){
        return removeActivityCalled;
    }

    function getGetActivitiesCalled(){
        return getActivitiesCalled;
    }

    return {
        addActivity: addActivity,
        updateActivity: updateActivity,
        removeActivity: removeActivity,
        getActivities: getActivities,
        getAddActivityCalled: getAddActivityCalled,
        getUpdateActivityCalled: getUpdateActivityCalled,
        getRemoveActivityCalled: getRemoveActivityCalled,
        getGetActivitiesCalled: getGetActivitiesCalled,
    }
}


var ActivityUseCaseInteractorOutput = function(){
}

var activityRepository;
var activityRepositoryError;
var activityUseCaseInteractorOutput;
var activitiesUseCaseInteractor;

describe('ActivitiesUseCaseInteractorTest', function(){

    before(function(){
        
    });

    beforeEach(function(){
        activityRepository = ActivityRepositorySpy();
        activityRepositoryError = ActivityRepositorySpyError();
        activityUseCaseInteractorOutput = ActivityUseCaseInteractorOutput();
        activitiesUseCaseInteractor = ActivitiesUseCaseInteractor();
        activitiesUseCaseInteractor.init(activityRepository, activityUseCaseInteractorOutput);
    });

    describe('#testAddActivity', function(){
        it('should call repository add', function(done){ 
            assert.equal(activityRepository.getAddActivityCalled(), false);
            activitiesUseCaseInteractor.addActivity({}).then(function(){
                assert.equal(activityRepository.getAddActivityCalled(), true);
                done();
            }).catch(function(err){
                console.log(err);
            });  
        })
    })

    describe('#testAddActivityWithError', function(){
        it('should reject', function(done){ 

            activitiesUseCaseInteractor.init(activityRepositoryError, activityUseCaseInteractorOutput);

            assert.equal(activityRepositoryError.getAddActivityCalled(), false);
            activitiesUseCaseInteractor.addActivity({}).then(function(){
            }).catch(function(err){
                assert.equal(activityRepositoryError.getAddActivityCalled(), true);
                done();
            });
        })
    })

    describe('#testUpdateActivity', function(){
        it('should call repository update', function(done){ 
            assert.equal(activityRepository.getUpdateActivityCalled(), false);
            activitiesUseCaseInteractor.updateActivity({}).then(function(){
                done();
            }).catch(function(err){
                console.log(err);
            });
            assert.equal(activityRepository.getUpdateActivityCalled(), true);
        })
    })

    describe('#testUpdateActivityWithError', function(){
        it('should reject', function(done){ 

            activitiesUseCaseInteractor.init(activityRepositoryError, activityUseCaseInteractorOutput);

            assert.equal(activityRepositoryError.getUpdateActivityCalled(), false);
            activitiesUseCaseInteractor.updateActivity({}).then(function(){
            }).catch(function(err){
                assert.equal(activityRepositoryError.getUpdateActivityCalled(), true);
                done();
            });
        })
    })

    describe('#testRemoveActivity', function(){
        it('should call repository remove', function(done){ 
            assert.equal(activityRepository.getRemoveActivityCalled(), false);
            activitiesUseCaseInteractor.removeActivity(new Date(), "title").then(function(){
                done();
            }).catch(function(err){
                console.log(err);
            });
            assert.equal(activityRepository.getRemoveActivityCalled(), true);
        })
    })

    describe('#testRemoveActivityWithError', function(){
        it('should reject', function(done){ 

            activitiesUseCaseInteractor.init(activityRepositoryError, activityUseCaseInteractorOutput);

            assert.equal(activityRepositoryError.getRemoveActivityCalled(), false);
            activitiesUseCaseInteractor.removeActivity(new Date(), "my title").then(function(){
            }).catch(function(err){
                assert.equal(activityRepositoryError.getRemoveActivityCalled(), true);
                done();
            });
        })
    })
    
    describe('#testGetActivities', function(){
        it('should call repository get and that should return a promise with the responseModel', function(done){ 

            var activity = Activity();
            var date = new Date();
            activity.init(date, "bench press", "do it this way!");
            activityRepository.setActivities([activity]);

            assert.equal(activityRepository.getGetActivitiesCalled(), false);
            activitiesUseCaseInteractor.getActivities().then(function(responseModel){
                assert.equal(responseModel.activities[0].date, date)
                assert.equal(responseModel.activities[0].title, "bench press")
                assert.equal(responseModel.activities[0].instructions, "do it this way!")
                done();
            }).catch(function(err){
                console.log(err);
            });

            assert.equal(activityRepository.getGetActivitiesCalled(), true);
            
        })
    })

    describe('#testGetActivitiesWithError', function(){
        it('should reject', function(done){ 

            activitiesUseCaseInteractor.init(activityRepositoryError, activityUseCaseInteractorOutput);

            assert.equal(activityRepositoryError.getGetActivitiesCalled(), false);
            activitiesUseCaseInteractor.getActivities().then(function(responseModel){
            }).catch(function(err){
                assert.equal(activityRepositoryError.getGetActivitiesCalled(), true);
                done();
            });            
        })
    })
})