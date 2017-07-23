var WorkoutsController = function WorkoutsController(){

    var routeMaker, workoutsuseCaseInteractor;

    function doInit(router, useCaseInteractor) {
        routeMaker = router;
        workoutsUseCaseInteractor = useCaseInteractor;

        makeRouts(router, workoutsUseCaseInteractor);
    }

    function makeRouts(router, workoutsUseCaseInteractor)
    {
        function sendWorkouts(res) {
            var done = function(viewModel){  
                res.json(viewModel.workouts);
            }
            workoutsUseCaseInteractor.getWorkouts(done);
        }

        router.get('/vuetest', function(req, res, next) {
            res.json({car: "HAHAHAHA", name: "this is Working, just need to create an http server to run vue htmls and install Allow-Control-Allow-Origin extension on chrome to allow cross origin requests"});
            console.log(res.json);
        });

        router.get('/workouts', function(req, res, next) {
            sendWorkouts(res);
        });

        router.post('/workouts/add', function(req, res, next) {

            var date = new Date(Date.UTC(req.body.dateYear, req.body.dateMonth, req.body.dateDay));

            var requestModel = {
                date: date,
                title: req.body.title,
                comments: req.body.comments
            }

            workoutsUseCaseInteractor.addWorkout(requestModel);

            sendWorkouts(res);
        });

        router.post('/workouts/remove', function(req, res, next){
            var requestModel = {
                ID: req.body.ID,
            }
            workoutsUseCaseInteractor.removeWorkout(requestModel);

            sendWorkouts(res);

        });
    }

    var publicAPI = {
        init: doInit
    }

    return publicAPI;
}


module.exports = WorkoutsController;
