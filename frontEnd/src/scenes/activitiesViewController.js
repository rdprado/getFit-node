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
        distance: 0,
        duration: 0,
        sets: 0,
        reps: 0,
        weight: 0,
        currentWeek: '',
        daysData: '',
        selectedActivityName: 'Running',
        activities: [],
        activityNames: [],
        isAerobicSelected: true,

    },
    methods: {
        selectActivity: function() {

        },
        updateWeekUI: function(viewModel) {
            this.daysData = viewModel.daysData;
            this.currentWeek = viewModel.week;
        },
        updateActivitiesUI: function(viewModel) {
            this.activities = viewModel;
        },
        updateActivityNames: function(viewModel) {
            this.activityNames = viewModel;
        },
        removeActivity: function(date, title) {
            var requestModel = {
                ISOStringDate: date,
                title: title
            }

            activitiesInteractor.removeActivity(requestModel);
        },
        addActivity: function() {
            var requestModel = RequestBuilder().buildRequest(this.selectedActivityName, this);
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
        activityRepository.init();
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

        activitiesInteractor.listActivityNames();
    }
})


function RequestBuilder(){
    function buildRequest(activityType, params) {

        var requestModel = {};

        var date = new Date(params.dateYear, params.dateMonth - 1, params.dateDay);

        requestModel = {
            date: date,
            name: params.selectedActivityName,
            title: params.title,
            comments: params.comments,
            duration: params.duration,
            sets: params.sets,
            reps: params.reps,
            weight: params.weight
        }

           return requestModel;
    }

    return  {
        buildRequest: buildRequest
    }
}


