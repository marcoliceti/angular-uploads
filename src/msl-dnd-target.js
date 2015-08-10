msl_upload.directive('mslDndTarget', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attributes) {
			element.bind('dragover', function (event) {
				event.preventDefault(); // otherwise drop won't fire
				element.addClass('msl-drag-over');
			});

			element.bind('dragleave', function (event) {
				element.removeClass('msl-drag-over');
			});

			element.bind('drop', function (event) {
				element.removeClass('msl-drag-over');
				var handler = attributes['mslDndTarget'];
				if (scope[handler]) {
					var data_as_string = event.dataTransfer.getData('text');
					var data = JSON.parse(data_as_string);
					scope.$apply(function () {
						scope[handler](data);
					});
				}
			});
		}
	};
});