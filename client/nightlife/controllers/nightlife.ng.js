angular.module("fcc-nightlife").controller("nightlifeCtrl", ["$scope", "$meteor",

    function ($scope, $meteor) {
        
        
        $scope.searchBars = function (searchString) {
            console.log(searchString);
            
        };
        
    }
    
]);