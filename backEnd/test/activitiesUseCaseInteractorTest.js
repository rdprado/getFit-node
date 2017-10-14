var ActivitiesUseCaseInteractor = require('../src/scenes/activitiesUseCaseInteractor.js');
var assert = require("assert");

var ActivityRepositorySpy = function() {
    var addActivityCalled = false;
    function addActivity(activity) {
        addActivityCalled = true;
    }

    function getActivityCalled() {
        return addActivityCalled;
    }

    return {
        addActivity: addActivity,
        getActivityCalled: getActivityCalled

    }
}

var ActivityUseCaseInteractorOutput = function(){
}

var activityRepository = ActivityRepositorySpy();
var activityUseCaseInteractorOutput = ActivityUseCaseInteractorOutput();
var activitiesUseCaseInteractor = ActivitiesUseCaseInteractor();

describe('ActivitiesUseCaseInteractorTest', function(){

    before(function(){
        
    });

    beforeEach(function(){
        activityRepository = ActivityRepositorySpy();
        activityUseCaseInteractorOutput = ActivityUseCaseInteractorOutput();
        activitiesUseCaseInteractor = ActivitiesUseCaseInteractor();
        activitiesUseCaseInteractor.init(activityRepository, activityUseCaseInteractorOutput);
    });

    describe('#testAddActivityUseCase', function(){
        it('should receive raw data, create activity, call repository', function(){ 
            assert.equal(activityRepository.getActivityCalled(), false);
            activitiesUseCaseInteractor.addActivity({});
            assert.equal(activityRepository.getActivityCalled(), true);
        })
    })
})