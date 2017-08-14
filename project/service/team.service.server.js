/**
 * Created by Jarred on 7/29/17.
 */
module.exports = function(app, models) {

    var teamModel = models.teamModel;
    var userModel = models.userModel;

    app.post("/api/user/:userId/team", createTeam);
    app.get("/api/user/:userId/team", findAllTeamsForUser);
    app.get("/api/team/:teamId", findTeamById);
    app.put("/api/team/:teamId", updateTeam);
    app.delete("/api/team/:teamId", deleteTeam);

    function createTeam(req, res) {
        var userId = req.params.userId;
        var newTeam = req.body;
        newTeam.developerId = userId;

        teamModel
            .createTeam(userId, newTeam)
            .then(
                function(team) {
                    var teamId = team._id;
                    userModel
                        .addTeamIdToUser(teamId, userId)
                        .then(
                            function(response) {
                                res.json(team);
                            },
                            function(error) {
                                res.status(400).send(error);
                            }
                        );
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function findAllTeamsForUser(req, res) {
        var userId = req.params.userId;

        teamModel
            .findAllTeamsForUser(userId)
            .then(
                function(teams) {
                    res.json(teams);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }

    function findTeamById(req, res) {
        var teamId = req.params.teamId;

        teamModel
            .findTeamById(teamId)
            .then(
                function(team) {
                    res.json(team);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }

    function updateTeam(req, res) {
        var team = req.body;
        var teamId = req.params.teamId;

        teamModel
            .updateTeam(teamId, team)
            .then(
                function(team) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to update team with ID " + teamId);
                }
            );
    }

    function deleteTeam(req, res) {
        var teamId = req.params.teamId;

        teamModel
            .findTeamById(teamId)
            .then(
                function(team) {
                    var userId = team._user;

                    return userModel
                        .removeTeamIdFromUser(teamId, userId)
                },
                function(error) {
                    res.status(404).send("Unable to remove team ID " + teamId + " from user");
                }
            ).then(
            function(status) {
                return teamModel
                    .deleteTeam(teamId)
            },
            function(error) {
                res.status(404).send("Unable to delete team " + teamId);
            }
        ).then(
            function(status) {
                res.sendStatus(200);
            },
            function(error) {
                res.status(404).send("Unable to remove team with ID " + teamId);
            }
        )
    }
};