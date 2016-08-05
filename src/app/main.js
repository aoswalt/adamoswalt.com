angular.module('app', ['ngRoute'])
  .config($routeProvider =>
    $routeProvider
      .otherwise('/'))

  .controller('homeCtrl', function() {
    const home = this;
    home.heading = 'Home Title'
  })
