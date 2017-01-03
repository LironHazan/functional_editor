'use strict';

angular.module('functional_editor')
    .service('editorService', function ($http, Consts) {

        const functions = [];

        // ^((def|function).([a-z1-9A-Z_]*)(\(([a-z1-9A-Z_]*)\,.([a-z1-9A-Z_]*)\)))
        this.validateSyntax = (fnText) => {
            const re = /^((def|function).([a-z1-9A-Z_]*|[a-z1-9A-Z_]*\s)(\((args)\,.(context)\)))/;
            return re.test(fnText);
        };

        this.getListOfFunctions = () => {
            return functions;
        };

        this.save = function(funcObj){ // non arrow func since I'm using 'this' as editorService ...
                functions.push(funcObj);
        };

        this.deploy = (name, data) => {
            return $http({
                method: 'POST',
                url: '/api/deployments/deploy/',
                data: {name: name, lang: 'python', func: encodeURIComponent(data)}
            });
        };

        this.getUploadedFunctions = () => {
            return $http.get('/api/deployments/list');
        };

        // options - predefined configurable preferences
        function initEditor(options){
            const _editor = ace.edit('functionalEditor');
            _editor.setTheme(options.theme);
            _editor.getSession().setMode(options.lang);
            _editor.$blockScrolling = Infinity; //Automatically scrolling cursor into view after selection change this will be disabled in the next version set editor.$blockScrolling = Infinity to disable this message
            return _editor;
        }

        this.getEditor = (options) => {
            return initEditor(options);
        }

});