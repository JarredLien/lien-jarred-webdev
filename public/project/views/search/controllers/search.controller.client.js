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
        $scope.conferences = null;

        $scope.findTeamsBySport = function(selectedSport) {
          SearchService.findTeamsBySport(selectedSport).then(function(res) {
            $scope.conferences = res.data.conferences || res.data.leagues;
          });
        }
    }
})();
