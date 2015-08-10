msl_upload.directive('mslFileInput', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attributes) {
			element.removeAttr('multiple');
			element.css('position', 'relative');
			element.append('<input type="file" ' + ( attributes['multiple'] ? 'multiple' : '' ) + ' style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0;">');
			var hidden_file_input = element.children().eq(-1);
			var handler = attributes['mslFileInput'];
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
		}
	};
});