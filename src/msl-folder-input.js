msl_upload.directive('mslFolderInput', function () {
	function folderUploadAvailable() {
		var dummy = document.createElement('input');
		return 'webkitdirectory' in dummy;
	}

	return {
		restrict: 'A',
		link: function (scope, element, attributes) {
			if (folderUploadAvailable()) {
				element.append('<input type="file" webkitdirectory style="display: none;">');
				var hidden_file_input = element.children().eq(-1);
				var handler = attributes['mslFolderInput'];
				if (scope[handler]) hidden_file_input.bind('change', function (event) {
					var files = event.target.files;
					scope.$apply(function () { 
						scope[handler](files);
						event.target.value = null; // reset file input
					});
				});
				element.bind('click', function (event) {
					if (event.target.lastChild) event.target.lastChild.click();
				});
			} else {
				element.prop('disabled', true);
			}
		}
	};
});