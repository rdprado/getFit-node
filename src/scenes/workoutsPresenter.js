var WorkoutsPresenter = function WorkoutPresenter() {

    function doInit() {

    }

    function doPresentGetWorkouts(getWorkoutsResponse) {
        var viewModel = {
            workouts: []
        }

        for(i = 0; i < getWorkoutsResponse.workouts.length; i++) {
            // TODO: check why mongo is not returning the date back, but is a string
            var date = new Date(getWorkoutsResponse.workouts[i].date);
            console.log(typeof date)
            console.log(date);

            console.log(viewModel.workouts);

            var formattedDate = date.getUTCMonth() + 1 + "/" + date.getUTCDate() + "/" + date.getFullYear();
            viewModel.workouts[i] = {date: formattedDate, title: getWorkoutsResponse.workouts[i].title, comments: getWorkoutsResponse.workouts[i].comments};
        }

        return viewModel;
    }

    var publicAPI = {
        presentGetWorkouts: doPresentGetWorkouts
    }

    return publicAPI;
}

module.exports = WorkoutsPresenter;
