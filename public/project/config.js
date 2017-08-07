(function () {
    angular
        .module("WamApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/search/templates/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/scores", {
                templateUrl: "views/scores/templates/scores.view.client.html",
                controller: "ScoresController",
                controllerAs: "model"
            })
            .when("/stats", {
                templateUrl: "views/stats/templates/stats.view.client.html",
                controller: "StatsController",
                controllerAs: "model"
            })
            .when("/standings", {
                templateUrl: "views/standings/templates/standings.view.client.html",
                controller: "StandingsController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();
