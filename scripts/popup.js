document.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.getSelected(null, function (tab) {
		showDesktopControls(tab.url);
		showMowControls(tab.url);
	});

	document.getElementById('settings').addEventListener('click', function () { chrome.runtime.openOptionsPage() }, false);
}, false);

var runOnDOM = function (functionToExecute, functionParamsArray) { 
	chrome.tabs.executeScript({
		code: '(' + functionToExecute + ')(' + getRunOnDOMParams(functionParamsArray) + ');' //argument here is a string but function.toString() returns function's code
	});
}

var runOnDOMWithCallback = function (functionToExecute, callback) {
	chrome.tabs.executeScript({
		code: '(' + functionToExecute + ')();' //argument here is a string but function.toString() returns function's code
	}, (results) => { callback(results) });
}

var getRunOnDOMParams = function (functionParamsArray) {
	var params = '';

	if (functionParamsArray !== null && functionParamsArray !== undefined) {
		functionParamsArray.forEach(function(param) {
			if (params !== '') params += ',';
			params += '"' + param + '"';
		});
	}

	return params;
}

var getSettingValue = function (settingKey) {
	var value = localStorage[settingKey];
	if (value == undefined)
		return '';

	return value;
}