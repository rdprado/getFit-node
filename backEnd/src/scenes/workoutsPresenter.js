

var WorkoutsPresenter = function WorkoutPresenter() {

    function init() {
    }

    function formatGetWorkouts(responseModel) {
        return JSON.stringify(responseModel.workouts);
    }
	
	function formatWorkoutTypes(responseModel) {
		return JSON.stringify(responseModel.workoutTypes);
	}
	
    return {
		formatWorkoutTypes: formatWorkoutTypes,
        formatGetWorkouts: formatGetWorkouts
    }
}

module.exports = WorkoutsPresenter;
