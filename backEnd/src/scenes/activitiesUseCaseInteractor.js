var ActivityFactory = require('../services/activityFactory')

var ActivitiesUseCaseInteractor = function() {
    var activityRepository;
    var activitiesUseCaseInteractorOutput;

    function init(ActivityRepository, UseCaseInteractorOutput){
        activityRepository = ActivityRepository;
        activitiesUseCaseInteractorOutput = UseCaseInteractorOutput;
    };

    function addActivity(requestModel) {
        var activity = ActivityFactory().createActivity(requestModel);
        activityRepository.addActivity(activity);
    }

    function updateActivity(requestModel) {
        var activity = ActivityFactory().createActivity(requestModel);
        activityRepository.updateActivity(activity);
    }

    function removeActivity(date, title) {
        activityRepository.removeActivity(date, title);
    }

    function getActivities() {
        activityRepository.getActivities();
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
