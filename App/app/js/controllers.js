'use strict';

/* Controllers */
var groupScreenCtrls =  angular.module('groupScreenCtrls', ['firebase','mediaPlayer','spotify']);

groupScreenCtrls.controller('DashboardCtrl', function($scope, $location, $firebaseArray){


$scope.submit = function() {
  var url = '/dashboard/group/'+$scope.groupId;
  var dataExists = false;

  //TODO: Here we are checking if data for the object music is available...
  //later we have to check if the group-object itself is available
  var music = new Firebase('https://shining-fire-8634.firebaseio.com/' + $scope.groupId + '/music/playlist'); 
  $scope.music = $firebaseArray(music);
  $scope.music.$loaded(function() {
    dataExists = $scope.music.length;
    if(dataExists != 0) {
      $location.path(url);
    } else {
      window.alert("Invalid Groupid");
    }
  }); 
}
});




groupScreenCtrls.controller('GroupCtrl', function($scope, $routeParams, $http, $firebaseArray,Spotify) {

  $scope.gruppenId = $routeParams.groupId;
  var musicUrl = new Firebase('https://shining-fire-8634.firebaseio.com/' + $scope.gruppenId + '/music'); 
  var playlistUrl = new Firebase('https://shining-fire-8634.firebaseio.com/' + $scope.gruppenId + '/music/playlist');

  $scope.music = $firebaseArray(playlistUrl);

  $scope.querySoundCloud = function() {
    var url  =  'http://gdata.youtube.com/feeds/api/videos?q=';
    url += $scope.musicValue;
    url += ' &start-index=21&max-results=10&v=2&alt=json';

    $http.get(url)
    .success(function(data) {
      $scope.youtubeEntries = data.feed.entry;
    });
  }

  $scope.addSong = function(item) {
    $scope.music.$add({
      title: item.media$group.media$title.$t,
      url: item.link[0].href
    });

    $scope.musicValue = "";
    $scope.youtubeEntries = "";
  }

  $scope.removeSong = function(item) {
    $scope.music.$remove(item);
  }

  $scope.mySpecialPlayButton = function () {
    $scope.audio1.play();
    Spotify.search('teen', 'track').then(function (data) {
  console.log(data);
});
  }
  
  $scope.mySpecialPlayButton2 = function () {
    $scope.audio1.pause();
    Spotify.getTrack('4hy4fb5D1KL50b3sng9cjw').then(function (data) {
  console.log(data);
});
  }


});