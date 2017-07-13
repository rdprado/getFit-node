var WorkoutRepository = require('./src/services/workoutRepository')

var WorkoutsUseCaseInteractor = require('./src/scenes/workoutsUseCaseInteractor')
var WorkoutsController = require('./src/scenes/workoutsController')

exports.inject = function(router) {
    var workoutRepository = new WorkoutRepository(null)

    var workoutsUseCaseInteractor = new WorkoutsUseCaseInteractor(workoutRepository);
    var workoutsController = new WorkoutsController(router, workoutsUseCaseInteractor);
}

