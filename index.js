// function to calculate age
function calculateage(dob) {
    const date_today = new Date();
    const birthDate = new Date(dob);
    let age = date_today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && date_today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


// loading saved data from localStorage when the page loads
window.addEventListener('DOMContentLoaded', (event) => {
    const savedEntries = JSON.parse(localStorage.getItem('registrationEntries')) || [];
    savedEntries.forEach(entry => {
        addRowToTable(entry.name, entry.email, entry.password, entry.dob, entry.termsAccepted);
    });
});


// Code that listens for form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name_ = document.getElementById('name').value;
    const email_ = document.getElementById('email').value;
    const password_ = document.getElementById('password').value;
    const date_ = document.getElementById('dob').value;

    // Validate age (must be between 18 and 55)
    const age = calculateAge(date_);
    if (age < 18 || age > 55) {
        alert('Date of birth must be for people between 18 and 55 years old.');
        return;
    }

    // Validate that terms are accepted
    const termsAccepted = document.getElementById('terms').checked;
    if (!termsAccepted) {
        alert('You must accept the terms and conditions.');
        return;
    }

    // Create a new table row for the new entry
    const newEntry = {
        name: name_,
        email: email_,
        password: password_,
        dob: date_,
        termsAccepted: termsAccepted
    };

    // Append new row to the table
    addRowToTable(newEntry.name, newEntry.email, newEntry.password, newEntry.dob, newEntry.termsAccepted);

    // Save the data to localStorage
    let registrationEntries = JSON.parse(localStorage.getItem('registrationEntries')) || [];
    registrationEntries.push(newEntry);
    localStorage.setItem('registrationEntries', JSON.stringify(registrationEntries));

    // Clear the form
    document.getElementById('registrationForm').reset();
});

// Function to add a row to the table
function addRowToTable(name, email, password, dob, termsAccepted) {
    const newRow = `
        <tr class="border-t">
            <td class="p-4">${name}</td>
            <td class="p-4">${email}</td>
            <td class="p-4">${password}</td>
            <td class="p-4">${dob}</td>
            <td class="p-4">${termsAccepted ? 'Yes' : 'No'}</td>
        </tr>
    `;

    document.getElementById('entriesTable').insertAdjacentHTML('beforeend', newRow);
}
