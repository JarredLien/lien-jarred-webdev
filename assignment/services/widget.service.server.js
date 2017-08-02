/**
 * Created by Jarred on 7/30/17.
 */
module.exports = function(app) {
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Jabronis"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "https://static.independent.co.uk/s3fs-public/styles/article_small/public/thumbnails/image/2016/12/15/11/stone-cold-beer.jpg"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Golden State Warriors point guard Stephen Curry has beenthe best bargain in basketball over the past four seasons.He earned $44 million while leading the Warriors to threestraight NBA Finals and winning back-to-back NBA MVP Awards,including the first unanimous choice in the award’s historyfor the 2015-16 season.</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "STONE COLD"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://www.youtube.com/embed/tbfehmftR7A"},
    ];

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);


    function uploadImage(req, res) {


        var widgetId      = req.body.widgetId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var userId        = req.body.userId;
        var width         = req.body.width;
        var myFile        = req.file;

        // if no file has been selected, don't set the URL and don't upload any file
        if(myFile == null) {
            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
            return;
        }

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for(var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].url = "/uploads/" + filename;
            }
        }
        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    }

    function createWidget(req, res) {
        var newWidget = req.body;
        newWidget._id = (new Date()).getTime() + "";
        widgets.push(newWidget);
        res.status(200).send(newWidget._id);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        var result = [];
        for(var i in widgets) {
            if(widgets[i].pageId === pageId) {
                result.push(widgets[i]);
            }
        }
        res.send(result);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                res.json(widgets[i]);
                return;
            }
        }
        res.status(400).send("Widget with ID " + widgetId + " not found");
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;

        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                widgets[i] = widget;
                res.sendStatus(200);
                return true;
            }
        }
        res.status(400).send("Widget with ID " + widgetId + " not found");
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                widgets.splice(i, 1);
                res.sendStatus(200);
                return true;
            }
        }
        res.status(404).send("Unable to remove widget with ID " + widgetId);
    }
};