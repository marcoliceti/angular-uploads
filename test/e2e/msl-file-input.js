describe('Directive msl-file-input', function() {
	var path = require('path');

	beforeEach(function() {
    browser.get('http://localhost:8080/demo/msl-file-input/');
  });

	it('should append a hidden file input to the given container', function() {
		var button = element(by.css('button'));
		var hidden_input = button.element(by.css('input'));

		expect(button.getText()).toEqual('Select files');
		expect(hidden_input.isDisplayed()).toEqual(false);
		expect(button.getAttribute('multiple')).toBeNull();
		expect(hidden_input.getAttribute('multiple')).not.toBeNull();
	});

});