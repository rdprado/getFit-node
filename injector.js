var WorkoutRepositoryMongoDB = require('./src/services/workoutRepositoryMongoDB')

var WorkoutsUseCaseInteractor = require('./src/scenes/workoutsUseCaseInteractor')
var WorkoutsController = require('./src/scenes/workoutsController')
var WorkoutsPresenter = require('./src/scenes/workoutsPresenter')

exports.inject = function(router, db) {
    var workoutRepository = WorkoutRepositoryMongoDB();
    workoutRepository.init(db);

    var workoutsPresenter = WorkoutsPresenter();

    var workoutsUseCaseInteractor = WorkoutsUseCaseInteractor();
    workoutsUseCaseInteractor.init(workoutRepository, workoutsPresenter);

    var workoutsController = WorkoutsController();
    workoutsController.init(router, workoutsUseCaseInteractor)
}

