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

var showDesktopControls = function(url) {
	if (url.indexOf('www.alaska') === -1)
		return;

	$('#noActionsMessage').hide();

	runOnDOMWithCallback(functionGetEnvironment, functionSetEnvironment);

	$('#env').show();
	$('#managetrip').show();
	$('#managetrip').show();
	$('#selectfirstflight').show();
	$('#loadsingle').show();
	$('#loadmultiple').show();
	$('#loadpayment').show();
	$('#loadarranger').show();
	$('#manageGroupReservation').show();

	addDesktopActions();
}

var showMowControls = function(url) {
	if (url.indexOf('mow') === -1 && 
		url.indexOf('m.alaska') === -1 && 
		url.indexOf('localhost') === -1)
		return;

	$('#noActionsMessage').hide();

	$('#mowmanagetrip').show();
	$('#mowsearchflight').show();
	$('#mowloadpax').show();
	$('#mowloadcontactinfo').show();
	$('#mowloadpayment').show();

	addMowActions();
}

var addDesktopActions = function() {
	document.getElementById('managetrip').addEventListener('click', function () { runOnDOM(functionManageTrip); window.close(); }, false);
	document.getElementById('selectfirstflight').addEventListener('click', function () {
		runOnDOM(functionSearchFlight, [getSettingValue('depCity'), getSettingValue('arrCity'), getSettingValue('daysToAdd')]);
		setTimeout(function() { runOnDOM(functionSelectFirstFlight) }, 5000);
	}, false);
	document.getElementById('loadsingle').addEventListener('click', function () { 
		runOnDOM(functionLoadPax, [getSettingValue('paxFirstName'), getSettingValue('paxEmail')]); 
	}, false);
	document.getElementById('loadmultiple').addEventListener('click', function () { 
		runOnDOM(functionLoadMultiPax, [getSettingValue('paxFirstName'), getSettingValue('paxEmail')]);
	}, false);
	document.getElementById('loadpayment').addEventListener('click', function () { 
		runOnDOM(functionLoadPayment, [getSettingValue('creditCard')]);
	 }, false);
	document.getElementById('loadarranger').addEventListener('click', function () { runOnDOM(functionLoadArranger) }, false);
	document.getElementById('manageGroupReservation').addEventListener('click', function () { runOnDOM(functionGroupReservation); window.close(); }, false);
}

var addMowActions = function() {
	document.getElementById('mowloadpax').addEventListener('click', function () { 
		runOnDOM(functionMowLoadPax, [getSettingValue('paxFirstName')]);
	 }, false);
	document.getElementById('mowloadcontactinfo').addEventListener('click', function () { 
		runOnDOM(functionMowLoadContactInfo, [getSettingValue('paxEmail')]);
	 }, false);
	document.getElementById('mowloadpayment').addEventListener('click', function () { 
		runOnDOM(functionMowLoadPayment, [getSettingValue('creditCard')]);
	}, false);
	document.getElementById('mowmanagetrip').addEventListener('click', function () { 
		runOnDOM(functionMowManageTrip);
		setTimeout(function() { runOnDOM(functionMowManageTripSetText); window.close(); }, 1000);
	}, false);
	document.getElementById('mowsearchflight').addEventListener('click', function () {
		runOnDOM(functionMowSearchFlight, [getSettingValue('depCity'), getSettingValue('arrCity'), getSettingValue('daysToAdd')]);
		window.close();
	}, false);
}


// Env
var functionGetEnvironment = function () {
	try {
		if ($('.footer-servername').length === 0)
			return '';
	
		return $('.footer-servername').text();	
	} catch (error) {
		return '';
	}
}
var functionSetEnvironment = function (results) {
	try {
		document.getElementById('env').innerHTML = results[0];
	} catch (error) {
		document.getElementById('env').innerHTML = '';
	}
}


// Manage trip
var functionManageTrip = function () {
	$('#primaryTab>li:last').click();
	$('#txtTLastName').val('tester');
	$('#tripModConfirmationCode').focus();
}


// Search and select first flight
var functionSearchFlight = function(depCity, arrCity, daysToAdd) {
	var changeEvent = document.createEvent("HTMLEvents");
	changeEvent.initEvent("change", true, true);
	
	if (daysToAdd === '') daysToAdd = '1';

	var depDate = new Date(new Date().getTime() + (parseInt(daysToAdd) * 24*60*60*1000));
	var depDateString = (depDate.getMonth() + 1) + '/'+ depDate.getDate() + '/'+ depDate.getFullYear();

	document.getElementById('oneWay').checked = true;
	document.getElementById('oneWay').dispatchEvent(changeEvent);
	document.getElementById('fromCity1').value = depCity;
	document.getElementById('toCity1').value = arrCity;
	document.getElementById('departureDate1').value = depDateString;
	document.getElementById('departureDate1').dispatchEvent(changeEvent);
	document.getElementById('findFlights').click();
}
var functionSelectFirstFlight = function () {
	$('a.refundable-toggle').click();
	$('div.PriceCell:first').click();
	$('#ContinueButton').click();
}


