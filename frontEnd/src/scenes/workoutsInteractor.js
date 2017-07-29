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
                workouts: workouts 
            }
            interactorOutput.presentWeek(responseModel)
        });
    }

    function addWorkout(requestModel) {
        console.log('add');

        var workout = buildWorkoutFromRequest(requestModel);

        workoutRepository.addWorkout(workout, (workouts)=> {
            var responseModel = workouts;
            interactorOutput.presentWorkouts(responseModel)
        });
    }

    function removeWorkout(requestModel) {
        console.log('remove');

        workoutRepository.removeWorkout(requestModel.ID, (workouts)=>{
            var responseModel = workouts;// workouts is already an array of json
            interactorOutput.presentWorkouts(responseModel)
        });
    }

    function listWorkouts() {
        console.log('get');

        workoutRepository.getWorkouts((workouts)=>{
            var responseModel = workouts;
            interactorOutput.presentWorkouts(responseModel)
        });
    }

    function buildWorkoutFromRequest(requestModel){
        var workout = Workout();
        workout.init(requestModel.date, requestModel.title, requestModel.comments);
        return workout;
    };

    return {
        init: init,
        listWorkouts: listWorkouts,
        addWorkout: addWorkout,
        removeWorkout: removeWorkout,
        changeToWeek: changeToWeek
    }
}
