var Workout = require('../entities/workout')

var WorkoutsUseCaseInteractor = function(workoutRepository) {
    this.workoutRepository = workoutRepository;
};

WorkoutsUseCaseInteractor.prototype.addWorkout = function(requestModel) {
    var workout = buildWorkoutFromRequest(requestModel);
    this.workoutRepository.addWorkout(workout);
}

WorkoutsUseCaseInteractor.prototype.getWorkouts = function(cb) {
    console.log("workouts use case get")
    var responseModel = this.workoutRepository.fetchWorkouts(cb);
    return responseModel; 
}

function buildWorkoutFromRequest(requestModel) {
    var workout = new Workout(requestModel.date, requestModel.title, requestModel.comments);
    return workout;
}

module.exports = WorkoutsUseCaseInteractor;
