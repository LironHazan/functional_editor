'use strict';

angular.module('functional_editor')
    .service('editorService', function ($http, Consts, settingsService,  _) {

        //const functions = [];
        const that = this;
        const _editor = ace.edit('functionalEditor');

        this.validateSyntax = (fnText) => {
            const re = /^((def|function).([a-z1-9A-Z_]*|[a-z1-9A-Z_]*\s)(\((args)\,.(context)\)|(\((args,context))\)))/;
            return re.test(fnText);
        };

        this.deploy = (name, data) => {
            return $http({
                method: 'POST',
                url: '/api/deployments/deploy/',
                data: {name: name, lang: 'python', func: encodeURIComponent(data)}
            });
        };

        this.getListOfFunctions = () => {
            return $http.get('/api/deployments/list');
        };

        this.delete = (fname) => {
            return $http({
                method: 'POST',
                url: '/api/deployments/delete',
                data: {fname: fname.name}
            });
        };

        this.initFunction = (editor, text) => {
            editor.setValue(text);
        };
        // options - predefined configurable preferences
        function initEditor(options){
            _editor.setTheme(options.theme);
            _editor.getSession().setMode(options.lang);
            _editor.$blockScrolling = Infinity; //Automatically scrolling cursor into view after selection change this will be disabled in the next version set editor.$blockScrolling = Infinity to disable this message
            const text = '# function name must be main and get args and context as follows: ' +
                '\n' + 'def main(args, context)';
            that.initFunction(_editor, text);
            return _editor;
        }

        this.getEditor = (options) => {
            return initEditor(options);
        };

        this.getEditedText = () =>  {
            let value = _editor.getValue();
            value = value.trim();
            return value;
        };

        this.getFileExtention = () => {
          _.find(Consts.extentions,
            item => {
            let uri = settingsService.getSelectedLang();
            uri = uri.slice(uri.lastIndexOf('/'));
            uri = uri.slice(uri.indexOf('/')+1);
            return item[uri];
        });
      };

});