/**
 * Created by Jarred on 7/24/17.
 */
(function() {
    angular
        .module("WamApp")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.wid);
        }
        init();
    }
})();