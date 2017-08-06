/**
 * Created by Jarred on 8/5/17.
 */
(function () {
    angular
        .module("searchApp", ["ngRoute"])
        .controller("searchController", searchController)
        .service("sportService", sportService);

    function searchController(sportService) {
        var model = this;

        model.searchSport = searchSport;

        function init() {

        }

        init();

        function searchSport(sport) {
            sportService.searchSport(sport);
        }
    }

    function sportService($http) {
        this.searchSport = searchSport;

        function searchSport(sport) {
            // var url = URI("http://api.sportradar.us/nfl-ot2/seasontd/2016/standings.xml?api_key=qhr3qrja8x92gdj8uy7ruaz6");
            return $http.get('http://api.sportradar.us/nfl-ot2/seasontd/2016/standings.xml?api_key=qhr3qrja8x92gdj8uy7ruaz6');
        }
    }

})();