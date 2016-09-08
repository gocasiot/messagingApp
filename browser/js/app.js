'use strict';

window.app = angular.module('MessageApp', ['ui.bootstrap']);

app.config(function ($locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);

});
