(function() {
    angular
        .module("searchApp")
        .factory("StandingsService", StandingsService);

    function StandingsService($http) {

        var api = {
            findStandingsBySport: findStandingsBySport
        };
        return api;

        function findStandingsBySport(sportId, year) {
            var endpoint = "";

            switch(sportId) {
                case "NFL":
                    endpoint = "/api/standings/NFL/" + year;
                    break;
                case "MLB":
                    endpoint = "/api/standings/MLB/" + year;
                    break;
                case "NHL":
                    endpoint = "/api/standings/NHL/" + year;
                    break;
                case "NBA":
                    endpoint = "/api/standings/NBA/" + year;
                    break;
            }
            return $http.get(endpoint)
        }
    }
})();
