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
      $scope.standings = null;

      $scope.findStandingsBySport = function(selectedSport) {
        var standings = StandingsService.findStandingsBySport(selectedSport, "2016");
        if(standings) {
          $scope.standings = standings;
        } else {
          alert("Error occurred when searching");
        }
      }
    }
})();
