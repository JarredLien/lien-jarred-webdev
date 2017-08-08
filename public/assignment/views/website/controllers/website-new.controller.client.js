/**
 * Created by Jarred on 7/23/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.submitted = false;
        vm.createWebsite = createWebsite;

        vm.uid = $routeParams["uid"];

        function createWebsite(name, description) {
            vm.submitted = true;
            if (name != null) {
                var id = (new Date).getTime();

                var newWebsite = {
                    name: name,
                    developerId: vm.uid,
                    description: description
                };

                var promise = WebsiteService.createWebsite(vm.uid, newWebsite);
                promise
                    .then(
                        function (response) {
                            vm.success = "New Website Created";
                            $location.url("/user/" + vm.uid + "/website");
                            vm.submitted = false;
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    )
            }
            else {
                vm.error = "Enter a Website Name";
            }
        }

    }
})();