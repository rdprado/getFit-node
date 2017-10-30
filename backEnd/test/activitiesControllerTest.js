"use strict";

var ActivitiesController = require('../src/scenes/activitiesController')
var assert = require('assert')

var ActivitiesUseCaseInteractorSpy = function() {

    var getActivitiesCalled = false;
    var addActivityCalled = false;
    var updateActivityCalled = false;
    var removeActivityCalled = false;
    var activities = [];

    function getActivities() {
        getActivitiesCalled = true;
        return new Promise(function(resolve,reject){
          resolve(activities);
        })
    }

    function addActivity() {
        addActivityCalled = true;
        return new Promise(function(resolve,reject){
          resolve();
        })
    }

    function removeActivity() {
        removeActivityCalled = true;
        return new Promise(function(resolve,reject){
          resolve();
        })
    }

    function updateActivity() {
        updateActivityCalled = true;
        return new Promise(function(resolve,reject){
          resolve();
        })
    }

    function setActivities(Activities) {
        activities = Activities;
    }

    function getGetActivitiesCalled() {
        return getActivitiesCalled;
    }

    function getAddActivityCalled() {
        return addActivityCalled;
    }

    function getUpdateActivityCalled() {
        return updateActivityCalled;
    }

    function getRemoveActivityCalled() {
        return removeActivityCalled;;
    }
 
    return {
        getActivities: getActivities,
        addActivity: addActivity,
        updateActivity: updateActivity,
        removeActivity: removeActivity,
        setActivities: setActivities,
        getGetActivitiesCalled: getGetActivitiesCalled,
        getAddActivityCalled: getAddActivityCalled,
        getUpdateActivityCalled: getUpdateActivityCalled,
        getRemoveActivityCalled: getRemoveActivityCalled
    }
}

var ActivitiesUseCaseInteractorSpyError = function() {
    
    var getActivitiesCalled = false;
    var addActivityCalled = false;
    var updateActivityCalled = false;
    var removeActivityCalled = false;
    
    function getActivities() {
        getActivitiesCalled = true;
        return new Promise(function(resolve,reject){
            reject();
        })
    }

    function addActivity() {
        addActivityCalled = true;
        return new Promise(function(resolve,reject){
            reject();
        })
    }

    function updateActivity() {
        updateActivityCalled = true;
        return new Promise(function(resolve,reject){
            reject();
        })
    }

    function removeActivity() {
        removeActivityCalled = true;
        return new Promise(function(resolve,reject){
            reject();
        })
    }

    function getGetActivitiesCalled() {
        return getActivitiesCalled;
    }

    function getAddActivityCalled() {
        return addActivityCalled;
    }

    function getUpdateActivityCalled() {
        return updateActivityCalled;
    }

    function getRemoveActivityCalled() {
        return removeActivityCalled;;
    }
    
    return {
        getActivities: getActivities,
        addActivity: addActivity,
        updateActivity: updateActivity,
        removeActivity: removeActivity,
        getGetActivitiesCalled: getGetActivitiesCalled,
        getAddActivityCalled: getAddActivityCalled,
        getUpdateActivityCalled: getUpdateActivityCalled,
        getRemoveActivityCalled: getRemoveActivityCalled
    }
}

var RouterSpy = function() {

    var routerList = [];

    function get(RouteName, RouteFunc) {
        routerList.push({routeName:RouteName, routeFunc:RouteFunc});
    }

    function post(RouteName, RouteFunc) {
        routerList.push({routeName:RouteName, routeFunc:RouteFunc});
    }

    function getRouterList() {
        return routerList;
    }

    return {
        get: get,
        post: post,
        getRouterList: getRouterList
    }
}

var ResponseSpy = function(){

    var sendCalled = false;
    var statusAndSendCalled = false;
    var statusCode = 0;
    var resParams = [];

    function send(ResParams){
        sendCalled = true;
        resParams = ResParams;
    }

    function getSendCalled() {
        return sendCalled;
    }

    function status(code) {
        
        statusCode = code;

        function send(err) {
            statusAndSendCalled = true;
        }

        return {
            send: send
        }
    }

    function getStatusSendCalled() {
        return statusAndSendCalled;
    }

    function getStatusCode() {
        return statusCode;
    }

    function getSendResponseParameters() {
        return resParams;
    }

    return {
        send:send,
        status: status,
        getSendCalled: getSendCalled,
        getStatusCode: getStatusCode,
        getStatusSendCalled: getStatusSendCalled,
        getSendResponseParameters : getSendResponseParameters
    }
}

