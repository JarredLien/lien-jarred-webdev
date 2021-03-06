/**
 * Created by Jarred on 7/29/17.
 */
module.exports = function(app, models) {

    var userModel = models.userModel;

    app.get("/api/user", getUsers);
    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user) {
                    if(!user) {
                        userModel
                            .createUser(newUser)
                            .then(
                                function(user) {
                                    res.json(user);
                                },
                                function(error) {
                                    res.status(400).send("Unable to create new user: " + newUser.username);
                                }
                            );
                    }
                    else {
                        res.status(400).send("Username " + newUser.username + " is already in use");
                    }
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }


    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to remove user with ID " + userId);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(
                function(user) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to update user with ID " + userId);
                }
            );
    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(username, password, res);
        }
        else if (username) {
            findUserByUsername(username, res);
        }
        else {
            res.status(403).send("Username and Password not Provided");
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user) {
                        res.json(user);
                    }
                    else {
                        res.status(403).send("Username and Password Not Found");
                    }
                },
                function(error) {
                    res.status(403).send("Unable to login");
                }
            );
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.status(400).send("User with username " + username + " not found");
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }
};