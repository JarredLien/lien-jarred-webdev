/**
 * Created by Jarred on 7/25/17.
 */
(function() {
    angular
        .module("WamApp")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;

        vm.createWidget = createWidget;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        function createWidget(widgetType) {
            var newWidget = {
                widgetType: widgetType,
                pageId: vm.pid
            };
            var promise = WidgetService.createWidget(vm.pid, newWidget);
            promise
                .then(
                    function(response) {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + response.data);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
    }
})();