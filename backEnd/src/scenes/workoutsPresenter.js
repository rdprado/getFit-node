var WorkoutsPresenter = function WorkoutPresenter() {

    function init() {

    }

    function presentGetWorkouts(getWorkoutsResponse) {
        var viewModel = {
            workouts: []
        }

        for(i = 0; i < getWorkoutsResponse.workouts.length; i++) {
            // TODO: check why mongo is not returning the date back, but is a string
            var date = new Date(getWorkoutsResponse.workouts[i].date);

            var formattedDate = date.getUTCMonth() + 1 + "/" + date.getUTCDate() + "/" + date.getUTCFullYear();
            viewModel.workouts[i] = {ID: getWorkoutsResponse.workouts[i].ID, date: formattedDate, title: getWorkoutsResponse.workouts[i].title, comments: getWorkoutsResponse.workouts[i].comments};
        }

        return viewModel;
    }

    return {
        presentGetWorkouts: presentGetWorkouts
    }
}

module.exports = WorkoutsPresenter;
