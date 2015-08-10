describe('Directive msl-dnd-file-input', function() {
	var $compile, $rootScope;

	beforeEach(module('msl.upload'));
	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('adds a \'msl-drag-over\' class on \'dragover\' events', function() {
		var element = $compile('<div msl-dnd-file-input></div>')($rootScope);
		$rootScope.$digest();
		element.triggerHandler('dragover');
		expect(element.hasClass('msl-drag-over')).toBeTruthy();
	});

	it('removes the \'msl-drag-over\' class on \'dragleave\' events', function() {
		var element = $compile('<div msl-dnd-file-input></div>')($rootScope);
		$rootScope.$digest();
		element.triggerHandler('dragover');
		expect(element.hasClass('msl-drag-over')).toBeTruthy();
		element.triggerHandler('dragleave');
		expect(element.hasClass('msl-drag-over')).toBeFalsy();
	});

	it('removes the \'msl-drag-over\' class on \'drop\' events', function() {
		var element = $compile('<div msl-dnd-file-input></div>')($rootScope);
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
		var element = $compile('<div msl-dnd-file-input="' + handler + '"></div>')($rootScope);
		$rootScope.handler = function () {};
		$rootScope.$digest();
		spyOn($rootScope, handler);
		element.triggerHandler($.Event('drop', {
			dataTransfer: {
				files: ['foo', 'bar', 'baz']
			}
		}));
		expect($rootScope[handler]).toHaveBeenCalledWith(['foo', 'bar', 'baz']);
	});

	it('doesn\'t complain if you don\'t provide a handler', function() {
		var element = $compile('<div msl-dnd-file-input></div>')($rootScope);
		$rootScope.$digest();
		function triggerDrop() {
			element.triggerHandler($.Event('drop', {
				dataTransfer: {
					files: ['foo', 'bar', 'baz']
				}
			}));
		}
		expect(triggerDrop).not.toThrow();
	});

	it('doesn\'t complain if you provide a missing handler', function() {
		var handler = 'handler';
		var element = $compile('<div msl-dnd-file-input="' + handler + '"></div>')($rootScope);
		$rootScope[handler] = undefined;
		$rootScope.$digest();
		function triggerDrop() {
			element.triggerHandler($.Event('drop', {
				dataTransfer: {
					files: ['foo', 'bar', 'baz']
				}
			}));
		}
		expect(triggerDrop).not.toThrow();
	});
});