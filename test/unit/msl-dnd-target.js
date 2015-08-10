describe('Directive msl-dnd-target', function() {
	var $compile, $rootScope;

	beforeEach(module('msl.upload'));
	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('on \'dragover\' adds a \'msl-drag-over\' class', function() {
		var element = $compile('<div msl-dnd-target></div>')($rootScope);
		$rootScope.$digest();
		element.triggerHandler('dragover');
		expect(element.hasClass('msl-drag-over')).toBeTruthy();
	});

	it('on \'dragleave\' removes the \'msl-drag-over\' class', function() {
		var element = $compile('<div msl-dnd-target></div>')($rootScope);
		$rootScope.$digest();
		element.triggerHandler('dragover');
		expect(element.hasClass('msl-drag-over')).toBeTruthy();
		element.triggerHandler('dragleave');
		expect(element.hasClass('msl-drag-over')).toBeFalsy();
	});

	it('on \'drop\' removes the \'msl-drag-over\' class', function() {
		var element = $compile('<div msl-dnd-target></div>')($rootScope);
		$rootScope.$digest();
		element.triggerHandler('dragover');
		expect(element.hasClass('msl-drag-over')).toBeTruthy();
		element.triggerHandler($.Event('drop', {
			dataTransfer: {
				getData: function () { return null; }
			}
		}));
		expect(element.hasClass('msl-drag-over')).toBeFalsy();
	});

	it('on \'drop\' removes the \'msl-drag-over\' class', function() {
		var element = $compile('<div msl-dnd-target></div>')($rootScope);
		$rootScope.$digest();
		element.triggerHandler('dragover');
		expect(element.hasClass('msl-drag-over')).toBeTruthy();
		element.triggerHandler($.Event('drop', {
			dataTransfer: {
				getData: function () { return null; }
			}
		}));
		expect(element.hasClass('msl-drag-over')).toBeFalsy();
	});

	it('on \'drop\' invokes the provided handler', function() {
		var handler = 'handler';
		var element = $compile('<div msl-dnd-target="' + handler + '"></div>')($rootScope);
		$rootScope[handler] = function () {};
		$rootScope.$digest();
		spyOn($rootScope, handler);
		var foo = { bar: 'bar' };
		element.triggerHandler($.Event('drop', {
			dataTransfer: {
				getData: function () { return JSON.stringify(foo); }
			}
		}));
		expect($rootScope[handler]).toHaveBeenCalledWith({ bar: 'bar' });
	});

	it('won\'t complain if you don\'t provide a handler', function() {
		var element = $compile('<div msl-dnd-target></div>')($rootScope);
		$rootScope.$digest();
		function triggerDrop() {
			var foo = { bar: 'bar' };
			element.triggerHandler($.Event('drop', {
				dataTransfer: {
					getData: function () { return JSON.stringify(foo); }
				}
			}));
		}
		expect(triggerDrop).not.toThrow();
	});

	it('won\'t complain if you provide a missing handler', function() {
		var handler = 'handler';
		var element = $compile('<div msl-dnd-target="' + handler + '"></div>')($rootScope);
		$rootScope[handler] = undefined;
		$rootScope.$digest();
		function triggerDrop() {
			var foo = { bar: 'bar' };
			element.triggerHandler($.Event('drop', {
				dataTransfer: {
					getData: function () { return JSON.stringify(foo); }
				}
			}));
		}
		expect(triggerDrop).not.toThrow();
	});
});