// Load pax
var functionLoadPax = function (paxFirstName, paxEmail) {
	document.getElementById('Traveler_0__FirstName').value = paxFirstName;
	document.getElementById('Traveler_0__LastName').value = "Tester";
	document.getElementById('Traveler_0__Gender').value = "Male";
	document.getElementById('Traveler_0__BirthMonth').value = "1";
	document.getElementById('Traveler_0__BirthDay').value = "1";
	document.getElementById('Traveler_0__BirthYear').value = "1986";
	document.getElementById('TravelerPhoneNbr_TravelerPhoneNumber').value = "4156452152";
	document.getElementById('ContactEmail_EmailAddress').value = paxEmail;
	document.getElementById('EmailConfirmation_EmailAddress').value = paxEmail;
	document.getElementById("EmailSubscription_AgreeToEmailSubscription").checked = false;
	window.scrollTo(0, document.body.scrollHeight)
}


// Load multi pax
var functionLoadMultiPax = function (paxFirstName, paxEmail) {
	document.getElementById('Traveler_0__FirstName').value = paxFirstName;
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
	document.getElementById('ContactEmail_EmailAddress').value = paxEmail;
	document.getElementById('EmailConfirmation_EmailAddress').value = paxEmail;
	document.getElementById("EmailSubscription_AgreeToEmailSubscription").checked = false;
	window.scrollTo(0, document.body.scrollHeight)
}


// Load payment
var functionLoadPayment = function (cardNumber) {
	document.getElementById("CommercialAccount").checked = true;
	document.getElementById("CreditCardInformation_BillingCreditCardEntry_CardNumber").value = cardNumber;
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


// Open Group reservation page
var functionGroupReservation = function() {
	location.href = "/booking/reservation-lookup/group";
}


// MOW search flight
var functionMowSearchFlight = function(depCity, arrCity, daysToAdd) {
	var changeEvent = document.createEvent("HTMLEvents");
	changeEvent.initEvent("change", true, true);
	
	if (daysToAdd === '') daysToAdd = '1';

	var depDate = new Date(new Date().getTime() + (parseInt(daysToAdd) * 24*60*60*1000));
	var depDateString = (depDate.getMonth() + 1) + '/'+ depDate.getDate() + '/'+ depDate.getFullYear();

	document.getElementById('srh-isow').checked = true;
	document.getElementById('srh-isow').dispatchEvent(changeEvent);
	document.getElementById('geo-from').value = depCity;
	document.getElementById('geo-to').value = arrCity;
	document.getElementById('departure-date').value = depDateString;
	document.getElementById('departure-date').dispatchEvent(changeEvent);
	document.querySelectorAll("input[type=submit]")[0].click()
}


// MOW load pax
var functionMowLoadPax = function (paxFirstName) {
	document.getElementById('Traveler_FirstName').value = paxFirstName;
	document.getElementById('Traveler_LastName').value = "Tester";
	document.getElementById('gender-male').click();
	document.getElementById('Traveler_BirthMonth').value = "1";
	document.getElementById('Traveler_BirthDay').value = "1";
	document.getElementById('Traveler_BirthYear').value = "1986";
	window.scrollTo(0, document.body.scrollHeight);
}


// MOW load contact info
var functionMowLoadContactInfo = function (paxEmail) {
	document.getElementById('traveler-contact-phone-number').value = "1234567890";
	document.getElementById('traveler-contact-email').value = paxEmail;
	document.getElementById('receiptemail').value = paxEmail;
}


// MOW load payment
var functionMowLoadPayment = function (cardNumber) {
	// this is to execute country dropdown "onchange" event from the extension
	var changeEvent = document.createEvent("HTMLEvents");
	changeEvent.initEvent("change", true, true);
	
	document.getElementById("CreditCard_NameOnCard").value = "Tester";
	document.getElementById("CreditCard_Number").value = cardNumber;
	document.getElementById("CreditCard_ExpirationMonth").value = 12;
	document.getElementById("CreditCard_ExpirationYear").value = 2022;
	document.getElementById("country").value = "US";
	document.getElementById("country").dispatchEvent(changeEvent);
	document.getElementById("BillingAddress_Street").value = "Address 1";
	document.getElementById("BillingAddress_City").value = "Seattle";
	document.getElementById("uslist").value = "WA";
	document.getElementById("BillingAddress_ZipCode").value = "98101";
	document.getElementById("PaymentPhoneNumber_Number").value = "1234567890";
	window.scrollTo(0, document.body.scrollHeight);
}


// MOW manage trip
var functionMowManageTrip = function () {
	document.getElementById('myTrips').click();
}
var functionMowManageTripSetText = function () {
	document.getElementById('search-reservation-last-name').value = "tester";
	document.getElementById('search-reservation-number').focus();
}