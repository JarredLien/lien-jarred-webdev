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
            endpoint = "//api.sportradar.us/nfl-ot2/teams/"+ teamID +"/full_roster.json?api_key=qhr3qrja8x92gdj8uy7ruaz6";
            break;
          case "MLB":
            endpoint = "//api.sportradar.us/mlb-t6/teams/"+ teamID +"/profile.json?api_key=az76hm3ud4v28sttvhqau8em";
            break;
          case "NHL":
            endpoint = "//api.sportradar.us/nhl-ot4/teams/"+ teamID +"/profile.json?api_key=wt9f89azus6dyf5tbq4eucqr";
            break;
          case "NBA":
            endpoint = "//api.sportradar.us/nba-t3/teams/"+ teamID +"/profile.json?api_key=hzk2zje9pp92rtkwtpth6yty";
            break;
        }

        $http.get(endpoint)
          .then(function(res) {
            return res;
          });
      }

    }
})();
