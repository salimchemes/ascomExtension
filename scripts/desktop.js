var showDesktopControls = function(url) {
	if (url.indexOf('www.alaska') === -1)
		return;

	$('#noActionsMessage').hide();
	$('.desktopControls').show();
	
	runOnDOMWithCallback(functionGetEnvironment, functionSetEnvironment);
	addDesktopActions();
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
	document.getElementById('toggles').addEventListener('click', function () { runOnDOM(functionToggles); window.close(); }, false);
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


// Open Toggles page
var functionToggles = function() {
	location.href = "/toggle";
}