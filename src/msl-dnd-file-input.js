msl_upload.directive('mslDndFileInput', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attributes) {
			element.bind('dragover', function (event) {
				event.preventDefault();
				element.addClass('msl-drag-over');
			});
			element.bind('dragleave', function (event) {
				element.removeClass('msl-drag-over');
			});
			element.bind('drop', function (event) {
				event.preventDefault();
				element.removeClass('msl-drag-over');
				var handler = attributes['mslDndFileInput'];
				var files = event.dataTransfer.files;
				if (scope[handler]) scope.$apply(function () { scope[handler](files); });
			});
		}
	};
});