document.addEventListener('DOMContentLoaded', function () {
	runOnDOMWithCallback(functionGetEnvironment, functionSetEnvironment);

	document.getElementById('managetrip').addEventListener('click', function () { runOnDOM(functionManageTrip); window.close(); }, false);
	document.getElementById('selectfirstflight').addEventListener('click', function () { runOnDOM(functionSelectFirstFlight) }, false);
	document.getElementById('loadsingle').addEventListener('click', function () { runOnDOM(functionLoadPax) }, false);
	document.getElementById('loadmultiple').addEventListener('click', function () { runOnDOM(functionLoadMultiPax) }, false);
	document.getElementById('loadpayment').addEventListener('click', function () { runOnDOM(functionLoadPayment) }, false);
	document.getElementById('loadarranger').addEventListener('click', function () { runOnDOM(functionLoadArranger) }, false);
	
	//MOW
	document.getElementById('mowloadpax').addEventListener('click', function () { runOnDOM(functionMowLoadPax) }, false);
	document.getElementById('mowloadcontactinfo').addEventListener('click', function () { runOnDOM(functionMowLoadContactInfo) }, false);
	document.getElementById('mowloadpayment').addEventListener('click', function () { runOnDOM(functionMowLoadPayment) }, false);

}, false);

var runOnDOM = function (functionToExecute) {
	chrome.tabs.executeScript({
		code: '(' + functionToExecute + ')();' //argument here is a string but function.toString() returns function's code
	});
}

var runOnDOMWithCallback = function (functionToExecute, callback) {
	chrome.tabs.executeScript({
		code: '(' + functionToExecute + ')();' //argument here is a string but function.toString() returns function's code
	}, (results) => { callback(results[0]) });
}


// Env
var functionGetEnvironment = function () {
	return document.getElementsByClassName("server-name fine-print text-center footer-servername")[1].textContent;
}
var functionSetEnvironment = function (result) {
	document.getElementById('env').innerHTML = result;
}


// Manage trip
var functionManageTrip = function () {
	$('#primaryTab>li:last').click();
	$('#txtTLastName').val('tester');
	$('#tripModConfirmationCode').focus();
}


// Select first flight
var functionSelectFirstFlight = function () {
	$('a.refundable-toggle').click();
	$('div.PriceCell:first').click();
	$('#ContinueButton').click();
}


// Load pax
var functionLoadPax = function () {
	document.getElementById('Traveler_0__FirstName').value = "Dev";
	document.getElementById('Traveler_0__LastName').value = "Tester";
	document.getElementById('Traveler_0__Gender').value = "Male";
	document.getElementById('Traveler_0__BirthMonth').value = "1";
	document.getElementById('Traveler_0__BirthDay').value = "1";
	document.getElementById('Traveler_0__BirthYear').value = "1986";
	document.getElementById('TravelerPhoneNbr_TravelerPhoneNumber').value = "4156452152";
	document.getElementById('ContactEmail_EmailAddress').value = "tester@alaskaair.com";
	document.getElementById('EmailConfirmation_EmailAddress').value = "tester@alaskaair.com";
	document.getElementById("EmailSubscription_AgreeToEmailSubscription").checked = false;
	window.scrollTo(0, document.body.scrollHeight)
}


