msl_upload.directive('mslDndFolderInput', function () {
	function folderUploadAvailable() {
		var dummy = document.createElement('input');
		return 'webkitdirectory' in dummy;
	}

	return {
		restrict: 'A',
		link: function (scope, element, attributes) {
			function exploreFolder(item) {
				var handler = attributes['mslDndFolderInput'];
				if (item.isFile) {
					item.file(function (file) {
						scope.$apply(function () { scope[handler]([file]); });
					});
				} else if (item.isDirectory) {
					var directory_reader = item.createReader();
			    	directory_reader.readEntries(function(entries) {
						for (var i = 0; i < entries.length; i++) {
							var entry = entries[i];
							exploreFolder(entry);
						}
    				});
				}
			};

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
				var handler = attributes['mslDndFolderInput'];
				if (scope[handler]) {
					if (folderUploadAvailable()) {
						var roots = event.dataTransfer.items;
						for (var i = 0; i < roots.length; i++) {
							var root = roots[i].webkitGetAsEntry();
							exploreFolder(root);
						}
					} else {
						var files = event.dataTransfer.files;
						scope.$apply(function () { scope[handler](files); });
					}
				}
			});
		}
	};
});