(function() {
    angular
        .module("searchApp")
        .factory("SearchService", SearchService);

    function SearchService($http) {

        var api = {
            findTeamsBySport: findTeamsBySport
        };
        return api;

        function findTeamsBySport(sportId) {
            var endpoint = "";

            switch(sportId) {
                case "NFL":
                    endpoint = "/api/search/NFL";
                    break;
                case "MLB":
                    endpoint = "/api/search/MLB";
                    break;
                case "NHL":
                    endpoint = "/api/search/NHL";
                    break;
                case "NBA":
                    endpoint = "/api/search/NBA";
                    break;
            }

            return $http.get(endpoint);
        }

    }
})();
