/**
 * Created by Jarred on 8/5/17.
 */
(function () {
    angular
        .module("searchApp", [])
        .controller("searchController", searchController);

    function searchController() {
        var model = this;

        model.searchSport = searchSport;

        function init() {

        }
        init();

        function searchSport() {
            alert("poop");
        }
    }

})();