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
            endpoint = "//api.sportradar.us/nfl-ot2/seasontd/"+ year +"/standings.json?api_key=qhr3qrja8x92gdj8uy7ruaz6";
            break;
          case "MLB":
            endpoint = "//api.sportradar.us/mlb-t6/seasontd/"+ year +"/REG/standings.json?api_key=az76hm3ud4v28sttvhqau8em";
            break;
          case "NHL":
            endpoint = "//api.sportradar.us/nhl-ot4/seasontd/"+ year +"/REG/standings.json?api_key=wt9f89azus6dyf5tbq4eucqr";
            break;
          case "NBA":
            endpoint = "//api.sportradar.us/nhl-ot4/seasontd/"+ year +"/REG/standings.json?api_key=wt9f89azus6dyf5tbq4eucqr";
            break;
        }

        $http.get(endpoint)
          .then(function(res) {
            return res;
          });
      }

    }
})();
