'use strict';

angular.module('functional_editor')
  .controller('editorCtrl', function ($scope, $log, $uibModal, editorService, settingsService) {
      const $ctrl = this;
      function fnObj(obj){return obj}

      let editor = editorService.getEditor(settingsService.getPrefs());
      editor.focus();
      $scope.$on('PREFS_CHANGED', () => {editor = editorService.getEditor(settingsService.getPrefs()) });

      $scope.selectFunction = func => {
          editor.setValue(func.text);
          $scope.funcName = func.name;
          $scope.funcBody = func.text;
          editor.focus();
      };

      $scope.deployFunction = () => {
          editorService.deploy($scope.funcName, $scope.funcBody).then((result)=>{
              $log.info(result);
          });
      };

      //for debug use , todo: refactor / remove  later
      editorService.getUploadedFunctions().then((result)=>{
          $log.info(result);
      });

      $scope.saveFunction = fn => {
          const value = editor.getValue();
          if(value !== ""){
              fn.text = value;
              editorService.save(fn);
              console.log(value);
              $scope.functions = editorService.getListOfFunctions();
              swal({title:"Niceeeee!" ,text: "The function was saved" ,timer: 2000,
              showConfirmButton: false, type:"success"});
          }
          else {
              swal({ title: "Say Whatt?!", text: "There's no function to save", type:"error"})
          }

      };

      $scope.clearEditor = () => {
          editor.setValue('');
      };

      $scope.newFunction = () => {
          $scope.clearEditor();
          const modalInstance = $uibModal.open({
              animation: $ctrl.animationsEnabled,
              component: 'modalComponent'
          });

           modalInstance.result.then(name => {
               $scope.funcName = name;
               $scope.funcObj = new fnObj({id:new Date(), name:name});
               editor.focus();
           },  () => {
              $log.info('modal-component dismissed at: ' + new Date());
          });
      };
  });
