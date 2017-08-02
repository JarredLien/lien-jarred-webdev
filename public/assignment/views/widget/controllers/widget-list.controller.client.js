(function () {
    angular
        .module("WamApp")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.getHTML = getHTML;
        vm.getURL = getURL;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        function init() {
            var promise = WidgetService.findWidgetsByPageId(vm.pid);
            promise
                .then(
                    function (response) {
                        vm.widgets = response.data;
                    },
                    function (error) {
                        vm.error = error.data;
                    });
        }

        init();

        function getHTML(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getURL(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        $(".widget-container")
            .sortable({
                axis: 'y'
            })
    }
})();