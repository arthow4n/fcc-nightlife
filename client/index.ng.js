angular.module("fcc-nightlife").controller("indexCtrl", ["$scope", "$state", 
    function ($scope, $state) {
        $scope.userId = Meteor.userId();
        Accounts.onLogout(function () {
            $state.go("nightlifeMain", {}, {reload: true});
        });
}]);