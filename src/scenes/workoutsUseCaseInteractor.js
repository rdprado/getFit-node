var Workout = require('../entities/workout')
var UUID = require('uuid/v1');

var WorkoutsUseCaseInteractor = function() {
    var workoutRepository;
    var workoutsUseCaseInteractorOutput;

    function doInit(workoutsRepository, useCaseInteractorOutput){
        workoutRepository = workoutsRepository;
        workoutsUseCaseInteractorOutput = useCaseInteractorOutput;
    };

    function doAddWorkout(requestModel){
        var workout = buildWorkoutFromRequest(requestModel);
        workoutRepository.addWorkout(workout, ()=>{});
    };

    function doGetWorkouts(done){
        var cb = function(workouts) {
            var responseModel = {
                workouts: workouts
            }
            var viewModel = workoutsUseCaseInteractorOutput.presentGetWorkouts(responseModel);
            done(viewModel);
        };

        workoutRepository.fetchWorkouts(cb);
    };

    function doRemoveWorkout(requestModel){
        workoutRepository.removeWorkout(requestModel.ID, ()=>{})
    }

    function buildWorkoutFromRequest(requestModel){
        var workout = Workout();
        workout.init(UUID(), requestModel.date, requestModel.title, requestModel.comments);
        return workout;
    };

    var publicAPI = {
        init: doInit,
        addWorkout: doAddWorkout,
        getWorkouts: doGetWorkouts,
        removeWorkout: doRemoveWorkout
    };

    return publicAPI;
};

module.exports = WorkoutsUseCaseInteractor;
