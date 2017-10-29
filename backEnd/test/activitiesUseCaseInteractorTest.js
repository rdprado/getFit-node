var ActivitiesUseCaseInteractor = require('../src/scenes/activitiesUseCaseInteractor.js');
var assert = require("assert");

var ActivityRepositorySpy = function() {
    var addActivityCalled = false;
    var updateActivityCalled = false;
    var removeActivityCalled = false;
    var getActivitiesCalled = false;

    function addActivity(activity) {
        addActivityCalled = true;
    }

    function updateActivity(activity) {
        updateActivityCalled = true;
    }

    function getActivities() {
        getActivitiesCalled = true;
    }

    function removeActivity() {
        removeActivityCalled = true;
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
        getGetActivitiesCalled: getGetActivitiesCalled

    }
}

var ActivityUseCaseInteractorOutput = function(){
}

var activityRepository;
var activityUseCaseInteractorOutput;
var activitiesUseCaseInteractor;

describe('ActivitiesUseCaseInteractorTest', function(){

    before(function(){
        
    });

    beforeEach(function(){
        activityRepository = ActivityRepositorySpy();
        activityUseCaseInteractorOutput = ActivityUseCaseInteractorOutput();
        activitiesUseCaseInteractor = ActivitiesUseCaseInteractor();
        activitiesUseCaseInteractor.init(activityRepository, activityUseCaseInteractorOutput);
    });

    describe('#testAddActivity', function(){
        it('should call repository add', function(){ 
            assert.equal(activityRepository.getAddActivityCalled(), false);
            activitiesUseCaseInteractor.addActivity({});
            assert.equal(activityRepository.getAddActivityCalled(), true);
        })
    })

    describe('#testUpdateActivity', function(){
        it('should call repository update', function(){ 
            assert.equal(activityRepository.getUpdateActivityCalled(), false);
            activitiesUseCaseInteractor.updateActivity({});
            assert.equal(activityRepository.getUpdateActivityCalled(), true);
        })
    })

    describe('#testRemoveActivity', function(){
        it('should call repository remove', function(){ 
            assert.equal(activityRepository.getRemoveActivityCalled(), false);
            activitiesUseCaseInteractor.removeActivity({});
            assert.equal(activityRepository.getRemoveActivityCalled(), true);
        })
    })
    
    describe('#testGetActivities', function(){
        it('should call repository get', function(){ 
            assert.equal(activityRepository.getGetActivitiesCalled(), false);
            activitiesUseCaseInteractor.getActivities();
            assert.equal(activityRepository.getGetActivitiesCalled(), true);
        })
    })
})