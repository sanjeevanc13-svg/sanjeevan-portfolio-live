
// ======================================
// SANJEEVAN PORTFOLIO - JAVASCRIPT
// ======================================


// 1. DARK MODE / LIGHT MODE

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light-theme");

        if (document.body.classList.contains("light-theme")) {
            themeToggle.textContent = "☀️";
            localStorage.setItem("theme", "light");
        } else {
            themeToggle.textContent = "🌙";
            localStorage.setItem("theme", "dark");
        }

    });

}


// Load saved theme

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");

    if (themeToggle) {
        themeToggle.textContent = "☀️";
    }
}


// 2. CONTACT FORM - GOOGLE SHEETS CONNECTION

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// Your Google Apps Script URL
const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbw_goLSlD7wjGSr_PiWnaHgw3tw3CLKiM8_fGWcu1gL9bhG-I6A0-nSjizezlmpQOxn/exec";


if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("visitorName").value.trim();

        const email = document.getElementById("visitorEmail").value.trim();

        const message = document.getElementById("visitorMessage").value.trim();


        if (!name || !email || !message) {

            formStatus.textContent = "Please fill all fields.";

            return;
        }


        const response = {
            name: name,
            email: email,
            message: message
        };


        // Save response in Local Storage

        let responses = JSON.parse(
            localStorage.getItem("portfolioResponses")
        ) || [];


        responses.push({

            name: name,
            email: email,
            message: message,
            timestamp: new Date().toLocaleString()

        });


        localStorage.setItem(
            "portfolioResponses",
            JSON.stringify(responses)
        );


        formStatus.textContent = "Sending message...";


        // Send response to Google Sheets

        try {

            await fetch(GOOGLE_SCRIPT_URL, {

                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },

                body: JSON.stringify(response)

            });


            formStatus.textContent =
                "Message sent! Please verify in Google Sheets.";

            contactForm.reset();


        } catch (error) {

            formStatus.textContent =
                "Unable to send message. Please try again.";

            console.error("Google Sheets Error:", error);

        }

    });

}



// 3. ADMIN LOGIN

const adminLoginForm = document.getElementById("adminLoginForm");

const loginStatus = document.getElementById("loginStatus");

const adminDashboard = document.getElementById("adminDashboard");


// DEMO CREDENTIALS ONLY
// Not secure for a public website.

const ADMIN_EMAIL = "admin@example.com";

const ADMIN_PASSWORD = "Admin@123";


if (adminLoginForm) {

    adminLoginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("adminEmail").value;

        const password = document.getElementById("adminPassword").value;


        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {

            loginStatus.textContent = "Login successful!";

            adminDashboard.hidden = false;

            adminLoginForm.reset();

            displayResponses();

            adminDashboard.scrollIntoView({
                behavior: "smooth"
            });

        } else {

            loginStatus.textContent = "Invalid email or password.";

        }

    });

}



// 4. DISPLAY CONTACT RESPONSES

function displayResponses() {

    const responseTable = document.getElementById("responseTable");

    if (!responseTable) return;


    const responses = JSON.parse(
        localStorage.getItem("portfolioResponses")
    ) || [];


    responseTable.innerHTML = "";


    if (responses.length === 0) {

        const row = document.createElement("tr");

        const cell = document.createElement("td");

        cell.colSpan = 4;

        cell.textContent = "No responses available.";

        row.appendChild(cell);

        responseTable.appendChild(row);

        return;

    }


    responses.forEach(function (response) {

        const row = document.createElement("tr");


        [
            response.name,
            response.email,
            response.message,
            response.timestamp
        ].forEach(function (value) {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });


        responseTable.appendChild(row);

    });

}



// 5. ADMIN LOGOUT

const logoutBtn = document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        adminDashboard.hidden = true;

        loginStatus.textContent = "Logged out successfully.";

        document.getElementById("admin").scrollIntoView({
            behavior: "smooth"
        });

    });

}



// ======================================
// JAVASCRIPT COMPLETED
// ======================================
