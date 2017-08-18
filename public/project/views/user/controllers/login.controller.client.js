/**
 * Created by Jarred on 7/23/17.
 */
(function() {
    angular
        .module("searchApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.submitted = false;

        vm.login = login;
        function login(username, password) {

            var promise = UserService.findUserByCredentials(username, password);
            promise
                .then(
                    function(response) {
                        var user = response.data;

                        if(user) {
                            var id = user._id;
                            $location.url("/user/" + id);
                        }
                    },
                    function(error) {
                        vm.error = "User not found";
                    });
        }
    }

})();