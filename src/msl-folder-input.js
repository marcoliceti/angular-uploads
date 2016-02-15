msl_upload.directive('mslFolderInput', function () {
	function folderUploadAvailable() {
		var dummy = document.createElement('input');
		return 'webkitdirectory' in dummy;
	}

	return {
		restrict: 'A',
		link: function (scope, element, attributes) {
			var handler = attributes['mslFolderInput'];
			if (!handler) throw 'msl-folder-input: You should specify a folder selection handler';
			if (!scope[handler]) throw 'msl-folder-input: The specified handler doesn\'t exist in your scope';

			if (folderUploadAvailable()) {
				element.append('<input type="file" webkitdirectory style="display: none;">');
				var hidden_file_input = element.children().eq(-1);
				hidden_file_input.bind('change', function (event) {
					var files = event.target.files;
					scope.$apply(function () {
						scope[handler](files);
						event.target.value = null; // reset file input
					});
				});
				element.bind('click', function (event) {
					hidden_file_input[0].click();
				});
			} else {
				element.prop('disabled', true);
			}
		}
	};
});
