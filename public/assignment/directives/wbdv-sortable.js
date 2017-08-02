/**
 * Created by Jarred on 8/1/17.
 */
(function() {
    angular
        .module("wbdvDirectives", [])
        .directive("wbdv-sortable", wbdvSortable);

    function wbdvSortable() {
        function linker(scope, element, attributes) {
            var data = scope.data;
            var startIndex = -1;
            var endIndex = -1;

            $(element)
                .sortable({
                    axis: 'y',

                    handle: ".jll-widget-handle",

                    start: function(event, ui) {
                        startIndex = ui.item.index();
                    },
                    stop: function (event, ui) {
                        endIndex = ui.item.index();
                        var sortedElement = scope.data.splice(startIndex, 1)[0];
                        scope.data.splice(endIndex, 0, sortedElement);
                        scope.$apply();
                        scope.reorder({start: startIndex, end: endIndex});
                    }
                });
        }
        return {
            scope: {
                data: "=",
                reorder: "&sorted"
            },
            link: linker
        }

    }
})();