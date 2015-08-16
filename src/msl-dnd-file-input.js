msl_upload.directive('mslDndFileInput', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attributes) {
			var handler = attributes['mslDndFileInput'];
			if (!handler) throw 'msl-dnd-file-input: You should specify a file selection handler';
			if (!scope[handler]) throw 'msl-dnd-file-input: The specified handler doesn\'t exist in your scope';

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
				scope.$apply(function () { scope[handler](files); });
			});
		}
	};
});