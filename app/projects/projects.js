(function() {
    'use strict';

    angular.module('App.Projects', [
        'ui.bootstrap',
        'App.Template.Modal',
        'App.Service.Project'
    ])
        .config(function($stateProvider){
            $stateProvider.state('projects', {
                url: '/projects',
                templateUrl: 'app/projects/projects.html',
                controller: 'ProjectsController'
            });
        })
        .controller('ProjectsController', function ($scope, $filter, $uibModal, ProjectService) {
            $scope.sortType = 'name'; // set the default sort type
            $scope.sortReverse = false;  // set the default sort order
            $scope.searchProject = '';  // set the default search/filter term
            $scope.markAll = false;
            var filter = $filter('filter');

            // get the list of projects         
            ProjectService.getProjects()
            .then(function(result) {
                $scope.projects = result.data.projects;
            });
            
            ProjectService.getProjectsById(1);
    
            $scope.showModal = function(title, name, id) {
                var data = {
                    title: title,
                    name: name,
                    id: id
                };
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/common/template/modal.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'md',
                    resolve: {
                        data: data
                    }
                });

                modalInstance.result.then(function (data) {
                    // Trigger when Edit/Save button on modal is click
                    if (data.id) {
                        ProjectService.updateProjectsById(data.id,data.name)
                            .then(function(){
                                    ProjectService.getProjects()
                                        .then(function(result) {
                                            $scope.projects = result.data.projects;
                                        });
                            });
                    } else {
                        ProjectService.addProjectsById(data.name)
                            .then(function(){
                                    ProjectService.getProjects()
                                        .then(function(result) {
                                            $scope.projects = result.data.projects;
                                            $scope.showModal;
                                            $scope.notification = 'Successfully Added Record';
                                        });
                            });
                    }
                       
                });
            };

            $scope.toggleCheckbox = function() {
                var projects = $scope.projects;
                for (var key in projects) {
                    projects[key].isSelected = $scope.markAll;
                }
            };
            $scope.removeSelected = function() {
                var projects = $scope.projects;
                var ids = [];
                for (var key in projects) {
                    if (projects[key].isSelected) {
                        ids.push(projects[key].id);
                    }
                }
                             
                    ProjectService.deleteProjectsById(ids.join(','))
                        .then(function(){
                            ProjectService.getProjects()
                                .then(function(result) {
                                    $scope.projects = result.data.projects;
                                });
                        });

            };


        });
}());