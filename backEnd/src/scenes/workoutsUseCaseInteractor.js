var Workout = require('../entities/workout')
var UUID = require('uuid/v1');

var WorkoutsUseCaseInteractor = function() {
    var workoutRepository;
    var workoutsUseCaseInteractorOutput;

    function init(workoutsRepository, useCaseInteractorOutput){
        workoutRepository = workoutsRepository;
        workoutsUseCaseInteractorOutput = useCaseInteractorOutput;
    };

    function addWorkout(requestModel, done){
        var workout = buildWorkoutFromRequest(requestModel);
        workoutRepository.addWorkout(workout, done);
    };

    function getWorkouts(done){
        var cb = function(workouts) {

            var responseModel = {workouts: workouts.map(toResponseModel)}
            done(workoutsUseCaseInteractorOutput.formatGetWorkouts(responseModel));
        };

        workoutRepository.fetchWorkouts(cb);
    };

    function toResponseModel(workout) {
        return workout.toObjLiteral();
    }

    function removeWorkout(requestModel, done){
        workoutRepository.removeWorkout(requestModel.ID, done)
    }

    function buildWorkoutFromRequest(requestModel){
        var workout = Workout();
        workout.init(UUID(), new Date(requestModel.ISOStringDate), requestModel.title, requestModel.comments);
        return workout;
    };

    return {
        init: init,
        addWorkout: addWorkout,
        getWorkouts: getWorkouts,
        removeWorkout: removeWorkout
    };
};

module.exports = WorkoutsUseCaseInteractor;
