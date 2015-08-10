describe('Directive msl-folder-input', function() {
	var $compile, $rootScope;

	beforeEach(module('msl.upload'));
	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	function folderUploadAvailable() {
		var dummy = document.createElement('input');
		return 'webkitdirectory' in dummy;
	}

	var folder_upload_available = folderUploadAvailable();

	if (folder_upload_available) it('appends a hidden file input', function() {
		var element = $compile('<button msl-folder-input></button>')($rootScope);
		$rootScope.$digest();
		var input = element.children().eq(-1);
		expect(input.prop('type')).toEqual('file');
		expect(input.css('display')).toEqual('none');
	});

	if (folder_upload_available) it('appends a hidden file input with \'webkitdirectory\' attribute (that enables folder selection)', function() {
		var element = $compile('<button msl-folder-input></button>')($rootScope);
		$rootScope.$digest();
		var input = element.children().eq(-1);
		expect(input.prop('webkitdirectory')).not.toBeUndefined();
	});

	if (folder_upload_available) it('allows to bind a handler for the \'change\' event of the appended input', function() {
		var handler = 'handler';
		$rootScope[handler] = function () {};
		var element = $compile('<button msl-folder-input="' + handler + '"></button>')($rootScope);
		$rootScope.$digest();

		spyOn($rootScope, handler);
		var input = element.children().eq(-1);
		input.triggerHandler('change');
		expect($rootScope[handler]).toHaveBeenCalledWith(jasmine.any(FileList));

		input.triggerHandler($.Event('change', {
			target: {
				files: ['foo', 'bar', 'baz']
			}
		}));
		expect($rootScope[handler]).toHaveBeenCalledWith(['foo', 'bar', 'baz']);
	});

	if (folder_upload_available) it('doesn\'t complain if you forget to provide a handler', function() {
		var element = $compile('<button msl-folder-input></button>')($rootScope);
		$rootScope.$digest();
		var input = element.children().eq(-1);
		function triggerChange() {
			input.triggerHandler('change');
		}
		expect(triggerChange).not.toThrow();
	});

	if (folder_upload_available) it('doesn\'t complain if you provide a missing handler', function() {
		var handler = 'handler';
		$rootScope[handler] = undefined;
		var element = $compile('<button msl-folder-input="' + handler + '"></button>')($rootScope);
		$rootScope.$digest();
		var input = element.children().eq(-1);
		function triggerChange() {
			input.triggerHandler('change');
		}
		expect(triggerChange).not.toThrow();
	});

	if (folder_upload_available) it('when the container is clicked, triggers a click on the appended input (IE compatibility)', function() {
		var element = $compile('<button msl-folder-input></button>')($rootScope);
		$rootScope.$digest();
		var input = element.children().eq(-1);
		var click_on_input = spyOnEvent(input, 'click');
		element.triggerHandler('click');
		expect(click_on_input).toHaveBeenTriggered();
	});

	if (!folder_upload_available) it('just sets the element disabled if folder upload is not available on current browser', function() {
		var element = $compile('<button msl-folder-input></button>')($rootScope);
		$rootScope.$digest();
		expect(element.prop('disabled')).toBeTruthy();
	});

	if (!folder_upload_available) it('just sets the element disabled if folder upload is not available on current browser', function() {
		var element = $compile('<button msl-folder-input></button>')($rootScope);
		$rootScope.$digest();
		expect(element.prop('disabled')).toBeTruthy();
	});
});