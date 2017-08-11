var ActivityFactory = require('../services/activityFactory')

var ActivitiesUseCaseInteractor = function() {
    var activityRepository;
    var activitiesUseCaseInteractorOutput;

    function init(activitiesRepository, useCaseInteractorOutput){
        activityRepository = activitiesRepository;
        activitiesUseCaseInteractorOutput = useCaseInteractorOutput;
    };

    function addActivity(requestModel, done){
        var activity = ActivityFactory().createActivity(activitiesRepository.activityTypeForName(requestModel.name), requestModel);
        activityRepository.addActivity(activity, done);
    };

    function getActivityNames(done) {

        var cb = function(activityNames) {
            var responseModel = {activityNames: activityNames};
            done(activitiesUseCaseInteractorOutput.formatActivityNames(responseModel))
        }

        activityRepository.fetchActivityNames(cb);
    }

    function getActivities(done) {
        var cb = function(activities) {
            var responseModel = {activities: activities.map(activityToRes)}; 
            done(activitiesUseCaseInteractorOutput.formatGetActivities(responseModel));
        };

        activityRepository.fetchActivities(cb);
    };

    function activityToRes(activity) {
        return activity.toObjLiteral();
    }

    function removeActivity(requestModel, done){
        activityRepository.removeActivity(new Date(requestModel.ISOStringDate), requestModel.title, done)
    }

    return {
        init: init,
        addActivity: addActivity,
        getActivityNames: getActivityNames,
        getActivities: getActivities,
        removeActivity: removeActivity
    };
};

module.exports = ActivitiesUseCaseInteractor;
