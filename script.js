angular.module('angularUploadsShowcaseApp', ['ui.bootstrap', 'msl.uploads']).
	controller('MainController', ['$scope', '$timeout', '$interval', function ($scope, $timeout, $interval) {
		$scope.files = [];
		$scope.uploads = [];

		$scope.completed_uploads = {};
		$scope.completed_uploads_ids = [];

		$scope.folder_a = [];
		$scope.folder_b = [];

		$scope.fileSelectionHandler = function (files) {
			for (var i = 0; i < files.length; i++) {
				$scope.files.push(files[i]);
				$scope.uploads.push({
					id: new Date().getTime() + files[i].name, // fake id
					file_name: files[i].name
				});
			}
		};

		$scope.startUploadFor = function (i) {
			var upload = $scope.uploads[i];

			function simulateUpload() {
				upload.completion += 10;
				if (upload.completion === 100) {
					upload.running = false;
					upload.completed = true;
					$scope.completed_uploads[upload.id] = upload;
					$scope.completed_uploads_ids.push(upload.id);
					$scope[upload.id] = upload;
					$interval.cancel(upload.task);
				}
			}

			function randomWait() {
				return Math.max(500, 3000 * Math.random());
			}

			if (!upload.started) {
				upload.start_requested = true;
				$timeout(function () {
					upload.started = true;
					upload.running = true;
					upload.completion = 0;
					upload.task = $interval(simulateUpload, randomWait());
				}, randomWait());
			} else {
				upload.paused = false;
				upload.running = true;
				upload.task = $interval(simulateUpload, randomWait());
			}
		};

		$scope.pauseUploadFor = function (i) {
			var upload = $scope.uploads[i];
			upload.paused = true;
			upload.running = false;
			$interval.cancel(upload.task);
		};

		$scope.completionFor = function (i) {
			return $scope.uploads[i].completion;
		};

		$scope.uploadStartRequestedFor = function (i) {
			return $scope.uploads[i].start_requested;
		};

		$scope.uploadStartedFor = function (i) {
			return $scope.uploads[i].started;
		}

		$scope.uploadRunningFor = function (i) {
			return $scope.uploads[i].running;
		};

		$scope.uploadPausedFor = function (i) {
			return $scope.uploads[i].paused;
		};

		$scope.uploadCompletedFor = function (i) {
			return $scope.uploads[i].completed;
		};

		$scope.cancelUploadFor = function (i) {
			var upload = $scope.uploads[i];
			$interval.cancel(upload.task);
			$scope.uploads.splice(i, 1);
			$scope.files.splice(i, 1);
		};

		var isStartable = function (i) {
			return !$scope.uploadStartRequestedFor(i) || $scope.uploadPausedFor(i);
		};

		var isPausable = function (i) {
			return $scope.uploadRunningFor(i);
		};

		$scope.anyStartable = function () {
			for (var i = 0; i < $scope.uploads.length; i++) if (isStartable(i)) return true;
			return false;
		};

		$scope.anyPausable = function () {
			for (var i = 0; i < $scope.uploads.length; i++) if (isPausable(i)) return true;
			return false;
		};

		$scope.startAll = function () {
			for (var i = 0; i < $scope.uploads.length; i++) if (isStartable(i)) $scope.startUploadFor(i);
		};

		$scope.pauseAll = function () {
			for (var i = 0; i < $scope.uploads.length; i++) if (isPausable(i)) $scope.pauseUploadFor(i);
		};

		$scope.cancelAll = function () {
			for (var i = 0; i < $scope.uploads.length; i++) if (isPausable(i)) $scope.pauseUploadFor(i);
			$scope.files = [];
			$scope.uploads = [];
		};

		$scope.moveIntoA = function (uploaded_file) {
			var name = uploaded_file.file_name;
			if (!($scope.folder_a.indexOf(name) > -1)) $scope.folder_a.push(name);
		};

		$scope.moveIntoB = function (uploaded_file) {
			var name = uploaded_file.file_name;
			if (!($scope.folder_b.indexOf(name) > -1)) $scope.folder_b.push(name);
		};

		$scope.filesInA = function () {
			return $scope.folder_a;
		};

		$scope.filesInB = function () {
			return $scope.folder_b;
		};
	}]);