var activitiesController;
var routerSpy;
var activitiesUseCaseInteractorSpy;
var activitiesUseCaseInteractorSpyError;

describe('ActivitiesControllerTest', function(){

    before(function(){
        
    });

    beforeEach(function(){

        activitiesController = ActivitiesController();
        routerSpy = RouterSpy();
        activitiesUseCaseInteractorSpy = ActivitiesUseCaseInteractorSpy();
        activitiesUseCaseInteractorSpyError = ActivitiesUseCaseInteractorSpyError();
        activitiesController.init(routerSpy, activitiesUseCaseInteractorSpy);
    });

    describe('#testRoutesConfigured', function(){
        it('should have routes on a router list', function(){ 
            var routes = routerSpy.getRouterList();
            assert.equal(routes.length, 4);
            assert.equal(routes[0].routeName, '/activities');
            assert.equal(routes[1].routeName, '/activities/add');
            assert.equal(routes[2].routeName, '/activities/update');
            assert.equal(routes[3].routeName, '/activities/remove');
        })
    })

    describe('#testGetActivitiesRoute', function(){
        it('should call useCaseInteractor getActivities and send response', function(done) {

            var routes = routerSpy.getRouterList();
            var getActivitiesRouteEl = routes.find((el, inx, array)=>{
                return el.routeName === '/activities'
            })

            var dummyReq = {};
            var responseSpy = ResponseSpy();


            var activity = {test:"test"};
            activitiesUseCaseInteractorSpy.setActivities([activity])

            assert.equal(activitiesUseCaseInteractorSpy.getGetActivitiesCalled(), false);
            assert.equal(responseSpy.getSendCalled(), false);

            getActivitiesRouteEl.routeFunc(dummyReq, responseSpy).then(function(){
                assert.equal(activitiesUseCaseInteractorSpy.getGetActivitiesCalled(), true);
                assert.equal(responseSpy.getSendCalled(), true);
                assert.equal(responseSpy.getSendResponseParameters()[0].test, "test");
                done();    
            });
        })
    })

    describe('#testGetActivitiesRouteWithError', function(){
        it('should reject and send error 500 as response', function(done) {


            activitiesController.init(routerSpy, activitiesUseCaseInteractorSpyError)

            var routes = routerSpy.getRouterList();
            var getActivitiesRouteEl = routes.find((el, inx, array)=>{
                return el.routeName === '/activities'
            })

            var dummyReq = {};
            var responseSpy = ResponseSpy();

            assert.equal(activitiesUseCaseInteractorSpyError.getGetActivitiesCalled(), false);
            assert.equal(responseSpy.getSendCalled(), false);

            getActivitiesRouteEl.routeFunc(dummyReq, responseSpy).then(function(){  
            }).catch(function(err){
                assert.equal(activitiesUseCaseInteractorSpyError.getGetActivitiesCalled(), true);
                assert.equal(responseSpy.getSendCalled(), false);
                assert.equal(responseSpy.getStatusCode(), 500)
                assert.equal(responseSpy.getStatusSendCalled(), true)
                done();   
            });
        })
    })

    describe('#testAddActivityRoute', function(){
        it('should call useCaseInteractor add Activity and send response', function(done) {

            var routes = routerSpy.getRouterList();
            var addActivityRouteEl = routes.find((el, inx, array)=>{
                return el.routeName === '/activities/add'
            })

            var dummyReq = {};
            var responseSpy = ResponseSpy();


            //var activity = {test:"test"};
            //activitiesUseCaseInteractorSpy.setActivities([activity])

            assert.equal(activitiesUseCaseInteractorSpy.getAddActivityCalled(), false);
            assert.equal(responseSpy.getSendCalled(), false);

            addActivityRouteEl.routeFunc(dummyReq, responseSpy).then(function(){
                assert.equal(activitiesUseCaseInteractorSpy.getAddActivityCalled(), true);
                assert.equal(responseSpy.getStatusCode(), 200)
                assert.equal(responseSpy.getStatusSendCalled(), true)
                done();    
            });
        })
    })

    describe('#testAddActivityRouteWithError', function(){
        it('should reject and send error 500 as response', function(done) {

            activitiesController.init(routerSpy, activitiesUseCaseInteractorSpyError)

            var routes = routerSpy.getRouterList();
            var addActivityRouteEl = routes.find((el, inx, array)=>{
                return el.routeName === '/activities/add'
            })

            var dummyReq = {};
            var responseSpy = ResponseSpy();

            assert.equal(activitiesUseCaseInteractorSpyError.getAddActivityCalled(), false);
            assert.equal(responseSpy.getSendCalled(), false);

            addActivityRouteEl.routeFunc(dummyReq, responseSpy).then(function(){  
            }).catch(function(err){
                assert.equal(activitiesUseCaseInteractorSpyError.getAddActivityCalled(), true);
                assert.equal(responseSpy.getStatusCode(), 500)
                assert.equal(responseSpy.getStatusSendCalled(), true)
                done();   
            });
        })
    })

    describe('#testRemoveActivityRoute', function(){
        it('should call useCaseInteractor remove Activity and send response', function(done) {

            var routes = routerSpy.getRouterList();
            var removeActivityRouteEl = routes.find((el, inx, array)=>{
                return el.routeName === '/activities/remove'
            })

            var dummyReq = {};
            var responseSpy = ResponseSpy();


            //var activity = {test:"test"};
            //activitiesUseCaseInteractorSpy.setActivities([activity])

            assert.equal(activitiesUseCaseInteractorSpy.getRemoveActivityCalled(), false);
            assert.equal(responseSpy.getSendCalled(), false);

            removeActivityRouteEl.routeFunc(dummyReq, responseSpy).then(function(){
                assert.equal(activitiesUseCaseInteractorSpy.getRemoveActivityCalled(), true);
                assert.equal(responseSpy.getStatusCode(), 200)
                assert.equal(responseSpy.getStatusSendCalled(), true)
                done();    
            });
        })
    })

    describe('#testRemoveActivityRouteWithError', function(){
        it('should reject and send error 500 as response', function(done) {

            activitiesController.init(routerSpy, activitiesUseCaseInteractorSpyError)

            var routes = routerSpy.getRouterList();
            var removeActivityRouteEl = routes.find((el, inx, array)=>{
                return el.routeName === '/activities/remove'
            })

            var dummyReq = {};
            var responseSpy = ResponseSpy();

            assert.equal(activitiesUseCaseInteractorSpyError.getRemoveActivityCalled(), false);
            assert.equal(responseSpy.getSendCalled(), false);

            removeActivityRouteEl.routeFunc(dummyReq, responseSpy).then(function(){  
            }).catch(function(err){
                assert.equal(activitiesUseCaseInteractorSpyError.getRemoveActivityCalled(), true);
                assert.equal(responseSpy.getStatusCode(), 500)
                assert.equal(responseSpy.getStatusSendCalled(), true)
                done();   
            });
        })
    })

    describe('#testUpdateActivityRoute', function(){
        it('should call useCaseInteractor update Activity and send response', function(done) {

            var routes = routerSpy.getRouterList();
            var updateActivityRouteEl = routes.find((el, inx, array)=>{
                return el.routeName === '/activities/update'
            })

            var dummyReq = {};
            var responseSpy = ResponseSpy();

            assert.equal(activitiesUseCaseInteractorSpy.getUpdateActivityCalled(), false);
            assert.equal(responseSpy.getSendCalled(), false);

            updateActivityRouteEl.routeFunc(dummyReq, responseSpy).then(function(){
                assert.equal(activitiesUseCaseInteractorSpy.getUpdateActivityCalled(), true);
                assert.equal(responseSpy.getStatusCode(), 200)
                assert.equal(responseSpy.getStatusSendCalled(), true)
                done();    
            });
        })
    })

    describe('#testUpdateActivityRouteWithError', function(){
        it('should reject and send error 500 as response', function(done) {

            activitiesController.init(routerSpy, activitiesUseCaseInteractorSpyError)

            var routes = routerSpy.getRouterList();
            var updateActivityRouteEl = routes.find((el, inx, array)=>{
                return el.routeName === '/activities/update'
            })

            var dummyReq = {};
            var responseSpy = ResponseSpy();

            assert.equal(activitiesUseCaseInteractorSpyError.getUpdateActivityCalled(), false);
            assert.equal(responseSpy.getSendCalled(), false);

            updateActivityRouteEl.routeFunc(dummyReq, responseSpy).then(function(){  
            }).catch(function(err){
                assert.equal(activitiesUseCaseInteractorSpyError.getUpdateActivityCalled(), true);
                assert.equal(responseSpy.getStatusCode(), 500)
                assert.equal(responseSpy.getStatusSendCalled(), true)
                done();   
            });
        })
    })
})