var ActivitiesPresenter = function ActivityPresenter() {

    function init() {
    }

    function formatGetActivities(responseModel) {
        return JSON.stringify(responseModel.activities);
    }
	
	function formatActivityTypes(responseModel) {
		return JSON.stringify(responseModel.activityTypes);
	}
	
    return {
		formatActivityTypes: formatActivityTypes,
        formatGetActivities: formatGetActivities
    }
}

module.exports = ActivitiesPresenter;
