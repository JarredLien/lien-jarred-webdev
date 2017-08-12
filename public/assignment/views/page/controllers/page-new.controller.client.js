/**
 * Created by Jarred on 7/24/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.submitted = false;
        vm.createPage = createPage;

        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];

        function createPage(name, title) {
            vm.submitted = true;
            if (name != null && name != "") {
                var newPage = {
                    name: name,
                    websiteId: vm.wid,
                    title: title
                };
                var promise = PageService.createPage(vm.uid, newPage);
                promise
                    .then(
                        function (response) {
                            vm.success = "Created new website";
                            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                            vm.submitted = false;
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    )
            }
            else {
                vm.error = "Please Enter a Page Name";
            }
        }

    }
})();