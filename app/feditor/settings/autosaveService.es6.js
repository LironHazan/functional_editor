'use strict';
angular.module('Composer').service('AutosaveService', function ($interval, $log, editorService, functionInfoService) {


    let stop;
    let savePromise;
    let cp;

    this.cancelablePromise = (promise) => {
        let hasCanceled = false;
        const wrappedPromise = new Promise((resolve, reject) => {
            promise.then((val) => hasCanceled ? reject({isCanceled: true}) : resolve(val));
            promise.catch((error) => hasCanceled ? reject({isCanceled: true}) : reject(error));
        });
        return {
            promise: wrappedPromise,
            cancel() {
                hasCanceled = true;
            }
        };
    };


    this.setAutosave = (timeout) => {
        stop = $interval(() => {
                cp =  this.cancelablePromise (
                    () => {
                        return new Promise.resolve(
                            functionInfoService.setFunctionText(funcObj, editorService.getEditedText())
                        )
                    }
                );
                savePromise = cp.promise.then(()=> {
                    if (!savePromise.isCanceled){
                        this.setAutosave(timeout);
                    }
                }).catch(e =>{
                    $log.error(e);
                });

        }, '15000');
    };

    this.stopAutosave = () => {
        $interval.cancel(stop);
        if (savePromise) {
            cp.cancel();
        }
    };
});