"use strict";

var ActivitiesController = require('../src/scenes/activitiesController')
var assert = require('assert')

var ActivitiesUseCaseInteractorSpy = function() {

    var getActivitiesCalled = false;

    function getActivities() {
        getActivitiesCalled = true;
        return new Promise(function(resolve,reject){
          resolve();
        })
    }

    function getGetActivitiesCalled() {
        return getActivitiesCalled;
    }
 
    return {
        getActivities: getActivities,
        getGetActivitiesCalled: getGetActivitiesCalled
    }
}

var RouterSpy = function() {

    var routerList = [];

    function get(RouteName, RouteFunc) {
        routerList.push({routeName:RouteName, routeFunc:RouteFunc});
    }

    function getRouterList() {
        return routerList;
    }

    return {
        get: get,
        getRouterList: getRouterList
    }
}

var ResponseSpy = function(){

    var sendCalled = false;

    function send(resParams){
        sendCalled = true;
        //done();
    }

    function getSendCalled() {
        return sendCalled;
    }

    return {
        send:send,
        getSendCalled: getSendCalled
    }
}

var activitiesController = ActivitiesController();
var routerSpy = RouterSpy();
var activitiesUseCaseInteractorSpy = ActivitiesUseCaseInteractorSpy();

describe('ActivitiesControllerTest', function(){

    before(function(){
        
    });

    beforeEach(function(){

        activitiesController = ActivitiesController();
        routerSpy = RouterSpy();
        activitiesUseCaseInteractorSpy = ActivitiesUseCaseInteractorSpy();
        activitiesController.init(routerSpy, activitiesUseCaseInteractorSpy);
    });

    describe('#testRoutesConfigured', function(){
        it('should have routes on a router list', function(){ 
            var routes = routerSpy.getRouterList();
            assert.equal(routes.length, 1);

            var foundEl = routes.find((el, inx, array)=>{
                return el.routeName === '/activities'
            })

            assert.equal(foundEl.routeName, '/activities');
        })
    })

    describe('#testGetActivitiesRoute', function(){
        it('should call useCaseInteractor getActivities', function(done) {
            //done();
            var routes = routerSpy.getRouterList();
            var getActivitiesRouteEl = routes.find((el, inx, array)=>{
                return el.routeName === '/activities'
            })

            var dummyReq = {};
            var responseSpy = ResponseSpy();


            assert.equal(activitiesUseCaseInteractorSpy.getGetActivitiesCalled(), false);
            assert.equal(responseSpy.getSendCalled(), false);

            getActivitiesRouteEl.routeFunc(dummyReq, responseSpy).then(function(){
                assert.equal(activitiesUseCaseInteractorSpy.getGetActivitiesCalled(), true);
                assert.equal(responseSpy.getSendCalled(), true);
                done();    
            });

            
            
            //assert.equal(activitiesUseCaseInteractorSpy.getGetActivitiesCalled(), false);
            //assert.equal(responseSpy.getSendCalled(), false);

            //getActivitiesRouteEl.routeFunc(dummyReq, responseSpy)//.then(function(result){
                //assert.equal(activitiesUseCaseInteractorSpy.getGetActivitiesCalled(), true);
                //assert.equal(responseSpy.getSendCalled(), true);
                //done();
            //}).catch(function(err){
            //    console.log(err);
            //});

            
        })
    })
})