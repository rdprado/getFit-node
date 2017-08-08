var WorkoutsInteractor = function() {

    var workoutRepository;
    var interactorOutput;

    function init(workoutRep, workoutsInteractorOutput) {
        workoutRepository = workoutRep;
        interactorOutput = workoutsInteractorOutput;
    }

    function changeToWeek(weekBegin, weekEnd){

        workoutRepository.getWorkouts((workouts)=>{

            var responseModel = {
                weekBegin: weekBegin,
                weekEnd: weekEnd,
                workouts: workouts.map(wktToRes) 
            }

            interactorOutput.presentWeek(responseModel);
        });
    }

	function listWorkoutTypes() {
		console.log("list types")
		var workoutTypes = workoutRepository.getWorkoutTypes((workoutTypes)=>{
			interactorOutput.presentWorkoutTypes(workoutTypes);
		});
	}
	
    function addWorkout(requestModel) {
        console.log('add');

        workoutRepository.addWorkout(reqToWkt(requestModel), (workouts)=> {
            interactorOutput.presentWorkouts(workouts.map(wktToRes))
        });
    };


    function removeWorkout(requestModel) {
        console.log('remove');

		var date = new Date(requestModel.ISOStringDate)
		
        workoutRepository.removeWorkout(date, requestModel.title, (workouts)=>{
            interactorOutput.presentWorkouts(workouts.map(wktToRes))
        });
    };

    function listWorkouts() {
        console.log('get');
        workoutRepository.getWorkouts((workouts)=> {
            interactorOutput.presentWorkouts(workouts.map(wktToRes))
        });
    };

    // model transformation

    function reqToWkt(req){
        var workout = Workout();
        var date = new Date(req.dateYear, req.dateMonth - 1, req.dateDayInMonth)
        workout.init(date, req.title, req.comments);
        return workout;
    };

    function wktToRes(workout) {
        return workout.toObjLiteral();
    }


    return {
        init: init,
		listWorkoutTypes: listWorkoutTypes,
        listWorkouts: listWorkouts,
        addWorkout: addWorkout,
        removeWorkout: removeWorkout,
        changeToWeek: changeToWeek
    }
}
