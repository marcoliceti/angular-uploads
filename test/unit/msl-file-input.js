describe('Directive msl-file-input', function() {
	var $compile, $rootScope;

	beforeEach(module('msl.upload'));
	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('removes the \'multiple\' attribute if present', function() {
		var handler = 'handler';
		$rootScope[handler] = function () {};
		var element = $compile('<button msl-file-input="' + handler + '" multiple></button>')($rootScope);
		$rootScope.$digest();
		expect(element.attr('multiple')).toBeUndefined();
	});

	it('passes the \'multiple\' attribute (if present) to the appended input', function() {
		var handler = 'handler';
		$rootScope[handler] = function () {};
		var element = $compile('<button msl-file-input="' + handler + '" multiple></button>')($rootScope);
		$rootScope.$digest();
		expect(element.attr('multiple')).toBeFalsy();
		var input = element.children().eq(-1);
		expect(input.attr('multiple')).toBeTruthy();

		var element = $compile('<button msl-file-input="' + handler + '"></button>')($rootScope);
		$rootScope.$digest();
		expect(element.attr('multiple')).toBeFalsy();
		input = element.children().eq(-1);
		expect(input.attr('multiple')).toBeFalsy();
	});

	it('appends a hidden file input', function() {
		var handler = 'handler';
		$rootScope[handler] = function () {};
		var element = $compile('<button msl-file-input="' + handler + '"></button>')($rootScope);
		$rootScope.$digest();
		var input = element.children().eq(-1);
		expect(input.attr('type')).toEqual('file');
		expect(input.css('display')).toEqual('none');
	});

	it('allows to bind a handler for the \'change\' event of the appended input', function() {
		var handler = 'handler';
		$rootScope[handler] = function () {};
		var element = $compile('<button msl-file-input="' + handler + '"></button>')($rootScope);
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

	it('throws if you forget to provide a handler', function() {
		function compileWithoutHandler() {
			$compile('<button msl-file-input></button>')($rootScope);
		}
		expect(compileWithoutHandler).toThrow();
	});

	it('throws if you provide a missing handler', function() {
		function compileMissingHandler() {
			var handler = 'handler';
			$rootScope[handler] = undefined;
			var element = $compile('<button msl-file-input="' + handler + '"></button>')($rootScope);
		}
		expect(compileMissingHandler).toThrow();
	});

	it('when the container is clicked, triggers a click on the appended input', function() {
		var handler = 'handler';
		$rootScope[handler] = function () {};
		var element = $compile('<button msl-file-input="' + handler + '"></button>')($rootScope);
		$rootScope.$digest();
		var input = element.children().eq(-1);
		var click_on_input = spyOnEvent(input, 'click');
		element.triggerHandler('click');
		expect(click_on_input).toHaveBeenTriggered();
	});
});