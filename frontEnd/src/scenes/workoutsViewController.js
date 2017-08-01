var weekStart = "";
var weekEnd = "";

var workoutsInteractor;

var workoutsController = new Vue({
    el: '#my_view',
    data: {
        dateDay: 2,
        dateMonth: 4,
        dateYear: 1999,
        title: '',
        comments: '',
        workouts: '',
        currentWeek: '',
        daysData: ''
    },
    methods: {
        updateWeekUI: function(viewModel) {
            this.daysData = viewModel.daysData;
            this.currentWeek = viewModel.week;
        },
        updateWorkoutsUI: function(viewModel) {
            this.workouts = viewModel;
        },
        removeWorkout: function(date, title) {
            var requestModel = {
                ISOStringDate: date,
                title: title
            }

            workoutsInteractor.removeWorkout(requestModel);
        },

        addWorkout: function() {
            var requestModel = {
                dateYear: this.dateYear,
				dateMonth: this.dateMonth,
				dateDayInMonth: this.dateDay,
                title: this.title,
                comments: this.comments
            }

            workoutsInteractor.addWorkout(requestModel);
        },
        previousWeek: function() {

            workoutsInteractor.previousWeek();

            var prevWeekFinalDay = weekStart.getDate() - 1;

            // SET CURRENT WEEK NEW END		
            var weekStartCpy = new Date(weekStart);
            weekEnd = new Date(weekStartCpy.setDate(prevWeekFinalDay));

            // SET CURRENT WEEK NEW START
            var weekEndCpy = new Date(weekEnd);
            weekStart = new Date(weekEndCpy.setDate(prevWeekFinalDay - 6));

            workoutInteractor.changeToWeek(weekStart, weekEnd);
        },
        nextWeek: function() {

            var nextWeekFirstDay = weekEnd.getDate() + 1;
            // SET CURRENT WEEK NEW START
            var weekEndCpy = new Date(weekEnd);				
            weekStart = new Date(weekEndCpy.setDate(nextWeekFirstDay));

            // SET CURRENT WEEK NEW END
            var weekStartCpy = new Date(weekStart);
            weekEnd = new Date(weekStartCpy.setDate(nextWeekFirstDay + 6));

            workoutsInteractor.changeToWeek(weekStart, weekEnd);
        }
    },
    mounted: function() {
        var workoutRepository = WorkoutRepositoryAxios();
        var workoutsPresenter = WorkoutsPresenter();
        workoutsPresenter.init(this);
        workoutsInteractor = WorkoutsInteractor();
        workoutsInteractor.init(workoutRepository, workoutsPresenter);

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

        workoutsInteractor.listWorkouts();
        workoutsInteractor.changeToWeek(weekStart, weekEnd);
    }
})


