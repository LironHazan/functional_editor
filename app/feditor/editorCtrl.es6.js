'use strict';

angular.module('functional_editor')
  .controller('editorCtrl', function ($scope, $rootScope, Consts, $log, $uibModal, editorService, settingsService, functionInfoService, $timeout) {

      let editor = editorService.getEditor(settingsService.getPrefs());
      editor.focus();
      $scope.$on(Consts.events.prefsChanged, () => {
          editor = editorService.getEditor(settingsService.getPrefs());
          $scope.fileExt = editorService.getFileExtention()
      });

      $rootScope.$on(Consts.events.newFunction, (event, fnObj) => {
          $scope.funcName = fnObj.name;
          $scope.funcObj = fnObj;
          initListOfFunctions();
      });

      $scope.selectFunction = func => {
          editor.setValue(func.code);
          $scope.funcName = func.name;
          functionInfoService.setFunctionText(func, editorService.getEditedText());
          $scope.funcBody = func.text;
          editor.focus();
      };

      function initListOfFunctions(){
          editorService.getListOfFunctions().then((result)=>{
              result.data.forEach( item => {
                  item.code = decodeURIComponent(item.code);
              });
              $scope.functions = result.data;
          });
      }

      initListOfFunctions();

  });
