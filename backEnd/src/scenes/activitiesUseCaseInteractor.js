var ActivityFactory = require('../services/activityFactory')

var ActivitiesUseCaseInteractor = function() {
    var activityRepository;
    var activitiesUseCaseInteractorOutput;

    function init(ActivityRepository, UseCaseInteractorOutput){
        activityRepository = ActivityRepository;
        activitiesUseCaseInteractorOutput = UseCaseInteractorOutput;
    };


    function addActivity(requestModel) {
        //var activity = ActivityFactory().createActivity(activityRepository.activityTypeForName(requestModel.name), requestModel);
        var activity = ActivityFactory().createActivity(requestModel);
        activityRepository.addActivity(activity);
    }

    // function addActivity(requestModel, done){
    //     try {
    //         var activity = ActivityFactory().createActivity(activityRepository.activityTypeForName(requestModel.name), requestModel);
    //         activityRepository.addActivity(activity, done);
    //     } catch(err) {
    //         console.log("Backend ERROR, cannot add. Msg: " + err);
    //     }
    // };

    // function getActivityNames(done) {

    //     try {
    //         var cb = function(activityNames) {
    //             var responseModel = {activityNames: activityNames};
    //             done(activitiesUseCaseInteractorOutput.formatActivityNames(responseModel))
    //         }
    //         activityRepository.fetchActivityNames(cb);
    //     } catch(err) {
    //         console.log("Backend ERROR, cannot cannot fetch activity names. Msg: " + err);
    //     }
    // }

    // function getActivities(done) {
    //     try {
    //         var cb = function(activities) {
    //             var responseModel = {activities: activities.map(activityToRes)}; 
    //             done(activitiesUseCaseInteractorOutput.formatGetActivities(responseModel));
    //         };
    //         activityRepository.fetchActivities(cb);
    //     } catch(err) {
    //         console.log("Backend ERROR, cannot fetch activities. Msg: " + err);
    //     }
    // };

    // function activityToRes(activity) {
    //     return activity.toObjLiteral();
    // }

    // function removeActivity(requestModel, done){
    //     try {
    //         activityRepository.removeActivity(new Date(requestModel.ISOStringDate), requestModel.title, done)
    //     } catch(err) {
    //         console.log("Backend ERROR, cannot remove activity. Msg: " + err);
    //     }
    // }

    return {
        init: init,
        addActivity: addActivity,
        // getActivityNames: getActivityNames,
        // getActivities: getActivities,
        // removeActivity: removeActivity
    };
};

module.exports = ActivitiesUseCaseInteractor;
