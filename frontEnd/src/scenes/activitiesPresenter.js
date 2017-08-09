var ActivitiesPresenter = function() {
    var daysOfWeek  = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    var activitiesPresenterOutput;

    function init(presenterOutput) {
        activitiesPresenterOutput = presenterOutput;
    }

    function presentWeek(responseModel) {
        var formattedWeek = formatWeekInterval(responseModel.weekBegin, responseModel.weekEnd);

        var activitiesWithSimplifiedDate = responseModel.activities.map((activity)=>{
            return {date:dateToMMDDYYYY(new Date(activity.ISOStringDate)), title: activity.title, comments: activity.comments}
        });

        var activitiesBySimplifiedDate = _.groupBy(activitiesWithSimplifiedDate, 'date');
        var daysData = formatDaysDataForCurrentWeek(activitiesBySimplifiedDate);

        var viewModel = {
            week: formattedWeek,
            daysData: daysData
        }

        activitiesPresenterOutput.updateWeekUI(viewModel);
    }
	
	function presentActivityTypes(responseModel) {
		viewModel = responseModel;
		activitiesPresenterOutput.updateActivityTypes(viewModel);
	}

    function presentActivities(responseModel) {
        viewModel = responseModel;
        activitiesPresenterOutput.updateActivitiesUI(viewModel);
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

     function formatDaysDataForCurrentWeek(activitiesByDate){
        var weekStartCpy = new Date(weekStart);

        var daysDataViewModel = [];

        for(i = 0; i < daysOfWeek.length; i++) {
            daysDataViewModel[i] = {weekDayName: daysOfWeek[i], activities: []};

            var currDate = new Date(weekStartCpy.setDate(weekStart.getDate() + i));
            var activities = activitiesByDate[dateToMMDDYYYY(currDate)];
            if(activities) {
                for(activity in activities) {
                    daysDataViewModel[i].activities.push({title: activities[activity].title, duration:'1 hour'});
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
		presentActivityTypes: presentActivityTypes,
        presentActivities: presentActivities,
        presentWeek: presentWeek
    }
}
