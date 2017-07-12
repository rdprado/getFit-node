var Workout = require('../entities/workout')

var AddWorkoutUseCase = function(workoutRepository) {
    this.workoutRepository = workoutRepository;
};

AddWorkoutUseCase.prototype.addWorkout = function(requestModel) {
    console.log("use case workout added");
    var workout = buildWorkoutFromRequest(requestModel);
    this.workoutRepository.addWorkout(workout);
}

function buildWorkoutFromRequest(requestModel) {
    var workout = new Workout(requestModel.date, requestModel.title, requestModel.comments);
    return workout;
}

module.exports = AddWorkoutUseCase;
