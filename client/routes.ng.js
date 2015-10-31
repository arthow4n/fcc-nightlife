angular.module("fcc-nightlife").config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);
    
    $stateProvider
        .state("nightlifeMain", {
            url: "/nightlife",
            templateUrl: "client/nightlife/views/nightlife.ng.html",
            controller: "nightlifeCtrl"
        });
    
    $urlRouterProvider.otherwise("/nightlife");
});