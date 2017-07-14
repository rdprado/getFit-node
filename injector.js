var WorkoutRepositoryMongoDB = require('./src/services/workoutRepositoryMongoDB')

var WorkoutsUseCaseInteractor = require('./src/scenes/workoutsUseCaseInteractor')
var WorkoutsController = require('./src/scenes/workoutsController')

exports.inject = function(router, db) {
    var workoutRepository = WorkoutRepositoryMongoDB();
    workoutRepository.init(db);

    var workoutsUseCaseInteractor = WorkoutsUseCaseInteractor();
    workoutsUseCaseInteractor.init(workoutRepository);
    var workoutsController = new WorkoutsController(router, workoutsUseCaseInteractor);
}

