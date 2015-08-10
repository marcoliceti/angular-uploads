describe('Directive msl-file-input', function() {
	var path = require('path');

	beforeEach(function() {
		browser.get('http://localhost:8080/demo/msl-folder-input/');
	});

	it('should append a hidden file input to the given container', function() {
		var button = element(by.css('button'));
		var hidden_input = button.element(by.css('input'));

		expect(button.getText()).toEqual('Select folder');

		browser.isElementPresent(hidden_input).then(function (present) {
			if (present) {
				expect(hidden_input.isDisplayed()).toEqual(false);
				expect(hidden_input.getAttribute('webkitdirectory')).not.toBeNull();
			} else {
				expect(button.getAttribute('disabled')).not.toBeNull();
			}
		});
	});

});