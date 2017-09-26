(function() {
    'use strict';

    angular.module('App.Service.Project', [
        
    ])
        .service('ProjectService', function($http) {
            var URLS = {
                FETCH_ALL: 'http://localhost/reddot-api/api/v1/projects',
                FETCH_BY_ID: 'http://localhost/reddot-api/api/v1/projects/%d',
                UPDATE_BY_ID: 'http://localhost/reddot-api/api/v1/projects/%d',
                STORE_NEW: 'http://localhost/reddot-api/api/v1/projects',
                DELETE_BY_ID: 'http://localhost/reddot-api/api/v1/projects/%s'
            };
            this.getProjects = function() {
                return $http.get(URLS.FETCH_ALL);
            };
            this.getProjectsById = function(id) {
                var url = sprintf(URLS.FETCH_BY_ID, id);
                return $http.get(url);
            };
            this.updateProjectsById = function(id,name){
                var url = sprintf(URLS.UPDATE_BY_ID, id);
                return $http.put(url, { name: name});                
            };
            this.addProjectsById = function(name){
                return $http.post(URLS.STORE_NEW, {name: name});                
            };
            this.deleteProjectsById = function(ids){
                var url = sprintf(URLS.DELETE_BY_ID, ids);
                return $http.delete(url); 
            };

        });
}());