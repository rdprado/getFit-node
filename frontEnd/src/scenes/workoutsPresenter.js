var WorkoutsPresenter = function() {
    var daysOfWeek  = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    var workoutsPresenterOutput;

    function init(presenterOutput) {
        workoutsPresenterOutput = presenterOutput;
    }

    function presentWeek(responseModel) {
        var formattedWeek = formatWeekInterval(responseModel.weekBegin, responseModel.weekEnd);
        var wktsByDate = _.groupBy(responseModel.workouts, 'date');
        var daysData = formatDaysDataForCurrentWeek(wktsByDate);

        viewModel = {
            week: formattedWeek,
            daysData: daysData
        }

        workoutsPresenterOutput.updateWeekUI(viewModel);
    }

    function presentWorkouts(responseModel) {
        viewModel = responseModel;
        workoutsPresenterOutput.updateWorkoutsUI(viewModel);
    }

    function formatWeekInterval(beginDate, endDate) {
        return formatWeekDate(beginDate) + " - " + formatWeekDate(endDate);
    }

    function formatWeekDate(date) {
        var d = date;
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; //Months are zero based
        var curr_year = d.getFullYear();
        return curr_date + "/" + curr_month + "/" + curr_year;	
    }

     function formatDaysDataForCurrentWeek(workoutsByDate){
        var weekStartCpy = new Date(weekStart);

        var daysDataViewModel = [];

        for(i = 0; i < daysOfWeek.length; i++) {
            daysDataViewModel[i] = {weekDayName: daysOfWeek[i], activities: []};

            var currDate = new Date(weekStartCpy.setDate(weekStart.getDate() + i));
            var currDateFormatted = formatWeekDateToModel(currDate);

            var workouts = workoutsByDate[currDateFormatted];
            if(workouts) {
                for(wkt in workouts) {
                    daysDataViewModel[i].activities.push({title: workouts[wkt].title, duration:'1 hour'});
                }
            }
        }

        return daysDataViewModel;
    }

     function formatWeekDateToModel(date) {
        var d = date;
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; //Months are zero based
        var curr_year = d.getFullYear();
        return curr_month + "/" + curr_date + "/" + curr_year;	
    }
    return {
        init: init,
        presentWorkouts: presentWorkouts,
        presentWeek: presentWeek
    }
}
