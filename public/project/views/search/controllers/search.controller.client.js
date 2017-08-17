/**
 * Created by Jarred on 8/6/17.
 */
(function() {
    angular
        .module("searchApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $routeParams, SearchService, TeamService) {
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

        uid = $routeParams["uid"];

        $scope.init = function() {
          var promise = TeamService.findTeamsByUser(uid);
          promise
              .then(
                  function(response) {
                      $scope.savedTeams = response.data;
                  },
                  function(error) {
                  });
        }

        $scope.createTeam = function(name, description) {
            if (name != null) {
                var id = (new Date).getTime();

                var newTeam = {
                    name: name,
                    developerId: uid,
                    description: description
                };

                var promise = TeamService.createTeam(uid, newTeam);
                promise
                    .then(
                        function (response) {

                        },
                        function (error) {
                        }
                    )
            }
            else {
                vm.error = "Enter a Team Name";
            }
        }

        $scope.findTeamsBySport = function(selectedSport) {
          SearchService.findTeamsBySport(selectedSport).then(function(res) {
            $scope.conferences = res.data.conferences || res.data.leagues;
          });
        }

        $scope.init();

    }
})();
