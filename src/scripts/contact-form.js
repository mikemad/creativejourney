export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
      // Using Formspree - replace with your form endpoint
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        showMessage('success', 'Thanks! We\'ll be in touch soon.');
      } else {
        showMessage('error', 'Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      showMessage('error', 'Oops! Something went wrong. Please try again.');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

function showMessage(type, text) {
  const messageDiv = document.getElementById('form-message');
  messageDiv.textContent = text;
  messageDiv.className = type === 'success'
    ? 'mt-4 p-4 bg-green-100 text-green-700 rounded-lg'
    : 'mt-4 p-4 bg-red-100 text-red-700 rounded-lg';
  messageDiv.classList.remove('hidden');

  setTimeout(() => {
    messageDiv.classList.add('hidden');
  }, 5000);
}
