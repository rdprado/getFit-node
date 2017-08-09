var ActivityRepositoryAxios = function() {
	
	var activityTypes = [];
	
	function init() {
		activityTypes = getActivityTypesFromServer();
	}

	function getActivityTypes(done) {
		if(activityTypes.length == 0)
			getActivityTypesFromServer(done);
		else
			done(activityTypes);
	}
	
	function getActivityTypesFromServer(done) {
		axios.get('http://localhost:3000/activityTypes').then(response => {
			 activityTypes = response.data; 
			 done(activityTypes);
             console.log('sucess');
         }).catch(error => {
             console.log(error);
         });
	}
	
    function getActivities(done) {
        axios.get('http://localhost:3000/activities').then(response => {
			var activitiesResponse = response.data; 
			done(activitiesResponse.map(jsonStringToActivity));
            console.log('sucess');
        }).catch(error => {
            console.log(error);
        });
    };
	
    function addActivity(activity, done) {
        axios.post('http://localhost:3000/activities/add', {
            ISOStringDate:activity.getDate().toISOString(), 
            title:activity.getTitle(), 
            comments: activity.getComments()}).then(response => {
                var activitiesResponse = response.data; 
                done(activitiesResponse.map(jsonStringToActivity));
                console.log('sucess');
            }).catch(error => {
                console.log('error');
            });
    };

    function removeActivity(date, title, done) {
        axios.post('http://localhost:3000/activities/remove', {ISOStringDate: date.toISOString(), title}).then(response => {
            var activitiesResponse = response.data; 
            done(activitiesResponse.map(jsonStringToActivity));
            console.log('sucess');
        }).catch(error => {
            console.log(error);
        });
    };
	
	function jsonStringToActivity(jsObject){
        var activity = Activity();
        activity.init(new Date(jsObject.ISOStringDate), jsObject.title, jsObject.comments);
        return activity;
    }

    return {
		init,
		getActivityTypes,
        getActivities,
        addActivity,
        removeActivity
    }
}
