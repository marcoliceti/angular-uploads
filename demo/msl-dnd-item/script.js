var app = angular.module('mslDndItemDemoApp', ['msl.upload']);

app.controller('DemoController', ['$scope', function ($scope) {
	$scope.john = {
		first_name: 'John',
		last_name: 'Doe'
	};
	$scope.jane = {
		first_name: 'Jane',
		last_name: 'Doe'
	};

	$scope.persons = [];

	$scope.addPerson = function (person) {
		$scope.persons.push(person);
	};
}]);