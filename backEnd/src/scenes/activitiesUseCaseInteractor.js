var ActivityFactory = require('../services/activityFactory')

var ActivitiesUseCaseInteractor = function() {
    var activityRepository;
    var activitiesUseCaseInteractorOutput;

    function init(ActivityRepository, UseCaseInteractorOutput){
        activityRepository = ActivityRepository;
        activitiesUseCaseInteractorOutput = UseCaseInteractorOutput;
    };

    function addActivity(requestModel, done){
        try {
            var activity = ActivityFactory().createActivity(activityRepository.activityTypeForName(requestModel.name), requestModel);
            activityRepository.addActivity(activity, done);
        } catch(err) {
            console.log(err);
        }
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
