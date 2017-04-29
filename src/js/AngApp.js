angular.module("AngApp", [])
.controller("defaultCtrl", function($scope,$window,$http) {
	$scope.sendRequest = function () {
		$http.get("../data/items.json").success(function(response) {
			$scope.items = response;
			$window.localStorage.setItem('items', JSON.stringify($scope.items));
		})
	}
	$scope.items = JSON.parse($window.localStorage.getItem('items'));
	if(!$scope.items){
		$scope.items = $scope.sendRequest();
	}
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
			number: $scope.items.length
		});
		$window.localStorage.setItem('items', JSON.stringify($scope.items));	
	}
	$scope.AddCommment = function(){
		item = {
			name: $scope.items[$scope.active-1].name,
			number: $scope.items[$scope.active-1].number,
			comments: $scope.comment
		}
		items.splice($scope.active-1, 1, item);
		$window.localStorage.setItem('items', JSON.stringify($scope.items));
	}      
});