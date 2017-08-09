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
        activities: [],
        currentWeek: '',
        daysData: '',
		comments: '',
		selectedActivity: '',
		activityTypes: [],
		distance: '',
		duration: '',
		
    },
    methods: {
		showActivity(activityName) {
			return this.selectedActivity === activityName;
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
            var requestModel = {
                dateYear: this.dateYear,
				dateMonth: this.dateMonth,
				dateDayInMonth: this.dateDay,
                title: this.title,
                comments: this.comments
            }

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


