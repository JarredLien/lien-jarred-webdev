module.exports = function(app, models) {

    var scriptModel = models.scriptModel;

    app.get('/wbdv/script/new', newScriptController);
    app.post('/wbdv/script', createScriptController);
    app.post('/wbdv/script/:scriptId', updateScriptController);
    app.get('/wbdv/script/:scriptId', editScriptController);
    app.get('/wbdv/script/:scriptId/delete', deleteScriptController);

    app.get('/wbdv/script', scriptListController);

    function deleteScriptController(req, res) {
        var scriptId = req.params.scriptId;
        scriptModel
            .deleteScript(scriptId)
            .then(
                function() {
                    res.redirect('/wbdv/script');
                }
            )
    }

    function updateScriptController(req, res) {
        var scriptId = req.params.scriptId;
        var newScript = req.body;
        scriptModel
            .updateScript(scriptId, newScript)
            .then(
                function(script) {
                    res.redirect('/wbdv/script');
                }
            );
    }

    function createScriptController(req, res) {
        console.log(req.body);
        scriptModel
            .createScript(req.body)
            .then(
                function(script) {
                    res.redirect('/wbdv/script');
                }
            );
    }

    function scriptListController(req, res) {
        scriptModel
            .findAllScripts()
            .then(
                function(scripts) {
                    var data = {
                        scripts: scripts
                    };
                    res.render('wbdv/script/script-list.view.server.ejs', data);
                }
            );
    }

    function newScriptController(req, res) {
        res.render('wbdv/script/script-new.view.server.ejs');
    }

    function editScriptController(req, res) {
        var scriptId = req.params.scriptId;
        scriptModel
            .findScriptById(scriptId)
            .then(
                function(script) {
                    var scope = {
                        script: script
                    };
                    res.render('wbdv/script/script-edit.view.server.ejs', scope);
                }
            );
    }
};