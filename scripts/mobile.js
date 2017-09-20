var showMowControls = function(url) {
	if (url.indexOf('mow') === -1 && 
		url.indexOf('m.alaska') === -1 && 
		url.indexOf('mow-stg') === -1 && 
		url.indexOf('localhost') === -1)
		return;

	$('#noActionsMessage').hide();
	$('.mowControls').show();

	addMowActions();
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