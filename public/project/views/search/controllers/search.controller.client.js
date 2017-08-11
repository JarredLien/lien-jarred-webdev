/**
 * Created by Jarred on 8/6/17.
 */
(function() {
    angular
        .module("searchApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, SearchService) {
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
        $scope.teams = null;

        $scope.findTeamsBySport = function(selectedSport) {
          var teams = SearchService.findTeamsBySport(selectedSport);
          if(teams) {
            $scope.teams = teams;
          } else {
            alert("Error occurred when searching");
          }
        }
    }
})();
