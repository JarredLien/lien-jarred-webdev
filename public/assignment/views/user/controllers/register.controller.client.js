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

        function register(username, password, verifypassword) {
            if (username && password && verifypassword) {

                if (password === verifypassword) {

                    var promise = UserService.createUser(username, password);
                    promise
                        .then(
                            function (res) {
                                var user = res.data;
                                $location.url("/user/" + user._id);
                            },
                            function (error) {
                                vm.error = error.data;
                            }
                        );
                }
                else {
                    vm.error = "Passwords don't match";
                }
            }
            else {
                vm.error = "Enter a Username & Password";
            }
        }
    }

})();