describe('Directive msl-dnd-file-input', function() {
	var $compile, $rootScope;

	beforeEach(module('msl.upload'));
	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('adds a \'msl-drag-over\' class on \'dragover\' events', function() {
		var handler = 'handler';
		$rootScope.handler = function () {};
		var element = $compile('<div msl-dnd-file-input="' + handler + '"></div>')($rootScope);
		$rootScope.$digest();
		
		element.triggerHandler('dragover');
		expect(element.hasClass('msl-drag-over')).toBeTruthy();
	});

	it('removes the \'msl-drag-over\' class on \'dragleave\' events', function() {
		var handler = 'handler';
		$rootScope.handler = function () {};
		var element = $compile('<div msl-dnd-file-input="' + handler + '"></div>')($rootScope);
		$rootScope.$digest();

		element.triggerHandler('dragover');
		expect(element.hasClass('msl-drag-over')).toBeTruthy();
		element.triggerHandler('dragleave');
		expect(element.hasClass('msl-drag-over')).toBeFalsy();
	});

	it('removes the \'msl-drag-over\' class on \'drop\' events', function() {
		var handler = 'handler';
		$rootScope.handler = function () {};
		var element = $compile('<div msl-dnd-file-input="' + handler + '"></div>')($rootScope);
		$rootScope.$digest();

		element.triggerHandler('dragover');
		expect(element.hasClass('msl-drag-over')).toBeTruthy();
		element.triggerHandler($.Event('drop', {
			dataTransfer: {
				files: []
			}
		}));
		expect(element.hasClass('msl-drag-over')).toBeFalsy();
	});

	it('allows to bind a handler for \'drop\' events', function() {
		var handler = 'handler';
		$rootScope.handler = function () {};
		var element = $compile('<div msl-dnd-file-input="' + handler + '"></div>')($rootScope);
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
			$compile('<div msl-dnd-file-input></div>')($rootScope);
		}
		expect(compileWithoutHandler).toThrow();
	});

	it('throws complain if you provide a missing handler', function() {
		function compileWithMissingHandler() {
			var handler = 'handler';
			$rootScope[handler] = undefined;
			$compile('<div msl-dnd-file-input="' + handler + '"></div>')($rootScope);
		}
		expect(compileWithMissingHandler).toThrow();
	});
});