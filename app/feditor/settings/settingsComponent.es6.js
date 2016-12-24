'use strict';
angular.module('functional_editor')
    .component('settingsComponent', {
        templateUrl: 'feditor/settings/settings.html',
        bindings: {},
        controller: function ($scope, settingsService) {
            const options = settingsService.getPrefs();
            $('.dropdown-toggle').dropdown();

            $scope.themeList = [ 'chrome', 'clouds', 'twilight', 'monokai',
                'cobalt', 'dawn', 'TextMate', 'eclipse'
            ];
            $scope.langList = ['javascript', 'python', 'ruby'];

            $scope.setTheme = (theme) => {
                options.theme = 'ace/theme/' + theme;
                applySelection(options);
            };

            $scope.setLangMode = (lang) => {
                options.lang = 'ace/mode/' + lang;
                applySelection(options);
            };

            function applySelection (options){
                settingsService.setPrefs(options, $scope);
            }
        }
});