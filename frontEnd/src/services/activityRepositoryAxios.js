// Attention: axios is auto parsing json response and doing JSON.stringify on request

var ActivityRepositoryAxios = function() {
	
	var activityTypes = [];
	
	function init() {
		activityTypes = getActivityTypesFromServer();
	}
	
	function addActivity(activity, done) {
        axios.post('http://localhost:3000/activities/add', activity.serialized()).then(response => {
                var activitiesResponse = response.data; 
                done(activitiesResponse.map(jsObjectToActivity));
                console.log('sucess');
            }).catch(error => {
                console.log('error');
            });
    };
	
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
			done(activitiesResponse.map(jsObjectToActivity));
            console.log('sucess');
        }).catch(error => {
            console.log(error);
        });
    };
	
    function removeActivity(date, title, done) {
        axios.post('http://localhost:3000/activities/remove', {ISOStringDate: date.toISOString(), title}).then(response => {
            var activitiesResponse = response.data; 
            done(activitiesResponse.map(jsObjectToActivity));
            console.log('sucess');
        }).catch(error => {
            console.log(error);
        });
    };
	
	function jsObjectToActivity(jsObject){
		var activity = ActivityFactory().createActivity(jsObject);
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
