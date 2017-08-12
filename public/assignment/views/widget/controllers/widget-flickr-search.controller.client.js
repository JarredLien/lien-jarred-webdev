/**
 * Created by Jarred on 8/8/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($location, $routeParams, FlickrService, WidgetService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        function searchPhotos(searchText) {
            var promise = FlickrService.searchPhotos(searchText);
            promise
                .then(
                    function (response) {
                        data = response.data.replace("jsonFlickrApi(", "");
                        data = data.substring(0, data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    },
                    function (error) {
                        vm.error = error.data
                    }
                )
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var promise = WidgetService.findWidgetById(vm.wgid);
            promise
                .then(
                    function (response) {
                        requestUpdateFlickrImage(response, url)
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        // internal helper function for selectPhoto
        function requestUpdateFlickrImage(response, url) {
            var widget = response.data;
            widget.url = url;
            var promise = WidgetService.updateWidget(vm.wgid, widget);
            promise
                .then(
                    function (response) {
                        vm.success = "Added Flickr Image";
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.wgid);

                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )
        }
    }
})();