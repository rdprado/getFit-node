var WorkoutsController = function WorkoutsController(router, workoutsUseCaseInteractor){
    this.router = router;
    this.makeRouts = makeRouts;
    this.workoutsUseCaseInteractor = workoutsUseCaseInteractor;

    this.makeRouts(this.router, workoutsUseCaseInteractor);
}

function makeRouts(router, workoutsUseCaseInteractor)
{
    router.get('/workouts', function(req, res, next) {

        console.log("workouts get route")

        var cb = function(workouts){  
            res.render('workouts', {'workouts': workouts})
        }

        workoutsUseCaseInteractor.getWorkouts(cb)

    });

    router.post('/workouts', function(req, res, next) {
        var requestModel = {
            date: Date.now,
            title: "Running",
            comments: "easy"
        }

        workoutsUseCaseInteractor.addWorkout(requestModel);
        res.send('Post page');
    });
}

module.exports = WorkoutsController;
