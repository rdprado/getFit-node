// TODO: remove the fucking prototype shit!

var WorkoutsController = function WorkoutsController(){

    var routeMaker, workoutsuseCaseInteractor;

    function doInit(router, useCaseInteractor) {
        routeMaker = router;
        workoutsUseCaseInteractor = useCaseInteractor;

        makeRouts(router, workoutsUseCaseInteractor);
    }

    function makeRouts(router, workoutsUseCaseInteractor)
    {

        router.get('/vuetest', function(req, res, next) {
            res.json({car: "HAHAHAHA", name: "this is neve going to work"});
            console.log(res.json);
        });

        router.get('/workouts', function(req, res, next) {
            var done = function(viewModel){  
                res.json(viewModel.workouts);
                // res.render('workouts', {'workouts': viewModel.workouts})
            }
            workoutsUseCaseInteractor.getWorkouts(done);
        });

        router.post('/workouts/add', function(req, res, next) {

            var date = new Date(Date.UTC(req.body.dateYear, req.body.dateMonth, req.body.dateDay));

            var requestModel = {
                date: date,
                title: req.body.title,
                comments: req.body.comments
            }

            workoutsUseCaseInteractor.addWorkout(requestModel);
            //res.send('Post page');
        });

        router.post('/workouts/delete', function(req, res, next){
            var requestModel = {
                ID: req.body.ID,
            }
            workoutsUseCaseInteractor.removeWorkout(requestModel);
            //res.send('Delete page');
        });

        // // application -------------------------------------------------------------
        // router.get('*', function(req, res) {
        //     console.log(req);
        // });
    }

    var publicAPI = {
        init: doInit
    }

    return publicAPI;
}


module.exports = WorkoutsController;
