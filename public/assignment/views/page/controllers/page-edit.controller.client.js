/**
 * Created by Jarred on 7/24/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("EditPageController", EditPageController);

    function EditPageController(PageService, $location, $routeParams) {
        var vm = this;
        vm.submitted = false;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        function init() {
            var promise = PageService.findPageById(vm.pid);
            promise
                .then(
                    function (response) {
                        vm.page = response.data;
                    },
                    function (error) {
                        vm.error = error.data;
                    });
        }

        init();

        function updatePage() {
            vm.submitted = true;
            if (vm.page.name && vm.page.name != "") {
                var promise = PageService.updatePage(vm.pid, vm.page);
                promise
                    .then(
                        function (response) {
                            vm.success = "Page Updated";
                            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                            vm.submitted = false;
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    )
            } else {
                vm.error = "Enter a Page Name";
            }
        }

        function deletePage() {
            var promise = PageService.deletePage(vm.pid);
            promise
                .then(
                    function (response) {
                        vm.success = "Page Deleted";
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )
        }

    }
})();