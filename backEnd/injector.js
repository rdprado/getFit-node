var MongoCommon = require('./src/services/mongoCommon');

var ActivityRepositoryMongoDB = require('./src/services/activityRepositoryMongoDB')
var DBStarter = require('./DBStarter')

var ActivitiesUseCaseInteractor = require('./src/scenes/activitiesUseCaseInteractor')
var ActivitiesController = require('./src/scenes/activitiesController')
var ActivitiesPresenter = require('./src/scenes/activitiesPresenter')

exports.inject = function(router, done) {

    DBStarter.start((db)=>{    
        var activityRepository = ActivityRepositoryMongoDB();
        var mongoCommon = MongoCommon();
        activityRepository.init(db, mongoCommon);

        var activitiesPresenter = ActivitiesPresenter();

        var activitiesUseCaseInteractor = ActivitiesUseCaseInteractor();
        activitiesUseCaseInteractor.init(activityRepository, activitiesPresenter);

        var activitiesController = ActivitiesController();
        activitiesController.init(router, activitiesUseCaseInteractor)
        
        console.log("Injected dependencies...")

        done();
    });

}

