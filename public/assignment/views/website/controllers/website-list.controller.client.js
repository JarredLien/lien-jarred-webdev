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

            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }
        init();
    }
})();