describe('Directive msl-dnd-item', function() {
	var $compile, $rootScope;

	beforeEach(module('msl.upload'));
	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('on \'dragstart\' sets the \'event.dataTransfer\' property with the JSON representation of the indicated scope value', function() {
		var foo = { bar: 'bar' };
		$rootScope.foo = foo;
		var element = $compile('<div msl-dnd-item="foo"></div>')($rootScope);
		$rootScope.$digest();
		var data_transfer = {
			setData: function () {}
		};
		spyOn(data_transfer, 'setData');
		element.triggerHandler($.Event('dragstart', {
			dataTransfer: data_transfer
		}));
		expect(data_transfer.setData).toHaveBeenCalledWith('text', JSON.stringify(foo));
	});

	it('throws if you don\'t provide a scope variable', function() {
		function compileWithoutVariable() {
			$compile('<div msl-dnd-item></div>')($rootScope);
		}
		expect(compileWithoutVariable).toThrow();
	});

	it('throws if you provide a missing scope variable', function() {
		function compileWithMissingVariable() {
			$rootScope.foo = undefined;
			$compile('<div msl-dnd-item="foo"></div>')($rootScope);
		}
		expect(compileWithMissingVariable).toThrow();
	});
});