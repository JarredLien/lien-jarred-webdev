/**
 * Created by Jarred on 7/29/17.
 */
module.exports = function(app) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get("/api/user", getAllUsers); // findUserByUsername or findUserByCredentials
    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;

        for(var u in users) {
            if(users[u].username === newUser.username) {
                res.status(400).send("Username " + newUser.username + " is already in use");
                return;
            }
        }

        newUser._id = (new Date()).getTime() + "";
        users.push(newUser);
        res.json(newUser);
    }


    function deleteUser(req, res) {
        var id = req.params.userId;
        for(var u in users) {
            if(users[u]._id === id) {
                users.splice(u, 1);
                res.sendStatus(200);
                return true;
            }
        }
        res.status(404).send("Unable to remove user with ID " + id);
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        for(var u in users) {
            if(users[u]._id == id) {
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                users[u].email = newUser.email;
                res.sendStatus(200);
                return true;
            }
        }
        res.status(400).send("User with ID " + id + " not found");
    }

    function getAllUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(username, password, res);
        }
        else if (username) {
            findUserByUsername(username, res);
        }
        else {
            res.send(users);
        }
    }

    function findUserByCredentials(username, password, res) {
        for(var u in users) {
            if(users[u].username === username && users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(403);
    }

    function findUserByUsername(username, res) {
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.status(400).send("User with username " + username + " not found");
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        for(var u in users) {
            if(users[u]._id === userId) {
                res.send(users[u]);
                return;
            }
        }
        res.status(400).send("User with ID " + userId + " not found");
    }
};