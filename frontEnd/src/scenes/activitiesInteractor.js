var ActivitiesInteractor = function() {

    var activityRepository;
    var interactorOutput;

    function init(activityRep, activitiesInteractorOutput) {
        activityRepository = activityRep;
        interactorOutput = activitiesInteractorOutput;
    }

    function changeToWeek(weekBegin, weekEnd){

        activityRepository.getActivities((activities)=>{

            var responseModel = {
                weekBegin: weekBegin,
                weekEnd: weekEnd,
                activities: activities.map(activityToRes) 
            }

            interactorOutput.presentWeek(responseModel);
        });
    }

	function listActivityTypes() {
		console.log("list types")
		var activityTypes = activityRepository.getActivityTypes((activityTypes)=>{
			interactorOutput.presentActivityTypes(activityTypes);
		});
	}
	
    function addActivity(requestModel) {
        console.log('add');

        activityRepository.addActivity(reqToActivity(requestModel), (activities)=> {
            interactorOutput.presentActivities(activities.map(activityToRes))
        });
    };


    function removeActivity(requestModel) {
        console.log('remove');

		var date = new Date(requestModel.ISOStringDate)
		
        activityRepository.removeActivity(date, requestModel.title, (activities)=>{
            interactorOutput.presentActivities(activities.map(activityToRes))
        });
    };

    function listActivities() {
        console.log('get');
        activityRepository.getActivities((activities)=> {
            interactorOutput.presentActivities(activities.map(activityToRes))
        });
    };

    // model transformation

    function reqToActivity(req){
        var activity = Activity();
        var date = new Date(req.dateYear, req.dateMonth - 1, req.dateDayInMonth)
        activity.init(date, req.title, req.comments);
        return activity;
    };

    function activityToRes(activity) {
        return activity.toObjLiteral();
    }


    return {
        init: init,
		listActivityTypes: listActivityTypes,
        listActivities: listActivities,
        addActivity: addActivity,
        removeActivity: removeActivity,
        changeToWeek: changeToWeek
    }
}
