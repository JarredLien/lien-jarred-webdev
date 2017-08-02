/**
 * Created by Jarred on 7/25/17.
 */
(function() {
    angular
        .module("WamApp")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        function init() {
            var promise = WidgetService.findWidgetById(vm.wgid);
            promise
                .then(
                    function(response) {
                        vm.widget = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
        init();

        function deleteWidget() {
            var promise = WidgetService.deleteWidget(vm.wgid);
            promise
                .then(
                    function(response) {
                        vm.success = "Widget successfully deleted";
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        function updateWidget() {
            var promise = WidgetService.updateWidget(vm.wgid, vm.widget);
            promise
                .then(
                    function(response) {
                        vm.success = "Widget successfully updated";
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
    }
})();