'use strict';

angular.module('functional_editor')
  .controller('editorCtrl', function ($scope, $log, $uibModal, editorService, settingsService) {
      const $ctrl = this;
      function fnObj(obj){return obj}
      $scope.hasName = false;

      let editor = editorService.getEditor(settingsService.getPrefs());
      editor.focus();
      $scope.$on('PREFS_CHANGED', () => {editor = editorService.getEditor(settingsService.getPrefs()) });

      $scope.selectFunction = func => {
          editor.setValue(func.text);
          $scope.funcName = func.name;
          $scope.funcBody = func.text;
          editor.focus();
      };

      $scope.deployFunction = fn => {
          let value = editor.getValue();
          value = value.trim();
          if(editorService.validateSyntax(value)){
              fn.text = value;
             // editorService.save(fn);
              console.log(value);
              $scope.functions = editorService.getListOfFunctions();
              editorService.deploy(fn.name, fn.text).then( result => {
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

      //for debug use , todo: refactor / remove  later
      editorService.getUploadedFunctions().then((result)=>{
          $log.info(result);
      });

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
               $scope.hasName = true;
               $scope.funcObj = new fnObj({id:new Date(), name:name});
               editorService.save($scope.funcObj);
               $scope.functions = editorService.getListOfFunctions();
               editor.focus();
           },  () => {
              $log.info('modal-component dismissed at: ' + new Date());
          });
      };
  });
