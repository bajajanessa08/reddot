(function() {
    'use strict';

    angular.module('App', [
        'ui.router',
        'ngAnimate',
        'App.Projects'
    ])
        .config(function($stateProvider, $urlRouterProvider){
            $stateProvider.state('main', {
                url: '',
                abstract: true
            });
            $urlRouterProvider.otherwise('/projects');
        });
}());