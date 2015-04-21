'use strict';

/* App Module */

var groupScreenApp = angular.module('groupScreenApp', [
  'ngRoute',
  'groupScreenCtrls'
]);

groupScreenApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'DashboardCtrl'
      }).
      when('/dashboard/group/:groupId', {
        templateUrl: 'partials/group.html',
        controller: 'GroupCtrl'
      }).
      otherwise({
        redirectTo: '/dashboard'
      });
  }]);
