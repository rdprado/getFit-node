

var WorkoutsPresenter = function WorkoutPresenter() {

    function init() {
    }

    function formatGetWorkouts(responseModel) {
        return {workouts: JSON.stringify(responseModel.workouts)};
    }
	
	function formatWorkoutTypes(responseModel) {
		return {workoutTypes: JSON.stringify(responseModel.workoutTypes)}
	}
	
    return {
		formatWorkoutTypes: formatWorkoutTypes,
        formatGetWorkouts: formatGetWorkouts
    }
}

module.exports = WorkoutsPresenter;
