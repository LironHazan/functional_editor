angular.module('functional_editor').component('modalComponent', {
    templateUrl: 'feditor/myModalContent.html',
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    controller: function (settingsService, $scope) {
        var $ctrl = this;

        $ctrl.ok = function () {
            setLangMode();
            $ctrl.close({$value: $ctrl.item.name});
        };

/*
        $ctrl.cancel = function () {
            $ctrl.dismiss({$value: 'cancel'});
        };
*/
        $scope.langList = ['javascript', 'python', 'ruby'];
        $scope.lang = $scope.langList[1];
        function applySelection (options){
            settingsService.setPrefs(options, $scope);
        }
        const options = settingsService.getPrefs();
        function setLangMode (){
            options.lang = 'ace/mode/' + $scope.lang;
            applySelection(options);
        }
    }
});