// Load multi pax
var functionLoadMultiPax = function () {
	document.getElementById('Traveler_0__FirstName').value = "Dev";
	document.getElementById('Traveler_0__LastName').value = "Tester";
	document.getElementById('Traveler_0__Gender').value = "Male";
	document.getElementById('Traveler_0__BirthMonth').value = "1";
	document.getElementById('Traveler_0__BirthDay').value = "1";
	document.getElementById('Traveler_0__BirthYear').value = "1986";
	document.getElementById('Traveler_1__FirstName').value = "John";
	document.getElementById('Traveler_1__LastName').value = "Tester";
	document.getElementById('Traveler_1__Gender').value = "Male";
	document.getElementById('Traveler_1__BirthMonth').value = "2";
	document.getElementById('Traveler_1__BirthDay').value = "2";
	document.getElementById('Traveler_1__BirthYear').value = "1988";
	document.getElementById('Traveler_2__FirstName').value = "Susan";
	document.getElementById('Traveler_2__LastName').value = "Tester";
	document.getElementById('Traveler_2__Gender').value = "Female";
	document.getElementById('Traveler_2__BirthMonth').value = "3";
	document.getElementById('Traveler_2__BirthDay').value = "3";
	document.getElementById('Traveler_2__BirthYear').value = "1987";
	document.getElementById('TravelerPhoneNbr_TravelerPhoneNumber').value = "4156452152";
	document.getElementById('ContactEmail_EmailAddress').value = "tester@alaskaair.com";
	document.getElementById('EmailConfirmation_EmailAddress').value = "tester@alaskaair.com";
	document.getElementById("EmailSubscription_AgreeToEmailSubscription").checked = false;
	window.scrollTo(0, document.body.scrollHeight)
}


// Load payment
var functionLoadPayment = function () {
	document.getElementById("CommercialAccount").checked = true;
	document.getElementById("CreditCardInformation_BillingCreditCardEntry_CardNumber").value = "1111";
	document.getElementById("CreditCardInformation_BillingCreditCardEntry_ExpirationMonths_Selected").value = 1;
	document.getElementById("CreditCardInformation_BillingCreditCardEntry_ExpirationYears_Selected").value = 2022;
	document.getElementById("CreditCardInformation_BillingCreditCardEntry_CardPersonName").value = "Tester";
	document.getElementById("CreditCardInformation_BillingAddressEntry_Address1").value = "Address 1";
	document.getElementById("CreditCardInformation_BillingAddressEntry_PostalCode").value = "98101";
	document.getElementById("CreditCardInformation_BillingAddressEntry_City").value = "Seattle";
	document.getElementById("CreditCardInformation_BillingAddressEntry_USStates_Selected").value = "WA";
	document.getElementById("CreditCardInformation_BillingPhoneNumberEntry_Number").value = "1234567890";
	window.scrollTo(0, document.body.scrollHeight)
}


// Load arranger
var functionLoadArranger = function () {
	document.getElementById("ArrangerName").value = "tester";
	document.getElementById("EmailSubscription_AgreeToEmailSubscription").checked = false;
	window.scrollTo(0, document.body.scrollHeight);
}


// MOW load pax
var functionMowLoadPax = function () {
	document.getElementById('Traveler_FirstName').value="Dev";
	document.getElementById('Traveler_LastName').value="Tester";
	document.getElementById('gender-male').click();
	document.getElementById('Traveler_BirthMonth').value="1";
	document.getElementById('Traveler_BirthDay').value="1";
	document.getElementById('Traveler_BirthYear').value="1986";
	window.scrollTo(0, document.body.scrollHeight);
}


// MOW load contact info
var functionMowLoadContactInfo = function () {
	document.getElementById('traveler-contact-phone-number').value="1234567890";
	document.getElementById('traveler-contact-email').value="test@test.com";
	document.getElementById('receiptemail').value="test@test.com";
}


// MOW load payment
var functionMowLoadPayment = function () {
	document.getElementById("CreditCard_NameOnCard").value="Tester";
	document.getElementById("CreditCard_Number").value="1111";
	document.getElementById("CreditCard_ExpirationMonth").value=12;
	document.getElementById("CreditCard_ExpirationYear").value=2022;
	document.getElementById("country").value= "US";
	document.getElementById("country").onchange();
	document.getElementById("BillingAddress_Street").value= "Address 1";
	document.getElementById("BillingAddress_City").value="Seattle";
	document.getElementById("uslist").value="WA";
	document.getElementById("BillingAddress_ZipCode").value="98101";
	document.getElementById("PaymentPhoneNumber_Number").value= "1234567890";
	window.scrollTo(0, document.body.scrollHeight);
}