
/* =========================================
   BRIGHTFORM STUDIO
   JavaScript Functionality
   ========================================= */


/* =========================================
   01. MOBILE NAVIGATION
   ========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");


// Open and close mobile menu

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    // Close menu when a navigation link is clicked

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    // Close menu when clicking outside navigation

    document.addEventListener("click", (event) => {

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* =========================================
   02. AUTOMATIC COPYRIGHT YEAR
   ========================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   03. CONTACT FORM
   ========================================= */

const contactForm = document.getElementById("contact-form");


// Agency WhatsApp number: country code + number

const WHATSAPP_NUMBER = "919316330109";


if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        // Prevent normal form submission

        event.preventDefault();


        // Get form values

        const name =
            document.getElementById("name").value.trim();

        const business =
            document.getElementById("business").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const service =
            document.getElementById("service").value;

        const message =
            document.getElementById("message").value.trim();


        /* =====================================
           04. FORM VALIDATION
           ===================================== */


        // Check required fields

        if (!name || !business || !phone || !service) {

            alert("Please complete all required fields.");

            return;

        }


        // Validate Indian phone number

        const phonePattern = /^[6-9]\d{9}$/;

        const cleanPhone = phone.replace(/\D/g, "");

        if (!phonePattern.test(cleanPhone)) {

            alert(
                "Please enter a valid 10-digit Indian mobile number."
            );

            return;

        }


        // Check WhatsApp configuration

        if (!/^91\d{10}$/.test(WHATSAPP_NUMBER)) {

            alert(
                "The agency WhatsApp number has not been configured yet. Please update it in script.js."
            );

            return;

        }


        /* =====================================
           05. CREATE WHATSAPP MESSAGE
           ===================================== */

        const whatsappMessage =

`Hello Brightform Studio!

I would like to enquire about your website development services.

My Details:

Name: ${name}

Business Name: ${business}

WhatsApp Number: ${cleanPhone}

Required Service: ${service}

Project Details:
${message || "Not provided"}

Please contact me to discuss the next steps.

Thank you!`;


        /* =====================================
           06. OPEN WHATSAPP
           ===================================== */

        const encodedMessage =
            encodeURIComponent(whatsappMessage);

        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );


        /* =====================================
           07. SUBMIT ENQUIRY TO NETLIFY
           ===================================== */

        const submitButton = contactForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        if (submitButton) {

            submitButton.disabled = true;

        }


        try {

            const formData = new FormData(contactForm);

            const response = await fetch("/", {

                method: "POST",

                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },

                body: new URLSearchParams(formData).toString()

            });


            if (!response.ok) {

                throw new Error("Netlify form submission failed.");

            }


            alert(
                "Thank you! Your enquiry has been submitted successfully."
            );

            contactForm.reset();


        } catch (error) {

            console.error(
                "Form submission error:",
                error
            );

            alert(
                "WhatsApp has opened, but we could not confirm that your enquiry was saved. Please try submitting again."
            );


        } finally {

            if (submitButton) {

                submitButton.disabled = false;

            }

        }

    });

}


/* =========================================
   08. CONSOLE MESSAGE
   ========================================= */

console.log(
    "Brightform Studio website initialized successfully."
);
