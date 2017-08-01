

var WorkoutsPresenter = function WorkoutPresenter() {

    function init() {
    }

    function formatGetWorkouts(responseModel) {
        return {workouts: JSON.stringify(responseModel.workouts)};
    }

    return {
        formatGetWorkouts: formatGetWorkouts
    }
}

module.exports = WorkoutsPresenter;
