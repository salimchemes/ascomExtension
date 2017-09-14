var defaultPaxFirstName = "Dev";
var defaultPaxEmail = "tester@alaskaair.com";
var defaultCreditCard = "1111";

document.addEventListener('DOMContentLoaded', function () {
	loadSettings();

	document.getElementById('save').addEventListener('click', saveSettings, false);
	document.getElementById('restore').addEventListener('click', restoreDefaultSettings, false);
}, false);

function loadSettings() {
	var paxFirstName = localStorage["paxFirstName"];
	var paxEmail = localStorage["paxEmail"];
	var creditCard = localStorage["creditCard"];

	if (paxFirstName == undefined) paxFirstName = defaultPaxFirstName;
	if (paxEmail == undefined) paxEmail = defaultPaxEmail;
	if (creditCard == undefined) creditCard = defaultCreditCard;

	document.getElementById('paxFirstName').value = paxFirstName;
	document.getElementById('paxEmail').value = paxEmail;
	document.getElementById('creditCardNumber').value = creditCard;
}

function saveSettings() {
	localStorage["paxFirstName"] = document.getElementById('paxFirstName').value;
	localStorage["paxEmail"] = document.getElementById('paxEmail').value;
	localStorage["creditCard"] = document.getElementById('creditCardNumber').value;

	window.close();
}

function restoreDefaultSettings() {
	// TODO: add confirm if possible

	localStorage.removeItem("paxFirstName");
	localStorage.removeItem("paxEmail");
	localStorage.removeItem("creditCard");

	location.reload();
}