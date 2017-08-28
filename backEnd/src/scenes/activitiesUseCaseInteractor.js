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
            console.log("Error|Backend|WorkoutsInteractor|Problem adding||" + err);
        }
    };

    function getActivityNames(done) {

        try {
            var cb = function(activityNames) {
                var responseModel = {activityNames: activityNames};
                done(activitiesUseCaseInteractorOutput.formatActivityNames(responseModel))
            }
            activityRepository.fetchActivityNames(cb);
        } catch(err) {
            console.log("Error|Backend|GetActivityNames|Problem retrieving activity names||" + err);
        }
    }

    function getActivities(done) {
        try {
            var cb = function(activities) {
                var responseModel = {activities: activities.map(activityToRes)}; 
                done(activitiesUseCaseInteractorOutput.formatGetActivities(responseModel));
            };
            activityRepository.fetchActivities(cb);
        } catch(err) {
            console.log("Error|Backend|GetActivities|Problem retrieving activities||" + err);
        }
    };

    function activityToRes(activity) {
        return activity.toObjLiteral();
    }

    function removeActivity(requestModel, done){
        try {
            activityRepository.removeActivity(new Date(requestModel.ISOStringDate), requestModel.title, done)
        } catch(err) {
            console.log("Error|Backend|RemoveActivity|Problem removing activity||" + err);
        }
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
