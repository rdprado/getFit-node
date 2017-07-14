var WorkoutRepository = require('./src/services/workoutRepository')

var WorkoutsUseCaseInteractor = require('./src/scenes/workoutsUseCaseInteractor')
var WorkoutsController = require('./src/scenes/workoutsController')

exports.inject = function(router, db) {
    var workoutRepository = new WorkoutRepository(db)

    var workoutsUseCaseInteractor = new WorkoutsUseCaseInteractor(workoutRepository);
    var workoutsController = new WorkoutsController(router, workoutsUseCaseInteractor);
}

