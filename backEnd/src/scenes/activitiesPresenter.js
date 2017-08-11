var ActivitiesPresenter = function ActivityPresenter() {

    function init() {
    }

    function formatGetActivities(responseModel) {
        return JSON.stringify(responseModel.activities);
    }

    function formatActivityNames(responseModel) {
        return JSON.stringify(responseModel.activityNames);
    }

    return {
        formatActivityNames: formatActivityNames,
        formatGetActivities: formatGetActivities
    }
}

module.exports = ActivitiesPresenter;
