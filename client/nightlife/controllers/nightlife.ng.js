angular.module("fcc-nightlife").controller("nightlifeCtrl", ["$scope", "$meteor",

    function ($scope, $meteor) {
        $scope.searching = false;
        $scope.bars = [];
        $scope.searchBars = function (searchString) {
            $scope.searching = true;
            Meteor.call("yelpSearch", searchString, function (error, data) {
                $scope.searching = false;
                $scope.bars = data;
                $scope.$apply();
            });
        };
        $scope.countMeIn = function (id) {
            Meteor.call("countMeIn", id, function (error, result) {
                if (error) {
                    window.alert(error);
                }
            });
        };
        
    }
    
]);