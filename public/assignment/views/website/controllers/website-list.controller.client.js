/**
 * Created by Jarred on 7/23/17.
 */
(function() {
    angular
        .module("WamApp")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.uid);
            promise
                .then(
                    function(response) {
                        vm.websites = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
        init();
    }
})();