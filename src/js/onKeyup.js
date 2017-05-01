AngApp.directive('onKeyup', function() {
    return function(scope, elm, attrs) {
        function applyKeyup() {
          scope.$apply(attrs.onKeyup);
        };           
        var allowedKeys = scope.$eval(attrs.keys);
        console.log(allowedKeys);
        elm.bind('keyup', function(evt){
            if (allowedKeys == evt.which) {
               	applyKeyup();
            }
        });
    };
});