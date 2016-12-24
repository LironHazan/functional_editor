'use strict';

angular
  .module('functional_editor', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ( $routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'feditor/main.html',
        controller: 'editorCtrl'
      });
      //.when('/...', {
      //  templateUrl: 'feditor/...html',
      //  controller: '...Ctrl'
      //}).otherwise({
      //  redirectTo: '/'
      //});
  });
