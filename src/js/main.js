angular.module("AngApp", [])
.controller("defaultCtrl", function($scope,$window) {
	$scope.items = JSON.parse($window.localStorage.getItem('items'));
	if(!$scope.items){
		$scope.items = [];
	} 
	console.log($scope.items);
	$scope.active = -1;
	$scope.AddItem=function(){
		$scope.items.push({
			name: $scope.item.name,
			comments: [], 
			number: $scope.items.length
		});
		console.log($scope.items);
		$window.localStorage.setItem('items', JSON.stringify($scope.items));	
	}      
});