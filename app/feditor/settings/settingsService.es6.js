'use strict';

angular.module('functional_editor')
    .service('settingsService', function (Consts) {
        const _this = this;
        const options = {theme:'ace/theme/chrome', lang:'ace/mode/ruby'};

        this.setPrefs = (options, scope) => {
            options.theme = options.theme || 'ace/theme/chrome';
            options.lang = options.lang || 'ace/mode/javascript';
            scope.$emit(Consts.events.prefsChanged)
        };

        this.getSelectedLang = () => options.lang;

        this.getPrefs = () => options;
});