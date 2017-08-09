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

        router.get('/vuetest', function(req, res, next) {
            res.json({car: "HAHAHAHA", name: "this is Working, just need to create an http server to run vue htmls and install Allow-Control-Allow-Origin extension on chrome to allow cross origin requests"});
            console.log(res.json);
        });

		router.get('/activityTypes', function(req, res, next) {
			
			var done = function(jsonModel) {
				res.send(jsonModel);
			}
            activitiesUseCaseInteractor.getActivityTypes(done);
        });
		
        router.get('/activities', function(req, res, next) {
            sendActivities(res);
        });

        router.post('/activities/add', function(req, res, next) {
		
            var requestModel = {
                ISOStringDate: req.body.ISOStringDate,
                title: req.body.title,
                comments: req.body.comments
            }
			
            activitiesUseCaseInteractor.addActivity(requestModel, ()=>{
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
