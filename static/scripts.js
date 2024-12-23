// Get references to DOM elements
const form = document.getElementById('qr-form');
const qrType = document.getElementById('qr-type');
const generateBtn = document.getElementById('generate-btn');
const qrPreview = document.getElementById('qr-preview');
const downloadBtn = document.getElementById('download-btn');
const dynamicFields = document.getElementById('dynamic-fields');

// Function to update dynamic fields
qrType.addEventListener('change', () => {
    const selectedType = qrType.value;
    let fieldsHTML = '';

    switch (selectedType) {
        case 'url':
            fieldsHTML = `
                <label for="data">Enter URL:</label>
                <input type="url" id="data" name="data" placeholder="https://example.com" required>
            `;
            break;
        case 'email':
            fieldsHTML = `
                <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" placeholder="user@example.com" required>
                <label for="subject">Subject:</label>
                <input type="text" id="subject" name="subject" placeholder="Subject">
                <label for="message">Message:</label>
                <textarea id="message" name="message" placeholder="Your message"></textarea>
            `;
            break;
        case 'phone':
            fieldsHTML = `
                <label for="data">Enter Phone Number:</label>
                <input type="tel" id="data" name="data" placeholder="+123456789" required>
            `;
            break;
        case 'wifi':
            fieldsHTML = `
                <label for="ssid">SSID:</label>
                <input type="text" id="ssid" name="ssid" placeholder="Wi-Fi Name" required>
                <label for="password">Password:</label>
                <input type="text" id="password" name="password" placeholder="Wi-Fi Password">
                <label for="encryption">Encryption Type:</label>
                <select id="encryption" name="encryption">
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None</option>
                </select>
            `;
            break;
        case 'sms':
            fieldsHTML = `
                <label for="number">Phone Number:</label>
                <input type="tel" id="number" name="number" placeholder="+123456789" required>
                <label for="message">Message:</label>
                <textarea id="message" name="message" placeholder="Your message"></textarea>
            `;
            break;
        default:
            fieldsHTML = `
                <label for="data">Enter Text:</label>
                <input type="text" id="data" name="data" placeholder="Type something..." required>
            `;
            break;
    }

    dynamicFields.innerHTML = fieldsHTML;
});

// Event listener for the "Generate" button
generateBtn.addEventListener('click', () => {
    const selectedType = qrType.value;
    let qrData = '';

    switch (selectedType) {
        case 'url':
            qrData = document.getElementById('data').value.trim();
            break;
        case 'email':
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            qrData = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
            break;
        case 'phone':
            qrData = `tel:${document.getElementById('data').value.trim()}`;
            break;
        case 'wifi':
            const ssid = document.getElementById('ssid').value.trim();
            const password = document.getElementById('password').value.trim();
            const encryption = document.getElementById('encryption').value;
            qrData = `WIFI:S:${ssid};T:${encryption};P:${password};;`;
            break;
        case 'sms':
            const number = document.getElementById('number').value.trim();
            const smsMessage = document.getElementById('message').value.trim();
            qrData = `SMSTO:${number}:${smsMessage}`;
            break;
        default:
            qrData = document.getElementById('data').value.trim();
            break;
    }

    if (!qrData) {
        alert('Please enter the required information to generate a QR code.');
        return;
    }

    // Use the backend endpoint to generate a QR code
    const qrCodeUrl = `/generate_qr?data=${encodeURIComponent(qrData)}`;

    // Update the preview image
    qrPreview.src = qrCodeUrl;
    qrPreview.style.display = 'block';

    // Update the download button
    downloadBtn.style.display = 'block';
    downloadBtn.addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = qrCodeUrl;
        a.download = 'qr-code.png';
        a.click();
    });
});

// FAQ Toggle Script
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});
