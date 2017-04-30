AngApp = angular.module("AngApp",[])
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
AngApp.controller("defaultCtrl", function($scope,$window,$http) {
	$scope.sendRequest = function () {
		$http.get("../data/items.json").success(function(response) {
			$scope.items = response;
			$window.localStorage.setItem('items', JSON.stringify($scope.items));
		})
	}
	$scope.items = JSON.parse($window.localStorage.getItem('items'));
	//if(!$scope.items){
		$scope.items = $scope.sendRequest();
	//}
	$scope.comments = [];
	$scope.active = -1;
	$scope.$watch('active', function (newVal) {
		if($scope.active>0){
			$scope.comments = $scope.items[newVal-1].comments;
		}
	});
	$scope.AddItem = function(){
		$scope.items.push({
			name: $scope.item.name,
			comments: [], 
			number: $scope.items.length,
			id: Date.now()
		});
		$scope.item.name = "";
		$window.localStorage.setItem('items', JSON.stringify($scope.items));	
	}
	$scope.DeleteItem = function(item){
		number=item.number;
		$scope.items.splice(number,1);
		$scope.items.forEach(function(v,i,a)
			{
				if(i>=number){
					a[i].number=v.number-1;
				}
			});
		if($scope.active==number+1){
			$scope.active=-1;
		}
		$window.localStorage.setItem('items', JSON.stringify($scope.items));
	}
	$scope.AddCommment = function(){
		$scope.items[$scope.active-1].comments.push($scope.comment);
		$window.localStorage.setItem('items', JSON.stringify($scope.items));
		$scope.comment = "";		
	}
});
