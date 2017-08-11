// Attention: axios is auto parsing json response and doing JSON.stringify on request

var ActivityRepositoryAxios = function() {

    var activityNamesPerType = [];

    function init() {
        activityNamesPerType = getActivityNamesFromServer();
    }

    function activityTypeForName(activityName) {
        for(pair in activityNamesPerType) {
            if(activityNamesPerType[pair].names.indexOf(activityName) >= 0) {
                return activityNamesPerType[pair].activityType;
            } 
        }
        return '';
    }

    function addActivity(activity, done) {
        axios.post('http://localhost:3000/activities/add', activity.toObjLiteral()).then(response => {
            var activitiesResponse = response.data; 
            done(activitiesResponse.map(jsObjectToActivity));
            console.log('sucess');
        }).catch(error => {
            console.log('error');
        });
    };

    function getActivityNames(done) {
        if(activityNamesPerType.length == 0)
            getActivityNamesFromServer(done);
        else
            done(activityNames);
    }

    function getActivityNamesFromServer(done) {
        axios.get('http://localhost:3000/activityNames').then(response => {
            activityNamesPerType = response.data; 
            done(activityNamesPerType);
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
        var activity = ActivityFactory().createActivity(activityTypeForName(jsObject.name), jsObject);
        return activity;
    }

    return {
        init,
        getActivityNames,
        getActivities,
        addActivity,
        removeActivity
    }
}
