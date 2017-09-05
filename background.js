chrome.tabs.onUpdated.addListener(function (tabId, info) {
    console.log(tabId)
    if (info.status === 'complete') {

        runOnDOMWithCallback(functionGetEnvironment, functionSetEnvironment);
    }
});

var runOnDOMWithCallback = function (functionToExecute, callback) {
    chrome.tabs.executeScript({
        code: '(' + functionToExecute + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => { callback(results[0]) });
}


// Env
var functionGetEnvironment = function () {
    if ($('.footer-servername').length === 0)
        return '';

    return $('.footer-servername').text();
}
var functionSetEnvironment = function (result) {
    result = getShortName(result);
    chrome.browserAction.setBadgeText({ text: result });
}

var getShortName = function (longName) {
    if (longName.indexOf("AL_") != -1)
        return longName.replace("L_", "").toLower();
    if (longName.indexOf("SQ") != -1)
        return longName.replace("Q", "").toLower();
    if (longName.indexOf("server") != -1 ||longName.indexOf("seav") != -1  )
        return "box";
    else
        return "prod"; 
}
