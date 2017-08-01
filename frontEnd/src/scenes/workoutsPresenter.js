var WorkoutsPresenter = function() {
    var daysOfWeek  = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    var workoutsPresenterOutput;

    function init(presenterOutput) {
        workoutsPresenterOutput = presenterOutput;
    }

    function presentWeek(responseModel) {
        var formattedWeek = formatWeekInterval(responseModel.weekBegin, responseModel.weekEnd);

        var wksWithSimplifiedDate = responseModel.workouts.map((wkt)=>{
            return {date:dateToMMDDYYYY(wkt.date), title: wkt.title, comments: wkt.comments}
        });

        var wktsBySimplifiedDate = _.groupBy(wksWithSimplifiedDate, 'date');
        var daysData = formatDaysDataForCurrentWeek(wktsBySimplifiedDate);

        var viewModel = {
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
            var workouts = workoutsByDate[dateToMMDDYYYY(currDate)];
            if(workouts) {
                for(wkt in workouts) {
                    daysDataViewModel[i].activities.push({title: workouts[wkt].title, duration:'1 hour'});
                }
            }
        }

        return daysDataViewModel;
    }

     function dateToMMDDYYYY(date) {
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
