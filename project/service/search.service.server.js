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
                    endpoint = "https://api.sportradar.us/nfl-ot2/league/hierarchy.json?api_key=qhr3qrja8x92gdj8uy7ruaz6";
                    break;
                case "MLB":
                    endpoint = "//api.sportradar.us/mlb-t6/league/hierarchy.json?api_key=xw4m2y738ptck73tzhwake7b";
                    break;
                case "NHL":
                    endpoint = "//api.sportradar.us/nhl-ot4/league/hierarchy.json?api_key=ur2jwt7x38pdws7ch635bhmb";
                    break;
                case "NBA":
                    endpoint = "//api.sportradar.us/nba-t3/league/hierarchy.json?api_key=4uvxcvhy62szzwwm6st6ynab";
                    break;
            }

            $http.get(endpoint)
                .then(function(res) {
                    return res;
                });
        }

    }
})();
