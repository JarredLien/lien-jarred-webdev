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
        vm.pid = $routeParams.pid;
        vm.wid = $routeParams.wid;
        vm.wgid = $routeParams.wgid;

        function init() {
            vm.widget = angular.copy(WidgetService.findWidgetById(vm.wgid));
        }
        init();

        function deleteWidget() {
            WidgetService.deleteWidget(vm.wgid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }

        function updateWidget() {
            WidgetService.updateWidget(vm.wgid, vm.widget);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }
    }
})();