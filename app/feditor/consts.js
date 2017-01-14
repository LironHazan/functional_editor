'use strict';

angular.module('functional_editor')
    .constant('Consts', {
        extentions: [{javascript:'.js', python: '.py', ruby:'.rb'}],
        events : {
           newFunction : 'NEW_FUNCTION',
           prefsChanged : 'PREFS_CHANGED'
        }
});