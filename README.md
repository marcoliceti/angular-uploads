# angular-uploads

A bunch of [AngularJS](https://angularjs.org/) directives for beautiful upload UIs.

## Showcase

You can see the directives in action [here](https://marcoliceti.github.io/angular-uploads/).

## How to get it

``` bash
npm install angular-uploads
```

`npm` is a package manager distributed with [Node.js](https://nodejs.org/). More info [here](https://docs.npmjs.com/).

If you prefer [Bower](http://bower.io/):

``` bash
bower install msl-angular-uploads
```

## How to develop it

First of all, install the development dependencies. From the project root folder, type:

``` bash
npm install
```

the dependencies will be installed in the `node_modules` folder.

The `src` folder contains a file for each directive, plus a file for the module itself. The `test/unit` folder contains a [Jasmine](http://jasmine.github.io/) unit test for each directive. [Karma](http://karma-runner.github.io/) is used to run these tests:

``` bash
karma start karma-conf.js
```

[Grunt](http://gruntjs.com/) is used to run the tests and (if all tests pass) _build_ the project, i.e. concat all source files and minify the result. You achieve this just by typing:

``` bash
grunt
```

or:

``` bash
grunt test
```

if you just want to run the tests. This is roughly the same as running the test with Karma as shown previously.

The output of the build will be in the `dist` folder, both the minified (`angular-uploads.min.js`) and the un-minified versions (`angular-uploads.js`).

Finally, in the `demo` folder you'll find an example-app for each directive. You may want to take a look at these apps. To avoid failures related to browsers policies about pages served from `file:///`, it's better to use a local HTTP server. Just type from the project root folder:

``` bash
node_modules/http-server/bin/http-server
```
and go to [http://localhost:8080/demo/](http://localhost:8080/demo/).

## How to use it

Include the script in your page, e.g.:

``` html
<script src="node_modules/angular-uploads/dist/angular-uploads.js"></script>
```

and don't forget do declare the `msl.uploads` dependency in your AngularJS app:

``` javascript
angular.module('myApp', ['msl.uploads']);
```

If you clone this repository you'll find a `demo` folder with a small example-app for each directive.
After reading this file, it's a good idea to take a look at these apps too. To avoid failures related
to browsers policies about pages served from `file:///`, it's better to use a local HTTP server. If
you have cloned this repository, you can simply type (from the project root folder):

``` bash
node_modules/http-server/bin/http-server
```
and go to [http://localhost:8080/demo/](http://localhost:8080/demo/).

The directives in the `angular-uploads` package are:

* msl-file-input
* msl-folder-input
* msl-dnd-file-input
* msl-dnd-folder-input
* msl-dnd-item
* msl-dnd-target

### What `msl-file-input` and `msl-folder-input` do

`msl-file-input` and `msl-folder-input` turn an ordinary container element (e.g. a `div` or a `button`) into a file selection component, just like `<input type="file">`, but allow for better CSS styling ([there are no
elegant ways](http://developer.telerik.com/featured/comprehensive-guide-styling-file-inputs/) to customize the look of `<input type="file">`). `msl-file-input` is used to select files. You can select more
than one file if you also use the `multiple` attribute along with the directive. `msl-folder-input` is for folder
selection, i.e. to select all files inside a folder. _This works only on Google Chrome_. On other browsers the
`disabled` attribute will be applied.

### What `msl-dnd-file-input` and `msl-dnd-folder-input` do

`msl-dnd-file-input` and `msl-dnd-folder-input` also turn ordinary container elements into file selection components, but they work through drag and drop. `msl-dnd-file-input` accepts mutiple files.
`msl-dnd-folder-input` recursively select files inside the folders that you drag and drop. _It works only
on Google Chrome_. On other browsers `msl-dnd-folder-input` will behave just like `msl-dnd-file-input`.

### How to use `msl-file-input`, `msl-folder-input`, `msl-dnd-file-input` and `msl-dnd-folder-input`

`msl-file-input`, `msl-folder-input`, `msl-dnd-file-input` and `msl-dnd-folder-input` all require a _file
selection handler_, i.e. a function that will be called when files are selected. This function takes a
[FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList) object containing the selected files. You
expose this function through your controller's scope. For example:

`HTML`

``` html
<button msl-file-input="myHandler">Select file</button>
```

`Javascript / AngularJS Controller`

``` javascript
$scope.myHandler = function (files) {
  // Do something with the files
}
```

### What `msl-dnd-item` and `msl-dnd-target` do

`msl-dnd-item` makes an element _draggable_, and allows to _link_ that element to a scope variable.
`msl-dnd-target` allows to specify a handler function (exposed through your scope) that will be invoked
when the `msl-dnd-item` will be dropped on that `msl-dnd-target`. This function will receive as an
argument the same variable linked to the `msl-dnd-item`.

### How to use `msl-dnd-item` and `msl-dnd-target`

Example:

`HTML`

``` html
<div msl-dnd-item="foo">Foo</div>
<div msl-dnd-target="myHandler">Drag Foo here</div>
```

`Javascript / AngularJS Controller`

``` javascript
$scope.foo = 'bar';

$scope.myHandler = function (arg) {
  console.log(arg); // will print 'bar'
}
```

### Styling on drag over

On drag over `msl-dnd-folder-input` and `msl-dnd-target` will apply a `.msl-drag-over` class for styling purposes. A more elegant solution will be provided in future by [CSS Selectors Level 4](https://www.w3.org/TR/selectors4/#drag-pseudos).

### Additional notes

All directives throw an error if you don't provide the required scope variable / handler function, or if
you provide something that doesn't exist in your scope.
