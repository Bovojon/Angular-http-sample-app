(function() {
  'use strict';

  angular
    .module('fastr', [])
    .controller('FastrController', FastrController);

  FastrController.$inject = ["$scope", "$http"];               // Declare dependencies on both the scope object and the http service.
  function FastrController($scope, $http) {
    // $watch registers a listener callback to be executed whenever the watchExpression ('search') changes.
    $scope.$watch('search', function(){
      fetch();
    });

    $scope.search = "Sherlock Holmes";

    function fetch() {
      $http
        .get("https://www.omdbapi.com/?t="+$scope.search + "&tomatoes=true&plot=full")
        .then(function(response) {
          $scope.details = response.data;
        });

      $http
        .get("https://www.omdbapi.com/?s="+$scope.search)
        .then(function(response) {
          $scope.related = response.data;
        });
    }

    // update function will be used in view, hence use $scope.update
    $scope.update = function(movie) {
      $scope.search = movie.Title;
    };                                      // function expression so need to close it with semi-colon

    $scope.select = function() {
      this.setSelectionRange(0, this.value.length);
    }


  }
})();
