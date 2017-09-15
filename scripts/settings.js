var defaultPaxFirstName = "Dev";
var defaultPaxEmail = "tester@alaskaair.com";
var defaultCreditCard = "1111";
var defaultDepCity = "SEA";
var defaultArrCity = "DCA";
var defaultDaysToAdd = "45";

document.addEventListener('DOMContentLoaded', function () {
	loadSettings();

	document.getElementById('save').addEventListener('click', saveSettings, false);
	document.getElementById('restore').addEventListener('click', restoreDefaultSettings, false);
}, false);

function loadSettings() {
	var paxFirstName = localStorage["paxFirstName"];
	var paxEmail = localStorage["paxEmail"];
	var creditCard = localStorage["creditCard"];
	var depCity = localStorage["depCity"];
	var arrCity = localStorage["arrCity"];
	var daysToAdd = localStorage["daysToAdd"];

	if (paxFirstName == undefined) paxFirstName = defaultPaxFirstName;
	if (paxEmail == undefined) paxEmail = defaultPaxEmail;
	if (creditCard == undefined) creditCard = defaultCreditCard;
	if (depCity == undefined) depCity = defaultDepCity;
	if (arrCity == undefined) arrCity = defaultArrCity;
	if (daysToAdd == undefined) daysToAdd = defaultDaysToAdd;

	document.getElementById('paxFirstName').value = paxFirstName;
	document.getElementById('paxEmail').value = paxEmail;
	document.getElementById('creditCardNumber').value = creditCard;
	document.getElementById('depCity').value = depCity;
	document.getElementById('arrCity').value = arrCity;
	document.getElementById('daysToAdd').value = daysToAdd;
}

function saveSettings() {
	localStorage["paxFirstName"] = document.getElementById('paxFirstName').value;
	localStorage["paxEmail"] = document.getElementById('paxEmail').value;
	localStorage["creditCard"] = document.getElementById('creditCardNumber').value;
	localStorage["depCity"] = document.getElementById('depCity').value;
	localStorage["arrCity"] = document.getElementById('arrCity').value;
	localStorage["daysToAdd"] = document.getElementById('daysToAdd').value;

	window.close();
}

function restoreDefaultSettings() {
	localStorage.removeItem("paxFirstName");
	localStorage.removeItem("paxEmail");
	localStorage.removeItem("creditCard");
	localStorage.removeItem("depCity");
	localStorage.removeItem("arrCity");
	localStorage.removeItem("daysToAdd");

	location.reload();
}