/**
 * Created by Jarred on 7/23/17.
 */
(function() {
    angular
        .module("searchApp")
        .factory("TeamService", TeamService);

    function TeamService($http) {

        var api = {
            createTeam: createTeam,
            findTeamsByUser: findTeamsByUser,
            findTeamById: findTeamById,
            updateTeam: updateTeam,
            deleteTeam: deleteTeam
        };
        return api;

        function createTeam(userId, team) {
            return $http.post("/api/user/" + userId + "/team", team);
        }

        function findTeamsByUser(userId) {
            return $http.get("/api/user/" + userId + "/team");
        }

        function findTeamById(teamId) {
            return $http.get("/api/team/" + teamId);
        }

        function updateTeam(teamId, team) {
            return $http.put("/api/team/" + teamId, team);
        }

        function deleteTeam(teamId) {
            return $http.delete("/api/team/" + teamId);
        }
    }
})();