// TODO: remove the fucking prototype shit!

var WorkoutsController = function WorkoutsController(){

    var routMaker, workoutsuseCaseInteractor;

    function doInit(router, useCaseInteractor) {
        routMaker = router;
        workoutsUseCaseInteractor = useCaseInteractor;

        makeRouts(router, workoutsUseCaseInteractor);
    }

    function makeRouts(router, workoutsUseCaseInteractor)
    {
        router.get('/workouts', function(req, res, next) {

            console.log("workouts get route")

            var done = function(viewModel){  
                res.render('workouts', {'workouts': viewModel.workouts})
            }

            workoutsUseCaseInteractor.getWorkouts(done)

        });

        router.post('/workouts', function(req, res, next) {
            var requestModel = {
                date: Date(),
                title: "Running",
                comments: "easy"
            }

            workoutsUseCaseInteractor.addWorkout(requestModel);
            res.send('Post page');
        });
    }

    var publicAPI = {
        init: doInit
    }

    return publicAPI;
}


module.exports = WorkoutsController;
