msl_upload.directive('mslDndItem', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attributes) {
			var binded_object_name = attributes['mslDndItem'];
			if (!binded_object_name) throw 'msl-dnd-item: You should specify a scope variable';
			var binded_object = scope[binded_object_name];
			if (!binded_object) throw 'msl-dnd-item: The specified scope variable doesn\'t exist';

			element.prop('draggable', true);
			element.bind('dragstart', function (event) {
				var as_json = JSON.stringify(binded_object);
				event.dataTransfer.setData('text', as_json);
			});
		}
	};
});