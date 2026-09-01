document.addEventListener('DOMContentLoaded', () => {
    // Handle star rating interactive selection and hover effects
    const ratingRows = document.querySelectorAll('.rating-table tbody tr');

    ratingRows.forEach(row => {
        const starCells = row.querySelectorAll('.star-cell');
        const starIcons = row.querySelectorAll('.star-icon-item');
        const radioInputs = row.querySelectorAll('input[type="radio"]');

        const updateStars = (count) => {
            starIcons.forEach((icon, i) => {
                if (i < count) {
                    icon.classList.add('filled');
                } else {
                    icon.classList.remove('filled');
                }
            });
        };

        starCells.forEach((cell, index) => {
            // Hover preview effect
            cell.addEventListener('mouseenter', () => {
                updateStars(index + 1);
            });

            // Click selection
            cell.addEventListener('click', () => {
                const radio = cell.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                }
                updateStars(index + 1);
            });
        });

        // Restore checked state when mouse leaves the row
        row.querySelector('td:not(.category-name)')?.closest('tr').addEventListener('mouseleave', () => {
            const checkedIndex = Array.from(radioInputs).findIndex(r => r.checked);
            if (checkedIndex !== -1) {
                updateStars(checkedIndex + 1);
            } else {
                updateStars(0);
            }
        });
    });

    // Handle form submission
    const form = document.getElementById('feedbackForm');
    const statusMessage = document.getElementById('statusMessage');
    const submitBtn = document.getElementById('submitBtn');

    // Deployed Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyRrxPIqNzuTo574bvwbWxE2gONoZyFvA2OLMNpkCEO6FLjYOb8r4LVM6glWpLAA-U/exec';

    form.addEventListener('submit', e => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        statusMessage.style.color = '#f7e39c';
        statusMessage.textContent = 'Submitting your feedback...';

        const formData = new FormData(form);
        const urlEncodedData = new URLSearchParams(formData).toString();

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlEncodedData
        })
        .then(response => {
            statusMessage.style.color = '#4CAF50';
            statusMessage.textContent = '✨ Thank you! Your feedback has been submitted successfully.';
            form.reset();
            // Reset stars visually
            document.querySelectorAll('.star-icon-item').forEach(star => {
                star.classList.remove('filled');
            });
        })
        .catch(error => {
            console.error('Error!', error.message);
            statusMessage.style.color = '#f44336';
            statusMessage.textContent = 'Oops! There was a problem submitting your feedback.';
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Feedback';
        });
    });
});
