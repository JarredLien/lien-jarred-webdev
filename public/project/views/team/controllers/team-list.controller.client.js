/**
 * Created by Jarred on 7/23/17.
 */
(function() {
    angular
        .module("searchApp")
        .controller("TeamListController", TeamListController);

    function TeamListController($routeParams, TeamService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        function init() {
            var promise = TeamService.findTeamsByUser(vm.uid);
            promise
                .then(
                    function(response) {
                        vm.teams = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
        init();
    }
})();