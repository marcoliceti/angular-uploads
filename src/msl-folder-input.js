msl_upload.directive('mslFolderInput', function () {
	function folderUploadAvailable() {
		var dummy = document.createElement('input');
		return 'webkitdirectory' in dummy;
	}

	return {
		restrict: 'A',
		link: function (scope, element, attributes) {
			if (folderUploadAvailable()) {
				element.css('position', 'relative');
				element.append('<input type="file" webkitdirectory style="position: absolute; top: 0; left: 0; opacity: 0; width: 100%; height: 100%;">');
				var hidden_file_input = element.children().eq(-1);
				var handler = attributes['mslFolderInput'];
				if (scope[handler]) hidden_file_input.bind('change', function (event) {
					var files = event.target.files;
					scope.$apply(function () { 
						scope[handler](files);
						event.target.value = null; // reset file input
					});
				});
				/* Required by Internet Explorer :P */
				element.bind('click', function (event) {
					if (event.target.lastChild) event.target.lastChild.click();
				});
			} else {
				element.prop('disabled', true);
			}
		}
	};
});