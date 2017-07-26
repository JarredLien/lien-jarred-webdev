/**
 * Created by Jarred on 7/25/17.
 */
(function() {
    angular
        .module("WamApp")
        .factory("WidgetService", WidgetService);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Jabronis"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "https://static.independent.co.uk/s3fs-public/styles/article_small/public/thumbnails/image/2016/12/15/11/stone-cold-beer.jpg"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Golden State Warriors point guard Stephen Curry has beenthe best bargain in basketball over the past four seasons.He earned $44 million while leading the Warriors to threestraight NBA Finals and winning back-to-back NBA MVP Awards,including the first unanimous choice in the award’s historyfor the 2015-16 season.</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "STONE COLD"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://www.youtube.com/embed/tbfehmftR7A"},
    ];

    function WidgetService() {

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget)
        }

        function findWidgetsByPageId(pageId) {
            var result = [];
            for(var i in widgets) {
                if(widgets[i].pageId === pageId) {
                    result.push(widgets[i]);
                }
            }
            return result;
        }

        function findWidgetById(widgetId) {
            for(var i in widgets) {
                if(widgets[i]._id == widgetId) {
                    return widgets[i];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for(var i in widgets) {
                if(widgets[i]._id == widgetId) {
                    widgets[i] = widget;
                }
            }
        }

        function deleteWidget(widgetId) {
            for(var i in widgets) {
                if (widgets[i]._id == widgetId) {
                    widgets.splice(i, 1);
                }
            }
        }
    }
})();