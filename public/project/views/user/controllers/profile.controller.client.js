/**
 * Created by Jarred on 7/23/17.
 */
(function () {
    angular
        .module("searchApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unRegister = unRegister;

        var uid = $routeParams["uid"];

        function init() {
            var promise = UserService.findUserById(uid);
            promise
                .then(function (res) {
                    vm.user = res.data
                })
        }

        init();

        function updateUser() {
            var promise = UserService.updateUser(uid, vm.user);
            promise
                .then(
                    function (res) {
                        vm.success = "User Updated";
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )
        }

        function unRegister() {
            var promise = UserService.deleteUser(uid);
            promise
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )
        }
    }

})();
