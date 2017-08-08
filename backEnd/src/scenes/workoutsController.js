var WorkoutsController = function WorkoutsController(){

    var routeMaker, workoutsuseCaseInteractor;

    function init(router, useCaseInteractor) {
        routeMaker = router;
        workoutsUseCaseInteractor = useCaseInteractor;

        makeRouts(router, workoutsUseCaseInteractor);
    }

    function makeRouts(router, workoutsUseCaseInteractor)
    {
        function sendWorkouts(res) {
            var done = function(jsonModel){  
                res.send(jsonModel.workouts);
            }
            workoutsUseCaseInteractor.getWorkouts(done);
        }

        router.get('/vuetest', function(req, res, next) {
            res.json({car: "HAHAHAHA", name: "this is Working, just need to create an http server to run vue htmls and install Allow-Control-Allow-Origin extension on chrome to allow cross origin requests"});
            console.log(res.json);
        });

		router.get('/workoutTypes', function(req, res, next) {
            var jsonModel = workoutsUseCaseInteractor.getWorkoutTypes();
			res.send(jsonModel);
        });
		
        router.get('/workouts', function(req, res, next) {
            sendWorkouts(res);
        });

        router.post('/workouts/add', function(req, res, next) {
		
            var requestModel = {
                ISOStringDate: req.body.ISOStringDate,
                title: req.body.title,
                comments: req.body.comments
            }
			
            workoutsUseCaseInteractor.addWorkout(requestModel, ()=>{
                sendWorkouts(res);
            });
        });

        router.post('/workouts/remove', function(req, res, next){
            var requestModel = {
                ISOStringDate: req.body.ISOStringDate,
				title: req.body.title
            }
			
            workoutsUseCaseInteractor.removeWorkout(requestModel, ()=> {
                sendWorkouts(res);
            });

        });
    }

    return {
        init: init
    };
}

module.exports = WorkoutsController;
