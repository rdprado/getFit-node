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
		
		var activity = ActivityFactory().createActivity(requestModel);
		
        activityRepository.addActivity(activity, (activities)=> {
            interactorOutput.presentActivities(activities.map(activity.toObjLiteral()))
        });
    };

    function removeActivity(requestModel) {
        console.log('remove');

		var date = new Date(requestModel.ISOStringDate)
		
        activityRepository.removeActivity(date, requestModel.title, (activities)=>{
            interactorOutput.presentActivities(activities.map(activity.toObjLiteral()))
        });
    };

    function listActivities() {
        console.log('get');
        activityRepository.getActivities((activities)=> {
            interactorOutput.presentActivities(activities.map(activity.toObjLiteral()))
        });
    };

    return {
        init: init,
		listActivityTypes: listActivityTypes,
        listActivities: listActivities,
        addActivity: addActivity,
        removeActivity: removeActivity,
        changeToWeek: changeToWeek
    }
}

function ActivityFactory(activityType, params) {
	
	function buildActivity() {
		if(activityType == "Running" ||
		activityType == "Cycling" ||
		activityType == "Rowing" ||) {
			// todo: create new aerobicactivity - create aerobic/anaerobic on front end
		} else {
			// todo: create new aerobicactivity - create aerobic/anaerobic on front end
		}
	}
	
	return {
	}
}
