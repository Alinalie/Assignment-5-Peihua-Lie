"use strict";

const calculateDiscount = (customer, subtotal) => {
    if (customer == "reg") {
        if (subtotal >= 100 && subtotal < 250) {
            return .1;
        } else if (subtotal >= 250 && subtotal < 500) {
            return .25;
        } else if (subtotal >= 500) {
            return .3;
        } else {
            return 0;
        }
    }
    else if (customer == "loyal") {
        return .3;
    }
    else if (customer == "honored") {
        if (subtotal < 500) {
            return .4;
        }
        else {
            return .5;
        }
    }
};

   //Code a function that formats the Date object that’s passed to it in MM/DD/YYYY format and then returns the date string.
    const dateStr = (dateObject) => {
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    let dateText = month.toString().padStart(2, "0") + "/";
    dateText += day.toString().padStart(2, "0") + "/";
    dateText += year;
    return dateText;
}

$(document).ready(() => {

    $("#calculate").click(() => {
        const customerType = $("#type").val();
        let subtotal = $("#subtotal").val();
        subtotal = parseFloat(subtotal);
        if (isNaN(subtotal) || subtotal <= 0) {
            alert("Subtotal must be a number greater than zero.");
            $("#clear").click();
            $("#subtotal").focus();
            return;
        }

        let invoiceDate = $("#invoice_date").val().trim();
        //Add an if statement that checks whether the invoice date is equal to an empty string
        if (invoiceDate.length == 0) {
            const now = new Date();
            invoiceDate = dateStr(now);
        }

        //code that checks whether the invoice date is not equal to an empty string and whether the Date object is not a valid date
        const datePattern = /^[01]?\d\/[0-3]\d\/\d{4}$/;
        if (!datePattern.test(invoiceDate)) {
            alert("Invalid Invoice date");
            $("#clear").click();
            $("#invoice_date").focus();
            return;
        }
        //code that sets the values of the Invoice Date fields 
        $("#invoice_date").val(invoiceDate);
        
        //code that calculates the due date as 30 days after the invoice date
        const date = new Date(invoiceDate);
        const dueDate = date;
        dueDate.setDate(dueDate.getDate() + 30);
       //code that sets the values of the Due Date fields
        $("#due_date").val(dateStr(dueDate));


        const discountPercent = calculateDiscount(customerType, subtotal);
        const discountAmount = subtotal * discountPercent;
        const invoiceTotal = subtotal - discountAmount;

        $("#subtotal").val(subtotal.toFixed(2));
        $("#percent").val((discountPercent * 100).toFixed(2));
        $("#discount").val(discountAmount.toFixed(2));
        $("#total").val(invoiceTotal.toFixed(2));

        // set focus on type drop-down when done  
        $("#type").focus();

    });

    $("#clear").click(() => {

        $("#type").val("reg");
        $("#subtotal").val("");
        $("#invoice_date").val("");
        $("#percent").val("");
        $("#discount").val("");
        $("#total").val("");
        $("#due_date").val("");

        // set focus on type drop-down when done
        $("#type").focus();
    })

    // set focus on type drop-down on initial load
    $("#type").focus();
});

