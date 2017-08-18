/**
 * Created by Jarred on 8/6/17.
 */
(function() {
    angular
        .module("searchApp")
        .controller("RosterController", RosterController);

    function RosterController($scope, $routeParams, RosterService) {
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
        $scope.roster = null;
        $scope.teamName = null;

        $scope.init = function() {
            RosterService.findRosterByTeamID($routeParams["sportId"], $routeParams["tid"]).then(function(res) {
                $scope.teamName = res.data.name;
                $scope.roster = res.data.players;
            })
        }

        $scope.init();
    }
})();
