// Webhook Configuration
const WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/25508349/ukb0ebq/'; 

// Form Elements
const form = document.getElementById('leadForm');
const submitBtn = document.getElementById('submitBtn');
const btnLoader = document.getElementById('btnLoader');
const btnText = document.querySelector('.btn-text');
const successMessage = document.getElementById('successMessage');

// Input Fields
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

// Error Messages
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');

// Smooth scroll to form
function scrollToForm() {
    document.getElementById('leadForm').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
    });
    nameInput.focus();
}

// Validation Functions
function validateName(name) {
    if (!name.trim()) {
        return 'Name is required';
    }
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters';
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
        return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }
    return '';
}

function validateEmail(email) {
    if (!email.trim()) {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validatePhone(phone) {
    if (!phone.trim()) {
        return 'Phone number is required';
    }
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
        return 'Please enter a valid phone number';
    }
    // Check for valid US phone format or international
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phone.trim())) {
        return 'Please enter a valid phone number';
    }
    return '';
}

phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    e.target.value = value;
});

nameInput.addEventListener('blur', function() {
    const error = validateName(this.value);
    displayError(this, nameError, error);
});

emailInput.addEventListener('blur', function() {
    const error = validateEmail(this.value);
    displayError(this, emailError, error);
});

phoneInput.addEventListener('blur', function() {
    const error = validatePhone(this.value);
    displayError(this, phoneError, error);
});

[nameInput, emailInput, phoneInput].forEach(input => {
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            const errorElement = document.getElementById(this.id + 'Error');
            if (errorElement) errorElement.textContent = '';
        }
    });
});

function displayError(input, errorElement, message) {
    if (message) {
        input.classList.add('error');
        errorElement.textContent = message;
    } else {
        input.classList.remove('error');
        errorElement.textContent = '';
    }
}

// Form Submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Reset previous errors
    [nameInput, emailInput, phoneInput].forEach(input => {
        input.classList.remove('error');
    });
    [nameError, emailError, phoneError].forEach(error => {
        error.textContent = '';
    });
    
    // Validate all fields
    const nameValidation = validateName(nameInput.value);
    const emailValidation = validateEmail(emailInput.value);
    const phoneValidation = validatePhone(phoneInput.value);
    
    if (nameValidation) {
        displayError(nameInput, nameError, nameValidation);
    }
    if (emailValidation) {
        displayError(emailInput, emailError, emailValidation);
    }
    if (phoneValidation) {
        displayError(phoneInput, phoneError, phoneValidation);
    }
    
    // If there are validation errors, stop submission
    if (nameValidation || emailValidation || phoneValidation) {
        // Focus on first error field
        if (nameValidation) nameInput.focus();
        else if (emailValidation) emailInput.focus();
        else if (phoneValidation) phoneInput.focus();
        return;
    }
    
    // Prepare form data
    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim().toLowerCase(),
        phone: phoneInput.value.trim(),
        timestamp: new Date().toISOString(),
        source: 'Fitness Landing Page',
        campaign: '90-Day Transformation'
    };
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    form.style.opacity = '0.6';
    
    try {
        // Zapier webhooks form-encoded data
        // Convert form data to URL-encoded format
        const formBody = new URLSearchParams();
        formBody.append('name', formData.name);
        formBody.append('email', formData.email);
        formBody.append('phone', formData.phone);
        formBody.append('timestamp', formData.timestamp);
        formBody.append('source', formData.source);
        formBody.append('campaign', formData.campaign);
        
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody.toString()
        });
        
        // Check if request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Try to read response (may fail in no-cors mode, but that's okay)
        let responseData = null;
        try {
            responseData = await response.text();
            console.log('Webhook response:', responseData);
        } catch (e) {
            // Response reading failed, but request likely succeeded
            console.log('Request sent successfully (response unreadable due to CORS)');
        }
        
        // Simulate small delay for better UX (remove in production)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Show success message
        form.style.display = 'none';
        successMessage.classList.add('show');
        
        // Reset form (hidden, but reset values)
        form.reset();
        
        // Log success for debugging
        console.log('Form submitted successfully:', formData);
        console.log('Webhook response status:', response.status);
        
        // Optional: Track conversion (Google Analytics, etc.)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
                'value': 1.0,
                'currency': 'USD'
            });
        }
        
    } catch (error) {
        console.error('Error submitting form:', error);
        
        // More detailed error message for CORS issues
        let errorMessage = 'Oops! Something went wrong. Please try again or contact us directly.';
        if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
            errorMessage = 'Network error: This might be a CORS issue. The form data may have been sent, but please verify in your Zapier dashboard.';
            console.warn('CORS Error - Check Zapier dashboard to confirm data was received');
        }
        
        // Show user-friendly error message
        alert(errorMessage);
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        form.style.opacity = '1';
    }
});

// Success message animation
function showSuccessMessage() {
    successMessage.classList.add('show');
    form.style.display = 'none';
}

// Console log for testing
console.log('Lead Capture Form Loaded');
console.log('Webhook URL:', WEBHOOK_URL);