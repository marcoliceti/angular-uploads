msl_upload.directive('mslDndItem', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attributes) {
			element.prop('draggable', true);
			var binded_object_name = attributes['mslDndItem'];
			var binded_object = scope[binded_object_name];
			if (binded_object) element.bind('dragstart', function (event) {
				var as_json = JSON.stringify(binded_object);
				event.dataTransfer.setData('application/json', as_json);
			});
		}
	};
});