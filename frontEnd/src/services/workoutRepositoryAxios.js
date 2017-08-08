var WorkoutRepositoryAxios = function() {
	
	var workoutTypes = [];
	
	function init() {
		workoutTypes = getWorkoutTypesFromServer();
	}

	function getWorkoutTypes(done) {
		if(workoutTypes.length == 0)
			getWorkoutTypesFromServer(done);
		else
			done(workoutTypes);
	}
	
	function getWorkoutTypesFromServer(done) {
		axios.get('http://localhost:3000/workoutTypes').then(response => {
			 workoutTypes = response.data.workoutTypes; 
			 done(workoutTypes);
             console.log('sucess');
         }).catch(error => {
             console.log(error);
         });
	}
	
    function getWorkouts(done) {
        axios.get('http://localhost:3000/workouts').then(response => {
			var workoutsResponse = response.data; 
			done(workoutsResponse.map(jsonStringToWkt));
            console.log('sucess');
        }).catch(error => {
            console.log(error);
        });
    };
	
    function addWorkout(workout, done) {
        axios.post('http://localhost:3000/workouts/add', {
            ISOStringDate:workout.getDate().toISOString(), 
            title:workout.getTitle(), 
            comments: workout.getComments()}).then(response => {
                var workoutsResponse = response.data; 
                done(workoutsResponse.map(jsonStringToWkt));
                console.log('sucess');
            }).catch(error => {
                console.log('error');
            });
    };

    function removeWorkout(date, title, done) {
        axios.post('http://localhost:3000/workouts/remove', {ISOStringDate: date.toISOString(), title}).then(response => {
            var workoutsResponse = response.data; 
            done(workoutsResponse.map(jsonStringToWkt));
            console.log('sucess');
        }).catch(error => {
            console.log(error);
        });
    };
	
	function jsonStringToWkt(jsObject){
        var wkt = Workout();
        wkt.init(new Date(jsObject.ISOStringDate), jsObject.title, jsObject.comments);
        return wkt;
    }

    return {
		init,
		getWorkoutTypes,
        getWorkouts,
        addWorkout,
        removeWorkout
    }
}
