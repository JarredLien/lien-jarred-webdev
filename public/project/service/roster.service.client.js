(function() {
    angular
        .module("searchApp")
        .factory("RosterService", RosterService);

    function RosterService($http) {

        var api = {
            findRosterByTeamID: findRosterByTeamID
        };
        return api;

        function findRosterByTeamID(sportId, teamID) {
            var endpoint = "";

            switch(sportId) {
                case "NFL":
                    endpoint = "/api/teams/NFL/" + teamID;
                    break;
                case "MLB":
                    endpoint = "/api/teams/MLB/" + teamID;
                    break;
                case "NHL":
                    endpoint = "/api/teams/NHL/" + teamID;
                    break;
                case "NBA":
                    endpoint = "/api/teams/NBA/" + teamID;
                    break;
            }

            return $http.get(endpoint);
        }

    }
})();