var WorkoutsInteractor = function() {

    var workoutRepository;
    var interactorOutput;

    function init(workoutRep, workoutsInteractorOutput) {
        workoutRepository = workoutRep;
        interactorOutput = workoutsInteractorOutput;
    }

    function changeToWeek(weekBegin, weekEnd){

        workoutRepository.getWorkouts((workouts)=>{
			
			var responseModelWorkouts = workoutsToResponse(workouts);
			
            var responseModel = {
                weekBegin: weekBegin,
                weekEnd: weekEnd,
                workouts: responseModelWorkouts 
            }
            interactorOutput.presentWeek(responseModel);
        });
    }

    function addWorkout(requestModel) {
        console.log('add');

        var workout = requestToWorkout(requestModel);

        workoutRepository.addWorkout(workout, (workouts)=> {
            var responseModelWorkouts = workoutsToResponse(workouts);
            interactorOutput.presentWorkouts(responseModelWorkouts)
        });
    };
	
	function requestToWorkout(requestModel){
        var workout = Workout();
		var date = new Date(requestModel.dateYear, requestModel.dateMonth - 1, requestModel.dateDayInMonth)
        workout.init(date, requestModel.title, requestModel.comments);
        return workout;
    };

    function removeWorkout(requestModel) {
        console.log('remove');

        workoutRepository.removeWorkout(requestModel.ID, (workouts)=>{
            var responseModelWorkouts = workoutsToResponse(workouts);
            interactorOutput.presentWorkouts(responseModelWorkouts)
        });
    };

    function listWorkouts() {
        console.log('get');
		workoutRepository.getWorkouts((workouts)=>{
			var responseModelWorkouts = workoutsToResponse(workouts);
            interactorOutput.presentWorkouts(responseModelWorkouts)
        });
    };
	
	function workoutsToResponse(workoutEntities) {
		var wkts = [];
		for(wkt in workoutEntities) {
			wkts.push({date:workoutEntities[wkt].getDate(), title: workoutEntities[wkt].getTitle(), comments: workoutEntities[wkt].getComments()});
		}
		return wkts;
	};

    

    return {
        init: init,
        listWorkouts: listWorkouts,
        addWorkout: addWorkout,
        removeWorkout: removeWorkout,
        changeToWeek: changeToWeek
    }
}
