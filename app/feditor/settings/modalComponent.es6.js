angular.module('functional_editor').component('modalComponent', {
    templateUrl: 'feditor/settings/myModalContent.html',
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    controller: function () {
        var $ctrl = this;

        $ctrl.ok = function () {
            $ctrl.close({$value: $ctrl.item.name});
        };

        $ctrl.cancel = function () {
            $ctrl.dismiss({$value: 'cancel'});
        };
    }
});