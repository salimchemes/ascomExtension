var scriptUrl = 'thirdParty/env.js';

  document.addEventListener('DOMContentLoaded', function () {

    var managetrip = document.getElementById('managetrip');
    var env = document.getElementById('env');
    env.innerHTML = "Env: LocalHost";


    //manage trip
    managetrip.addEventListener('click', function () {
      runScript('thirdParty/managetrip.js');
    }, false);


    // env
    env.addEventListener('click', function () {
      // runScript('thirdParty/env.js');
      console.log("Popup DOM fully loaded and parsed");
      //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
      debugger;
      runScript();
    }, false);


  }, false);


var runOnDOM = function () {
  debugger;
  //You can play with your DOM here or check URL against your regex     

  var s = document.createElement('script');
  // TODO: add "script.js" to web_accessible_resources in manifest.json
  s.src = chrome.extension.getURL(scriptUrl);
  s.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
  // console.log(document.getElementsByClassName("server-name fine-print text-center footer-servername")[1].textContent);
}

var runScript = function () {
  chrome.tabs.executeScript({
    code: '(' + runOnDOM + ')();' //argument here is a string but function.toString() returns function's code
  });

}