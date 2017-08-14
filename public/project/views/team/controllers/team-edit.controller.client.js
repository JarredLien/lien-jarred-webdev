/**
 * Created by Jarred on 7/23/17.
 */
(function () {
    angular
        .module("searchApp")
        .controller("EditTeamController", EditTeamController);

    function EditTeamController($location, $routeParams, TeamService) {
        var vm = this;
        vm.submitted = false;

        vm.updateTeam = updateTeam;
        vm.deleteTeam = deleteTeam;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        function init() {
            var promise = TeamService.findTeamById(vm.wid);
            promise
                .then(
                    function (response) {
                        vm.team = response.data;
                    },
                    function (error) {
                        vm.error = error.data;
                    });
        }

        init();

        function updateTeam() {
            vm.submitted = true;
            if (vm.team.name && vm.team.name != "") {
                var promise = TeamService.updateTeam(vm.wid, vm.team);
                promise
                    .then(
                        function (res) {
                            vm.success = "Team Updated";
                            $location.url("/user/" + vm.uid + "/team");
                            vm.submitted = false;
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    )
            }
        }

        function deleteTeam() {
            var promise = TeamService.deleteTeam(vm.wid);
            promise
                .then(
                    function (res) {
                        vm.success = "Team Deleted";
                        $location.url("/user/" + vm.uid + "/team");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )
        }
    }
})();