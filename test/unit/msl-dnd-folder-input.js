describe('Directive msl-dnd-folder-input', function() {
	var $compile, $rootScope;

	beforeEach(module('msl.uploads'));
	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	function folderUploadAvailable() {
		var dummy = document.createElement('input');
		return 'webkitdirectory' in dummy;
	}
	var folder_upload_available = folderUploadAvailable();

	function mockWebkitFile(name) {
		return {
			name: name,
			isFile: true,
			file: function (callback) { callback(this.name); },
			webkitGetAsEntry: function () { return this; }
		};
	}
	function mockWebkitDirectory(name) {
		return {
			name: name,
			isDirectory: true,
			content: [],
			createReader: function () {
				var me = this;
				return {
					readEntries: function (callback) { callback(me.content); }
				};
			},
			webkitGetAsEntry: function () { return this; }
		};
	}

	it('adds a \'msl-drag-over\' class on \'dragover\' events', function() {
		var handler = 'handler';
		$rootScope.handler = function () {};
		var element = $compile('<div msl-dnd-folder-input="' + handler + '"></div>')($rootScope);
		$rootScope.$digest();

		element.triggerHandler('dragover');
		expect(element.hasClass('msl-drag-over')).toBeTruthy();
	});

	it('removes the \'msl-drag-over\' class on \'dragleave\' events', function() {
		var handler = 'handler';
		$rootScope.handler = function () {};
		var element = $compile('<div msl-dnd-folder-input="' + handler + '"></div>')($rootScope);
		$rootScope.$digest();

		element.triggerHandler('dragover');
		expect(element.hasClass('msl-drag-over')).toBeTruthy();
		element.triggerHandler('dragleave');
		expect(element.hasClass('msl-drag-over')).toBeFalsy();
	});

	it('removes the \'msl-drag-over\' class on \'drop\' events', function() {
		var handler = 'handler';
		$rootScope.handler = function () {};
		var element = $compile('<div msl-dnd-folder-input="' + handler + '"></div>')($rootScope);
		$rootScope.$digest();

		element.triggerHandler('dragover');
		expect(element.hasClass('msl-drag-over')).toBeTruthy();
		element.triggerHandler($.Event('drop', {
			dataTransfer: {
				items: []
			}
		}));
		expect(element.hasClass('msl-drag-over')).toBeFalsy();
	});

	if (folder_upload_available) it('allows to bind a handler for \'drop\' events', function() {
		var handler = 'handler';
		$rootScope.handler = function () {};
		var element = $compile('<div msl-dnd-folder-input="' + handler + '"></div>')($rootScope);
		$rootScope.$digest();

		spyOn($rootScope, handler);
		var items = [mockWebkitFile('foo')];
		element.triggerHandler($.Event('drop', {
			dataTransfer: {
				items: items
			}
		}));
		expect($rootScope[handler]).toHaveBeenCalledWith(['foo']);
	});

	if (folder_upload_available) it('allows you to select all the content inside a folder', function() {
		var handler = 'handler';
		$rootScope.handler = function () {};
		var element = $compile('<div msl-dnd-folder-input="' + handler + '"></div>')($rootScope);
		$rootScope.$digest();

		spyOn($rootScope, handler);
		var a_dir = mockWebkitDirectory('a_dir');
		a_dir.content.push(mockWebkitFile('foo'));
		a_dir.content.push(mockWebkitFile('bar'));
		var items = [a_dir];
		element.triggerHandler($.Event('drop', {
			dataTransfer: {
				items: items
			}
		}));
		expect($rootScope[handler]).toHaveBeenCalledWith(['foo']);
		expect($rootScope[handler]).toHaveBeenCalledWith(['bar']);
	});

	if (folder_upload_available) it('works even with multiple folders', function() {
		var handler = 'handler';
		$rootScope.handler = function () {};
		var element = $compile('<div msl-dnd-folder-input="' + handler + '"></div>')($rootScope);
		$rootScope.$digest();

		spyOn($rootScope, handler);
		var a_dir = mockWebkitDirectory('a_dir');
		a_dir.content.push(mockWebkitFile('foo'));
		a_dir.content.push(mockWebkitFile('bar'));
		var another_dir = mockWebkitDirectory('another_dir');
		another_dir.content.push(mockWebkitFile('baz'));
		var items = [a_dir, another_dir];
		element.triggerHandler($.Event('drop', {
			dataTransfer: {
				items: items
			}
		}));
		expect($rootScope[handler]).toHaveBeenCalledWith(['foo']);
		expect($rootScope[handler]).toHaveBeenCalledWith(['bar']);
		expect($rootScope[handler]).toHaveBeenCalledWith(['baz']);
	});

	if (folder_upload_available) it('works even with a mix of files and folders', function() {
		var handler = 'handler';
		$rootScope.handler = function () {};
		var element = $compile('<div msl-dnd-folder-input="' + handler + '"></div>')($rootScope);
		$rootScope.$digest();

		spyOn($rootScope, handler);
		var a_dir = mockWebkitDirectory('a_dir');
		a_dir.content.push(mockWebkitFile('foo'));
		a_dir.content.push(mockWebkitFile('bar'));
		var items = [a_dir, mockWebkitFile('baz')];
		element.triggerHandler($.Event('drop', {
			dataTransfer: {
				items: items
			}
		}));
		expect($rootScope[handler]).toHaveBeenCalledWith(['foo']);
		expect($rootScope[handler]).toHaveBeenCalledWith(['bar']);
		expect($rootScope[handler]).toHaveBeenCalledWith(['baz']);
	});

	if (folder_upload_available) it('recursively selects all files inside the folder', function() {
		var handler = 'handler';
		$rootScope.handler = function () {};
		var element = $compile('<div msl-dnd-folder-input="' + handler + '"></div>')($rootScope);
		$rootScope.$digest();

		spyOn($rootScope, handler);
		var a_dir = mockWebkitDirectory('a_dir');
		var another_dir = mockWebkitDirectory('another_dir');
		another_dir.content.push(mockWebkitFile('baz'));
		a_dir.content.push(another_dir);
		var items = [a_dir];
		element.triggerHandler($.Event('drop', {
			dataTransfer: {
				items: items
			}
		}));
		expect($rootScope[handler]).toHaveBeenCalledWith(['baz']);
	});

	if (!folder_upload_available) it('can behave like \'msl-dnd-file-input\' when the browser lacks folder upload support', function() {
		var handler = 'handler';
		$rootScope.handler = function () {};
		var element = $compile('<div msl-dnd-folder-input="' + handler + '"></div>')($rootScope);
		$rootScope.$digest();

		spyOn($rootScope, handler);
		element.triggerHandler($.Event('drop', {
			dataTransfer: {
				files: ['foo', 'bar', 'baz']
			}
		}));
		expect($rootScope[handler]).toHaveBeenCalledWith(['foo', 'bar', 'baz']);
	});

	it('throws if you don\'t provide a handler', function() {
		function compileWithoutHandler() {
			$compile('<div msl-dnd-folder-input></div>')($rootScope);
		}
		expect(compileWithoutHandler).toThrow();
	});

	it('throws if you provide a missing handler', function() {
		function compileWithMissingHandler() {
			var handler = 'handler';
			$rootScope[handler] = undefined;
			$compile('<div msl-dnd-folder-input="' + handler + '"></div>')($rootScope);
		}
		expect(compileWithMissingHandler).toThrow();
	});
});