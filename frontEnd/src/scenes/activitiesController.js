var workouts = [];

var weekStart = "";
var weekEnd = "";


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
        removeWorkout: function() {
            var requestModel = {
                ID: "",
            }

            workoutsInteractor.removeWorkout(requestModel);
        },

        addWorkout: function() {
            var date = new Date(this.dateYear, this.dateMonth - 1, this.dateDay).toUTCString();

            var requestModel = {
                date: date,
                title: this.title,
                comments: this.comments
            }

            workoutsInteractor.addWorkout(requestModel);
        },
        backOneWeek: function() {

            workoutsInteractor.previousWeek();

            var prevWeekFinalDay = weekStart.getDate() - 1;

            // SET CURRENT WEEK NEW END		
            var weekStartCpy = new Date(weekStart);
            weekEnd = new Date(weekStartCpy.setDate(prevWeekFinalDay));

            // SET CURRENT WEEK NEW START
            var weekEndCpy = new Date(weekEnd);
            weekStart = new Date(weekEndCpy.setDate(prevWeekFinalDay - 6));

            workoutInteractor.changeWeekAndListWeekExercises(weekStart, weekEnd);
        },
        advanceOneWeek: function() {

            var nextWeekFirstDay = weekEnd.getDate() + 1;
            var weekEndCpy = new Date(weekEnd);
            weekStart = new Date(weekEndCpy.setDate(nextWeekFirstDay));

            var weekStartCpy = new Date(weekStart);
            weekEnd = new Date(weekStartCpy.setDate(nextWeekFirstDay + 6));

            workoutsInteractor.(weekStart, weekEnd);
        }
    },
    mounted: function() {
        var workoutRepository = WorkoutRepositoryAxios();
        var workoutsPresenter = WorkoutsPresenter();
        workoutsPresenter.init(this);
        var workoutsInteractor = WorkoutsInteractor();
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
        workoutsInteractor.listWeekWorkouts(weekStart, weekEnd);
    }
})


