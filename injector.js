var WorkoutRepository = require('./src/services/workoutRepository')

var WorkoutUseCaseInteractor = require('./src/scenes/workoutUseCaseInteractor')
var WorkoutController = require('./src/scenes/workoutController')

exports.inject = function(router) {
    var workoutRepository = new WorkoutRepository(null)
    var workoutUseCaseInteractor = new WorkoutUseCaseInteractor(workoutRepository);
    var workoutController = new WorkoutController(router, workoutUseCaseInteractor);
}

