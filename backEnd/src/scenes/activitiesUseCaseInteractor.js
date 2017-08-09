var Activity = require('../entities/activity')

var ActivitiesUseCaseInteractor = function() {
    var activityRepository;
    var activitiesUseCaseInteractorOutput;

    function init(activitiesRepository, useCaseInteractorOutput){
        activityRepository = activitiesRepository;
        activitiesUseCaseInteractorOutput = useCaseInteractorOutput;
    };

    function addActivity(requestModel, done){
        activityRepository.addActivity(reqToActivity(requestModel), done);
    };
	
	function getActivityTypes(done) {
		
		var cb = function(activityTypes) {
			var responseModel = {activityTypes: activityTypes};
			done(activitiesUseCaseInteractorOutput.formatActivityTypes(responseModel))
		}
		
		activityRepository.fetchActivityTypes(cb);
	}
	
    function getActivities(done) {
        var cb = function(activities) {
            var responseModel = {activities: activities.map(activityToRes)}
            done(activitiesUseCaseInteractorOutput.formatGetActivities(responseModel));
        };

        activityRepository.fetchActivities(cb);
    };

    function removeActivity(requestModel, done){
        activityRepository.removeActivity(new Date(requestModel.ISOStringDate), requestModel.title, done)
    }

	
	function reqToActivity(req) {
        var activity = Activity();
        activity.init(new Date(req.ISOStringDate), req.title, req.comments);
		
        return activity;
    };
	
    function activityToRes(activity) {
        return activity.toObjLiteral();
    }


    return {
        init: init,
        addActivity: addActivity,
		getActivityTypes: getActivityTypes,
        getActivities: getActivities,
        removeActivity: removeActivity
    };
};

module.exports = ActivitiesUseCaseInteractor;
