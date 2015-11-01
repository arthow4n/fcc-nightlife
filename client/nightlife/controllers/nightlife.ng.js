angular.module("fcc-nightlife").controller("nightlifeCtrl", ["$scope", "$meteor",

    function ($scope, $meteor) {
        $scope.loggedIn = Meteor.userId() ? true : false;
        
        $scope.searching = false;
        $scope.bars = [];
        $scope.searchBars = function (searchString) {
            $scope.searching = true;
            Meteor.call("yelpSearch", searchString, function (error, searchResult) {
                var barsIdArray = [];
                for (var i = 0; i < searchResult.length; i++) {
                    barsIdArray.push(searchResult[i].id);
                }
                
                Meteor.call("getBarsGoingCount", barsIdArray, function(error, barsGoingCountArray) {
                    for (var i = 0; i < searchResult.length; i++) {
                       searchResult[i].goingCount = barsGoingCountArray[i];
                    }
                    
                    Meteor.call("getMyGoingPlaces", function (error, myGoingPlaces) {
                        for (var i = 0; i < searchResult.length; i++) {
                            searchResult[i].iAmGoing = myGoingPlaces.indexOf(searchResult[i].id) !== -1;
                        }
                        $scope.searching = false;
                        $scope.bars = searchResult;
                        $scope.$apply();
                    });

                });
            });
        };
        $scope.countMeIn = function (id) {
            Meteor.call("countMeIn", id, function (error, result) {
                if (error) {
                    window.alert(error);
                }
                $scope.$apply();
            });
        };
        
    }
    
]);