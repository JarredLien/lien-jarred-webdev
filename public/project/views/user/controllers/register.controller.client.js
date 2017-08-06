(function() {
    angular
        .module("WamApp")
        .controller("RegisterController", RegisterController);


    function RegisterController($location, UserService) {

        var vm = this;
        vm.register = register;

        function register(username, password, verifypassword) {
            if (username && password && verifypassword) {
                if (UserService.findUserByUsername(username) !== null) {
                    vm.error = "Username Not Available"
                }
                else if (password === verifypassword) {
                    var id = (new Date).getTime();
                    var newUser = {
                        _id: id,
                        username: username,
                        password: password,
                        firstName: '',
                        lastName: '',
                        email: ''
                    };

                    UserService.createUser(newUser);
                    $location.url("/user/" + id);
                }
                else {
                    vm.error = "Passwords don't match";
                }
            }
            else {
                vm.error = "Enter a Username & Password"
            }
        }
    }

})();