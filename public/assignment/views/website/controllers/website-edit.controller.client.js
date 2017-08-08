/**
 * Created by Jarred on 7/23/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.submitted = false;

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        function init() {
            var promise = WebsiteService.findWebsiteById(vm.wid);
            promise
                .then(
                    function (response) {
                        vm.website = response.data;
                    },
                    function (error) {
                        vm.error = error.data;
                    });
        }

        init();

        function updateWebsite() {
            vm.submitted = true;
            if (vm.website.name && vm.website.name != "") {
                var promise = WebsiteService.updateWebsite(vm.wid, vm.website);
                promise
                    .then(
                        function (res) {
                            vm.success = "Website Updated";
                            $location.url("/user/" + vm.uid + "/website");
                            vm.submitted = false;
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    )
            }
        }

        function deleteWebsite() {
            var promise = WebsiteService.deleteWebsite(vm.wid);
            promise
                .then(
                    function (res) {
                        vm.success = "Website Deleted";
                        $location.url("/user/" + vm.uid + "/website");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )
        }
    }
})();