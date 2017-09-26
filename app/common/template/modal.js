(function() {
    'use strict';

    angular.module('App.Template.Modal', [
        
    ])
        .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, data) {
            $scope.data = {
                title: data.title,
                name: data.name,
                id: data.id
            };

            $scope.okLabel = $scope.data.id ? 'Edit' : 'Save';
            
            $scope.ok = function () {
                $uibModalInstance.close($scope.data);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });
}());