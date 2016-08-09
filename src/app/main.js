angular.module('app', ['ngRoute'])
  .config($routeProvider =>
    $routeProvider
      .otherwise('/'))

  .controller('homeCtrl', function() {
    const home = this
    home.heading = 'Home Title'
  })

  .factory('dataFactory', () => {
    //TODO(adam): load from JSON
    projects = [
      {
        title: '',
        image: '',
        thumb: '',
        description: '',
        source: '',
        live: ''
      }
    ]

    about = {
      short: '',
      long: ''
    }

    resume = {

    }

    return {
      projects,
      about,
      resume
    }
  })
