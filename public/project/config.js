(function () {
    angular
        .module("searchApp")
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
            .when("/teams", {
                templateUrl: "views/search/templates/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/user/:uid/teams", {
                templateUrl: "views/search/templates/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/roster/:sportId/:tid", {
                templateUrl: "views/roster/templates/roster-list.view.client.html",
                controller: "RosterController",
                controllerAs: "model"
            })
            .when("/standings", {
                templateUrl: "views/standings/templates/standings.view.client.html",
                controller: "StandingsController",
                controllerAs: "model"
            })
            .when("/roster", {
                templateUrl: "views/roster/templates/roster.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();
