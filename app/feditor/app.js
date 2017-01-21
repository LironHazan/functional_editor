'use strict';

angular
  .module('functional_editor', [
    'ngAnimate',
    'toastr',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ( $routeProvider, toastrConfig) {
      angular.extend(toastrConfig, {
          closeButton: true,
          extendedTimeOut: 3000,
          tapToDismiss: false,
          positionClass: 'toast-bottom-right'
      });

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
  }).constant('_',
    window._
);

