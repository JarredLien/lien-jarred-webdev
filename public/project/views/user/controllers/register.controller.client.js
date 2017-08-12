/**
 * Created by Jarred on 7/23/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("RegisterController", RegisterController);


    function RegisterController($location, UserService) {

        var vm = this;
        vm.register = register;
        vm.submitted = false;
        vm.badPassword = false;

        function register(username, password, verifypassword) {
            vm.submitted = true;
            if (username && password && verifypassword) {

                if (password === verifypassword) {

                    var promise = UserService.createUser(username, password);
                    promise
                        .then(
                            function(res) {
                                var user = res.data;
                                $location.url("/user/" + user._id);
                                vm.submitted = false;
                                vm.badPassword = false;
                            },
                            function(error) {
                                vm.error = error.data;
                            }
                        );
                }
                else {
                    vm.error = "Passwords do not match";
                    vm.badPassword = true;
                }
            }
            else {
                vm.error = "Please enter a username and password";
            }
        }
    }

})();