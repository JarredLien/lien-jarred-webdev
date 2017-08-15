/**
 * Created by Jarred on 8/6/17.
 */
(function() {
    angular
        .module("searchApp")
        .controller("RosterController", RosterController);

    function RosterController($scope, RosterService) {
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

        $scope.findRosterByTeamID = function(selectedSport) {
            RosterService.findRosterByTeamID(selectedSport, "33405046-04ee-4058-a950-d606f8c30852").then(function(res) {
                $scope.conferences = res.data.conferences || res.data.leagues;
            })
        }
    }
})();