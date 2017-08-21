var ActivitiesInteractor = function() {

    var activityRepository;
    var interactorOutput;

    function init(activityRep, activitiesInteractorOutput) {
        activityRepository = activityRep;
        interactorOutput = activitiesInteractorOutput;
    }

    function changeToWeek(weekBegin, weekEnd){

        // activityRepository.getActivities((activities)=>{
        //
        //     var responseModel = {
        //         weekBegin: weekBegin,
        //         weekEnd: weekEnd,
        //         activities: activities.map(activityToRes) 
        //     }
        //
        //     interactorOutput.presentWeek(responseModel);
        // });
    }

    function listActivityNames() {
        console.log("list activity names")
        var activityNames = activityRepository.getActivityNames((activityNames)=>{
            interactorOutput.presentActivityNames(activityNames);
        });
    }

    function addActivity(requestModel) {
        console.log('add');

        var activity = ActivityFactory().createActivity(activityRepository.activityTypeForName(requestModel.name), requestModel);

        activityRepository.addActivity(activity, (activities)=> {
            interactorOutput.presentActivities(activities.map(activityToObjectLiteral))
        });
    };

    function removeActivity(requestModel) {
        console.log('remove');

        var date = new Date(requestModel.ISOStringDate)

        activityRepository.removeActivity(date, requestModel.title, (activities)=>{
            interactorOutput.presentActivities(activities.map(activityToObjectLiteral))
        });
    };

    function listActivities() {
        activityRepository.getActivities((activities)=> {
            interactorOutput.presentActivities(activities.map(activityToObjectLiteral))
        });
    };

    function activityToObjectLiteral(activity) {
        return activity.toObjLiteral()
    }

    return {
        init: init,
        listActivityNames: listActivityNames,
        listActivities: listActivities,
        addActivity: addActivity,
        removeActivity: removeActivity,
        changeToWeek: changeToWeek
    }
}

