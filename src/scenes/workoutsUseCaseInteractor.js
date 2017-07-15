var Workout = require('../entities/workout')

var WorkoutsUseCaseInteractor = function() {
    var workoutRepository;
    var workoutsUseCaseInteractorOutput;

    function doInit(workoutsRepository, useCaseInteractorOutput){
        workoutRepository = workoutsRepository;
        workoutsUseCaseInteractorOutput = useCaseInteractorOutput;
    };

    function doAddWorkout(requestModel){
        console.log("use case workout added");
        var workout = buildWorkoutFromRequest(requestModel);
        workoutRepository.addWorkout(workout, ()=>{});
    };

    function doGetWorkouts(done){
        console.log("workouts use case get")

        var cb = function(workouts) {
            var responseModel = {
                workouts: workouts
            }
            var viewModel = workoutsUseCaseInteractorOutput.presentGetWorkouts(responseModel);
            done(viewModel);
        };

        var workouts = workoutRepository.fetchWorkouts(cb);
    };

    function buildWorkoutFromRequest(requestModel){
        var workout = Workout();
        workout.init(requestModel.date, requestModel.title, requestModel.comments);
        return workout;
    };

    var publicAPI = {
        init: doInit,
        addWorkout: doAddWorkout,
        getWorkouts: doGetWorkouts
    };

    return publicAPI;
};

module.exports = WorkoutsUseCaseInteractor;
