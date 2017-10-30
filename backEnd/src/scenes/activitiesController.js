var ActivitiesController = function ActivitiesController(){

    var router, activitiesUseCaseInteractor;

    function init(Router, ActivitiesUseCaseInteractor) {
        router = Router;
        activitiesUseCaseInteractor = ActivitiesUseCaseInteractor;

        configureRouts();
    }

    function configureRouts()
    {
        // function sendActivities(res) {
        //     // var done = function(jsonModel){  
        //     //     res.send(jsonModel);
        //     // }
        //     activitiesUseCaseInteractor.getActivities(done);
        // }

        // router.get('/activityNames', function(req, res, next) {

        //     var done = function(jsonModel) {
        //         res.send(jsonModel);
        //     }
        //     activitiesUseCaseInteractor.getActivityNames(done);
        // });

        router.get('/activities', function(req, res, next) {
            return new Promise(function(resolve,reject) {
                activitiesUseCaseInteractor.getActivities().then(function(response){
                    res.send(response);
                    resolve();
                }).catch(function(err){
                    res.status(500).send(err);
                    reject(err);
                })
            });
        });

        router.post('/activities/add', function(req, res, next) {
            return new Promise(function(resolve, reject) {
                activitiesUseCaseInteractor.addActivity(req.body).then(function(){
                    res.status(200).send("Activity added");
                    resolve();
                }).catch(function(err){
                    res.status(500).send(err);
                    reject(err);
                })
            });
        });

        router.post('/activities/update', function(req, res, next) {
            return new Promise(function(resolve, reject) {
                activitiesUseCaseInteractor.updateActivity(req.body).then(function(){
                    res.status(200).send("Activity updated");
                    resolve();
                }).catch(function(err){
                    res.status(500).send(err);
                    reject(err);
                })
            });
        });

        router.post('/activities/remove', function(req, res, next){
            return new Promise(function(resolve, reject) {
                activitiesUseCaseInteractor.removeActivity(req.body).then(function(){
                    res.status(200).send("Activity removed");
                    resolve();
                }).catch(function(err){
                    res.status(500).send(err);
                    reject(err);
                })
            });
        });
    }

    return {
        init: init,
        configureRouts: configureRouts
    };
}

module.exports = ActivitiesController;
