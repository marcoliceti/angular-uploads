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
		expect(data_transfer.setData).toHaveBeenCalledWith('application/json', JSON.stringify(foo));
	});

	it('won\'t complain if you don\'t provide a scope value', function() {
		var foo = { bar: 'bar' };
		$rootScope.foo = foo;
		var element = $compile('<div msl-dnd-item></div>')($rootScope);
		$rootScope.$digest();
		var data_transfer = {
			setData: function () {}
		};
		spyOn(data_transfer, 'setData');
		element.triggerHandler($.Event('dragstart', {
			dataTransfer: data_transfer
		}));
		expect(data_transfer.setData).not.toHaveBeenCalled();
	});

	it('won\'t complain if you provide a missing scope value', function() {
		var foo = { bar: 'bar' };
		$rootScope.foo = undefined;
		var element = $compile('<div msl-dnd-item></div>')($rootScope);
		$rootScope.$digest();
		var data_transfer = {
			setData: function () {}
		};
		spyOn(data_transfer, 'setData');
		element.triggerHandler($.Event('dragstart', {
			dataTransfer: data_transfer
		}));
		expect(data_transfer.setData).not.toHaveBeenCalled();
	});
});