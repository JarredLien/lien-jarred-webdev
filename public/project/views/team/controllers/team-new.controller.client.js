/**
 * Created by Jarred on 7/23/17.
 */
(function () {
    angular
        .module("searchApp")
        .controller("NewTeamController", NewTeamController);

    function NewTeamController($location, $routeParams, TeamService) {
        var vm = this;
        vm.submitted = false;
        vm.createTeam = createTeam;

        vm.uid = $routeParams["uid"];

        function createTeam(name, description) {
            vm.submitted = true;
            if (name != null) {
                var id = (new Date).getTime();

                var newTeam = {
                    name: name,
                    developerId: vm.uid,
                    description: description
                };

                var promise = TeamService.createTeam(vm.uid, newTeam);
                promise
                    .then(
                        function (response) {
                            vm.success = "New Team Created";
                            $location.url("/user/" + vm.uid + "/team");
                            vm.submitted = false;
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    )
            }
            else {
                vm.error = "Enter a Team Name";
            }
        }

    }
})();