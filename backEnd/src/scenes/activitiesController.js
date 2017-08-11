var ActivitiesController = function ActivitiesController(){

    var routeMaker, activitiesUseCaseInteractor;

    function init(router, useCaseInteractor) {
        routeMaker = router;
        activitiesUseCaseInteractor = useCaseInteractor;

        makeRouts(router, activitiesUseCaseInteractor);
    }

    function makeRouts(router, activitiesUseCaseInteractor)
    {
        function sendActivities(res) {
            var done = function(jsonModel){  
                res.send(jsonModel);
            }
            activitiesUseCaseInteractor.getActivities(done);
        }

        router.get('/activityNames', function(req, res, next) {

            var done = function(jsonModel) {
                res.send(jsonModel);
            }
            activitiesUseCaseInteractor.getActivityNames(done);
        });

        router.get('/activities', function(req, res, next) {
            sendActivities(res);
        });

        router.post('/activities/add', function(req, res, next) {

            activitiesUseCaseInteractor.addActivity(req.body, ()=>{
                sendActivities(res);
            });
        });

        router.post('/activities/remove', function(req, res, next){
            var requestModel = {
                ISOStringDate: req.body.ISOStringDate,
                title: req.body.title
            }

            activitiesUseCaseInteractor.removeActivity(requestModel, ()=> {
                sendActivities(res);
            });

        });
    }

    return {
        init: init
    };
}

module.exports = ActivitiesController;
