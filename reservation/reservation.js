"use strict";

$(document).ready(() => {
	const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;

	// move focus to 'Arrival date' text box
	$("#arrival_date").focus();

	// Code event handler for the submit event of the form
	$("#reservation_form").submit(event => {
		let isValid = true;

		//validate the Arrival date entry 
		const arrive = $("#arrival_date").val().trim();
		if (arrive === "") {
			$("#arrival_date").next().text("Must be a valid date.");
			isValid = false;
		}
		else { $("#arrival_date").next().text(""); }
		$("#arrival_date").val(arrive);

		// validate the nights entry 
		const night = parseInt($("#nights").val().trim());
		if (isNaN(night)) {
			$("#nights").next().text(
				"Must be numeric.");
			$("#nights").val($("#nights").val().trim());
		}
		else { 
			$("#nights").next().text(""); 
			$("#nights").val(night);
		}
            

		// validate the Name entry
		const name = $("#name").val().trim();
		if (name === "") {
			$("#name").next().text("Must be a name.");
			isValid = false;
		}
		else {
			$("#name").next().text("");
		}
		    $("#name").val(name);

		// validate the email entry 
		const email = $("#email").val().trim();
		if (!emailPattern.test(email)) {
			$("#email").next().text(
				"Must be a valid email address.");

			isValid = false;
		}
		else {
			$("#email").next().text("");
		}
		$("#email").val(email);

		// validate the phone entry
		const phone = $("#phone").val().trim();
		if (phone === "") {
			$("#phone").next().text("This field is required.");
			isValid = false;
		}
		$("#phone").val(phone);

		// prevent the submission of the form if any entries are invalid 
		if (isValid == false) {
			event.preventDefault();
		}
	});

}); // end ready

