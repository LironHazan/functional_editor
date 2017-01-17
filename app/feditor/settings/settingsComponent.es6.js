'use strict';
angular.module('functional_editor')
    .component('settingsComponent', {
        templateUrl: 'feditor/settings/settings.html',
        bindings: {},
        controller: function ($scope, $rootScope, settingsService, editorService, $uibModal, $log, functionInfoService, Consts) {
            const $ctrl = this;
            const options = settingsService.getPrefs();
            $scope.editor = editorService.getEditor(options);
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




            // buttons - todo: move to a new component
            $scope.funcObj = functionInfoService.getFunction();

            $scope.newFunction = (editor, funcObj) => {
                const text = 'def main(args, context)';
                editorService.initFunction(editor, text);
                const modalInstance = $uibModal.open({
                    animation: $ctrl.animationsEnabled,
                    component: 'modalComponent'
                });

                modalInstance.result.then(name => {
                    functionInfoService.setFunctionName(funcObj, name);
                    functionInfoService.setFuncObject(funcObj);
                    functionInfoService.setFunctionText(funcObj, editorService.getEditedText());
                    $rootScope.$emit(Consts.events.newFunction, funcObj);
                    editor.focus();
                },  (e) => {
                    $log.info(e);
                });
            };

            $scope.deployFunction = (editor, funcObj) => {
                const fn = funcObj;
                let value = editor.getValue();
                value = value.trim();
                if(editorService.validateSyntax(value)){
                    fn.text = value;
                    // editorService.save(fn);
                    console.log(value);
                    $scope.functions = editorService.getListOfFunctions();
                    editorService.deploy(fn.name, fn.text).then( result => {
                        $rootScope.$emit(Consts.events.newFunction, fn);
                        swal({title:"Niceeeee!" ,text: "The function was deployed" ,timer: 2000,
                            showConfirmButton: false, type:"success"});
                        $log.info(result);
                    }, err => {
                        $log.error(err);
                    });
                }
                else {
                    swal({ title: "Say Whatt?!", text: "Invalid function syntax", type:"error"})
                }
            };

            $scope.clearEditor = (editor) => {
                editor.setValue('');
            };

        }
});