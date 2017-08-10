var weekStart = "";
var weekEnd = "";

var activitiesInteractor;

var activitiesController = new Vue({
    el: '#my_view',
    data: {
        dateDay: 2,
        dateMonth: 4,
        dateYear: 1999,
        title: '',
        comments: '',
        distance: '',
		duration: '',
		sets: 0,
		reps: 0,
		weight: 0,
        currentWeek: '',
        daysData: '',
		selectedActivity: '',
		activities: [],
		activityTypes: []
    },
    methods: {
		showActivity(activityType) {
			
			var show = false;
			
			if(activityType === "Aerobic" && ( 
					this.selectedActivity === "Running" || 
					this.selectedActivity === "Cycling" ||
					this.selectedActivity === "Rowing")) {
				show = true;
			} else if( activityType === "Anaerobic" &&(
				this.selectedActivity == "Weights")) {
				show = true;
			}
			
			return show;
		},
        updateWeekUI: function(viewModel) {
            this.daysData = viewModel.daysData;
            this.currentWeek = viewModel.week;
        },
        updateActivitiesUI: function(viewModel) {
            this.activities = viewModel;
        },
		updateActivityTypes: function(viewModel) {
			this.activityTypes = viewModel;
		},
        removeActivity: function(date, title) {
            var requestModel = {
                ISOStringDate: date,
                title: title
            }

            activitiesInteractor.removeActivity(requestModel);
        },
        addActivity: function() {
			var requestModel = RequestBuilder().buildRequest(this.selectedActivity, this);
            activitiesInteractor.addActivity(requestModel);
        },
        previousWeek: function() {

            activitiesInteractor.previousWeek();

            var prevWeekFinalDay = weekStart.getDate() - 1;

            // SET CURRENT WEEK NEW END		
            var weekStartCpy = new Date(weekStart);
            weekEnd = new Date(weekStartCpy.setDate(prevWeekFinalDay));

            // SET CURRENT WEEK NEW START
            var weekEndCpy = new Date(weekEnd);
            weekStart = new Date(weekEndCpy.setDate(prevWeekFinalDay - 6));

            activitiesInteractor.changeToWeek(weekStart, weekEnd);
        },
        nextWeek: function() {

            var nextWeekFirstDay = weekEnd.getDate() + 1;
            // SET CURRENT WEEK NEW START
            var weekEndCpy = new Date(weekEnd);				
            weekStart = new Date(weekEndCpy.setDate(nextWeekFirstDay));

            // SET CURRENT WEEK NEW END
            var weekStartCpy = new Date(weekStart);
            weekEnd = new Date(weekStartCpy.setDate(nextWeekFirstDay + 6));

            activitiesInteractor.changeToWeek(weekStart, weekEnd);
        }
    },
    mounted: function() {
        var activityRepository = ActivityRepositoryAxios();
        var activitiesPresenter = ActivitiesPresenter();
        activitiesPresenter.init(this);
        activitiesInteractor = ActivitiesInteractor();
        activitiesInteractor.init(activityRepository, activitiesPresenter);

        var now = new Date();
        this.dateDay =  now.getDate();
        this.dateMonth =  now.getMonth() + 1;
        this.dateYear =  now.getFullYear();

        // SET WEEK START BASED ON NOW

        var day = now.getDay();
        var diff = now.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        weekStart = new Date(now.setDate(diff));

        // SET WEEK END

        var weekStartCpy = new Date(weekStart);
        var weekStartDayInMonth = weekStartCpy.getDate();
        weekEnd = new Date(weekStartCpy.setDate(weekStartDayInMonth + 6));

        // init ui

        activitiesInteractor.listActivities();
        activitiesInteractor.changeToWeek(weekStart, weekEnd);
		
		activitiesInteractor.listActivityTypes();
    }
})


function RequestBuilder(){
	function buildRequest(activityType, params) {
		
		var requestModel = {};
		
		var date = new Date(params.dateYear, params.dateMonth - 1, params.dateDayInMonth);
		
		// TODO: isaerobic
		if(activityType === "Running" || 
		    activityType === "Cycling" ||
		    activityType === "Rowing") {
			requestModel = {
				activityType: "Aerobic", // TODO get from enum, where?
				date: params.dateYear,
				title: params.title,
				comments: params.comments
			}
        } else {
			requestModel = {
				activityType: "Anaerobic", // TODO get from enum, where?
                date: params.dateYear,
                title: params.title,
                comments: params.comments,
				sets: params.sets,
				reps: params.reps
            }
		}
		
		 return requestModel;
	}
	
	return  {
		buildRequest: buildRequest
	}
}


