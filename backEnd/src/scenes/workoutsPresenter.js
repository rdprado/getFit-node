var WorkoutsPresenter = function WorkoutPresenter() {

    function init() {

    }

    function presentGetWorkouts(getWorkoutsResponse) {
        var viewModel = {
            workouts: []
        }

        for(i = 0; i < getWorkoutsResponse.workouts.length; i++) {

            var ISOStringDate = getWorkoutsResponse.workouts[i].date.toISOString();
					
			console.log("type of date: " + typeof(date));
			console.log("fetch 1, date: " + date);

            //var formattedDate = date.getUTCMonth() + 1 + "/" + date.getUTCDate() + "/" + date.getUTCFullYear();
			
			//console.log("fetch, formatteddate: " + formattedDate);
			
            viewModel.workouts[i] = {ID: getWorkoutsResponse.workouts[i].ID, ISOStringDate: ISOStringDate, title: getWorkoutsResponse.workouts[i].title, comments: getWorkoutsResponse.workouts[i].comments};
        }

        return viewModel;
    }

    return {
        presentGetWorkouts: presentGetWorkouts
    }
}

module.exports = WorkoutsPresenter;
