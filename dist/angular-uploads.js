var msl_upload = angular.module('msl.uploads', []);

msl_upload.directive('mslFileInput', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attributes) {
			var handler = attributes['mslFileInput'];
			if (!handler) throw 'msl-file-input: You should specify a file selection handler';
			if (!scope[handler]) throw 'msl-file-input: The specified handler doesn\'t exist in your scope';

			element.removeAttr('multiple');
			element.append('<input type="file" ' + ( attributes['multiple'] ? 'multiple' : '' ) + ' style="display: none;">');
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
		}
	};
});


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

msl_upload.directive('mslDndFolderInput', function () {
	function folderUploadAvailable() {
		var dummy = document.createElement('input');
		return 'webkitdirectory' in dummy;
	}

	return {
		restrict: 'A',
		link: function (scope, element, attributes) {
			var handler = attributes['mslDndFolderInput'];
			if (!handler) throw 'msl-dnd-folder-input: You should specify a folder selection handler';
			if (!scope[handler]) throw 'msl-dnd-folder-input: The specified handler doesn\'t exist in your scope';

			function exploreFolder(item) {
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
			});
		}
	};
});

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