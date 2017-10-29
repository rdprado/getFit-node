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
                activitiesUseCaseInteractor.getActivities().then(function(result){
                    res.send(result);
                    resolve();
                }).catch(function(err){
                    //res.status(500).send(err);
                })
            });
            //sendActivities(res);
        });

        // router.post('/activities/add', function(req, res, next) {

        //     activitiesUseCaseInteractor.addActivity(req.body, ()=>{
        //         sendActivities(res);
        //     });
        // });

        // router.post('/activities/remove', function(req, res, next){
        //     var requestModel = {
        //         ISOStringDate: req.body.ISOStringDate,
        //         title: req.body.title
        //     }

        //     activitiesUseCaseInteractor.removeActivity(requestModel, ()=> {
        //         sendActivities(res);
        //     });

        // });
    }

    return {
        init: init,
        configureRouts: configureRouts
    };
}

module.exports = ActivitiesController;
