/**
 * Created by Jarred on 7/30/17.
 */
// var websiteId = req.params.websiteId;
// var newPage = req.body;
// newPage.websiteId = websiteId;
//
// // var userId = req.params.userId;
// // var newWebsite = req.body;
// // newWebsite.developerId = userId;



module.exports = function(app, models) {

    var pageModel = models.pageModel;
    var websiteModel = models.websiteModel;

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId;
        newPage.websiteId = websiteId;

        pageModel
            .createPage(websiteId, newPage)
            .then(
                function(page) {
                    var pageId = page._id;
                    return websiteModel
                        .addPageIdToWebsite(pageId, websiteId)
                },
                function(error) {
                    res.status(400).send(error);
                }
            ).then(
            function(response) {
                res.sendStatus(200);
            },
            function(error) {
                res.status(400).send(error);
            }
        )
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function(pages) {
                    res.json(pages);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(
                function(page) {
                    res.json(page);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params.pageId;

        pageModel
            .updatePage(pageId, page)
            .then(
                function(page) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to update page with ID " + pageId);
                }
            );
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(
                function(page) {
                    var websiteId = page._website;

                    return websiteModel
                        .removePageIdFromWebsite(pageId, websiteId)
                },
                function(error) {
                    res.status(404).send("Unable to find page with ID " + pageId);
                }
            ).then(
            function(status) {
                return pageModel
                    .deletePage(pageId)
            },
            function(error) {
                res.status(404).send("Unable to remove page with ID " + pageId + " from website");
            }
        ).then(
            function(status) {
                res.sendStatus(200);
            },
            function(error) {
                res.status(404).send("Unable to delete page with ID " + pageId);
            }
        )
    }
};