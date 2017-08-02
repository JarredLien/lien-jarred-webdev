module.exports = function(app, models) {

    app.get('/wbdv/script/:scriptId/statement', statementListController);

    function statementListController(req, res) {
        res.render('wbdv/statement/statement-list.view.server.ejs');
    }
};