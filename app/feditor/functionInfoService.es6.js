'use strict';

angular.module('functional_editor')
    .service('functionInfoService', function () {

        const _functionInfoService = this;

        function fnObj() {
            return {
                id: new Date(),
                name : '',
                text: ''
            };
        }


        _functionInfoService.getFunction = () => new fnObj();

         _functionInfoService.setFuncObject = (funcObj) => funcObj;

        _functionInfoService.getFuncObject = () => _functionInfoService.setFuncObject(fnObj());

        _functionInfoService.setFunctionName = (funcObj, name) => funcObj.name = name;

        _functionInfoService.setFunctionText = (funcObj, text) => funcObj.text = text;



        return {

            getFunction : _functionInfoService.getFunction,
            setFunctionName :  _functionInfoService.setFunctionName,
            setFunctionText : _functionInfoService.setFunctionText,
            getFuncObject : _functionInfoService.getFuncObject,
            setFuncObject: _functionInfoService.setFuncObject
        }
    });