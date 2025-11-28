# Lead Capture Form - Fitness Landing Page

A high-converting fitness landing page with an integrated lead capture form that submits data via webhook to Zapier, n8n, Make, or any webhook service.

## ✨ Features

- 🎨 **Modern, Responsive Design** - Beautiful gradient hero section with fully responsive layout
- 📝 **Lead Capture Form** - Collects name, email, and phone number
- ✅ **Real-time Validation** - Client-side validation with user-friendly error messages
- 📱 **Phone Auto-formatting** - Automatically formats phone numbers as users type
- 🔗 **Webhook Integration** - Sends form data to Zapier or any webhook endpoint
- 💫 **Smooth Animations** - Professional loading states and success messages
- ♿ **Accessible** - Semantic HTML with proper labels and ARIA attributes
- 📊 **Analytics Ready** - Includes metadata for tracking (source, campaign, timestamp)

## 🚀 Quick Start

### 1. Clone or Download

```bash
git clone <your-repo-url>
cd Lead-Form
```

### 2. Configure Webhook

Open `script.js` and update the webhook URL:

```javascript
const WEBHOOK_URL = 'https://your-webhook-url-here';
```

**Webhook Options:**
- **Zapier**: Create a webhook in Zapier and paste the URL
- **webhook.site**: Visit [webhook.site](https://webhook.site) for testing
- **n8n/Make**: Use your automation service's webhook URL

### 3. Run Locally

**Option A: Python**
```bash
python -m http.server 8000
```

**Option B: Node.js**
```bash
npx http-server -p 8000
```

**Option C: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

Then visit: `http://localhost:8000`

## 📁 File Structure

```
Lead-Form/
├── index.html      # Main HTML structure
├── styles.css      # Styling and responsive design
├── script.js       # Form validation and webhook integration
└── README.md       # This file
```

## 🔧 Configuration

### Webhook Setup

1. **Zapier**:
   - Create a new Zap
   - Choose "Webhooks by Zapier" → "Catch Hook"
   - Copy the webhook URL
   - Paste into `script.js`

2. **webhook.site** (Testing):
   - Visit https://webhook.site
   - Copy your unique URL
   - Paste into `script.js`

3. **Custom Webhook**:
   - Replace `WEBHOOK_URL` in `script.js` with your endpoint
   - Ensure your endpoint accepts POST requests with form-encoded data

### Form Data Format

The form sends data in URL-encoded format:

```
name=John+Doe
email=john@example.com
phone=(555)+123-4567
timestamp=2024-01-15T10:30:00.000Z
source=Fitness+Landing+Page
campaign=90-Day+Transformation
```

## 🧪 Testing

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Fill out and submit the form
4. Check for POST request to your webhook
5. Verify data in your webhook service dashboard

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #ff6b35;
    --primary-dark: #e55a2b;
    --secondary-color: #004e89;
    /* ... */
}
```

### Form Fields

To add/remove fields:
1. Update HTML in `index.html`
2. Add validation in `script.js`
3. Include in form submission data

## 📝 License

This project is open source and available for personal or commercial use.

## 👤 Author

Sid Bercasio

---

**Made with ❤️ for lead generation**

