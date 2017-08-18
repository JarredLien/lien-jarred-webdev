/**
 * Created by Jarred on 8/6/17.
 */
(function() {
    angular
        .module("searchApp")
        .controller("StandingsController", StandingsController);

    function StandingsController($scope, StandingsService) {
      $scope.sportOptions = [
          {
            value: "NFL",
            label: "NFL"
          },
          {
            value: "MLB",
            label: "MLB"
          },
          {
            value: "NBA",
            label: "NBA"
          },
          {
            value: "NHL",
            label: "NHL"
          }
        ]
      $scope.conferences = null;

      $scope.findStandingsBySport = function(selectedSport) {
        StandingsService.findStandingsBySport(selectedSport, "2016").then(function(res) {
          $scope.conferences = res.data.conferences || res.data.league.season.leagues;
        });
      }
    }
})();
