msl_upload.directive('mslDndTarget', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attributes) {
			var handler = attributes['mslDndTarget'];
			if (!handler) throw 'msl-dnd-target: You should specify a drop handler';
			if (!scope[handler]) throw 'msl-dnd-target: The specified handler doesn\'t exist in your scope';

			element.bind('dragover', function (event) {
				event.preventDefault(); // otherwise drop won't fire
				element.addClass('msl-drag-over');
			});

			element.bind('dragleave', function (event) {
				element.removeClass('msl-drag-over');
			});

			element.bind('drop', function (event) {
				element.removeClass('msl-drag-over');
				var data_as_string = event.dataTransfer.getData('text');
				var data = JSON.parse(data_as_string);
				scope.$apply(function () {
					scope[handler](data);
				});
			});
		}
	};
});