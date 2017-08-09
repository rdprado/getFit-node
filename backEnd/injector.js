var ActivityRepositoryMongoDB = require('./src/services/activityRepositoryMongoDB')

var ActivitiesUseCaseInteractor = require('./src/scenes/activitiesUseCaseInteractor')
var ActivitiesController = require('./src/scenes/activitiesController')
var ActivitiesPresenter = require('./src/scenes/activitiesPresenter')

exports.inject = function(router, db) {
    var activityRepository = ActivityRepositoryMongoDB();
    activityRepository.init(db);

    var activitiesPresenter = ActivitiesPresenter();

    var activitiesUseCaseInteractor = ActivitiesUseCaseInteractor();
    activitiesUseCaseInteractor.init(activityRepository, activitiesPresenter);

    var activitiesController = ActivitiesController();
    activitiesController.init(router, activitiesUseCaseInteractor)
}

