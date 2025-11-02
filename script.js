// Character counter for narrative textarea
const narrativeTextarea = document.getElementById('narrative');
const charCountSpan = document.getElementById('charCount');

if (narrativeTextarea && charCountSpan) {
    narrativeTextarea.addEventListener('input', function() {
        const count = this.value.length;
        charCountSpan.textContent = count;
    });
}

// Form submission handler
const fnForm = document.getElementById('fnForm');
if (fnForm) {
    fnForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const buttonText = submitBtn.querySelector('.button-text');
        const buttonLoader = submitBtn.querySelector('.button-loader');
        const formContainer = document.querySelector('.form-container');
        const successMessage = document.getElementById('successMessage');
        const submittedEmail = document.getElementById('submittedEmail');
        
        // Disable button and show loader
        submitBtn.disabled = true;
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'flex';
        
        // Collect form data
        const formData = new FormData(fnForm);
        const data = {
            email: formData.get('email'),
            rank: formData.get('rank'),
            subject: formData.get('subject') || 'Feedback Note Request',
            narrative: formData.get('narrative')
        };
        
        try {
            // Send to your Make.com webhook
            const response = await fetch(fnForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                // Show success message
                fnForm.style.display = 'none';
                successMessage.style.display = 'block';
                submittedEmail.textContent = data.email;
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            alert('There was an error submitting your form. Please try again or email us directly at fn@easypace.ca');
            
            // Re-enable button
            submitBtn.disabled = false;
            buttonText.style.display = 'inline';
            buttonLoader.style.display = 'none';
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
```

---

## 5. _redirects (for Netlify)
```
# Netlify redirects file
/*    /index.html   200
