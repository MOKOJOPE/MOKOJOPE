document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way

        var username = document.getElementById('username').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var comment = document.getElementById('comment').value;
        var rating = document.getElementById('rating').value;

        var usernameValid = /^[a-zA-Z0-9]{5,}$/.test(username); // Username should be at least 5 characters long and contain only letters and numbers
        var emailValid = /^[^@]+@\w+(\.\w+)+\w$/.test(email); // Simple email pattern check
        var phoneValid = /^\+1 \(\d{3}\) \d{3}-\d{4}$/.test(phone); // Phone number should match the format +1 (XXX) XXX-XXXX
        var ratingValid = rating !== ""; // Ensure a rating is selected

        document.getElementById('usernameFeedback').style.display = usernameValid ? 'none' : 'block';
        document.getElementById('emailFeedback').style.display = emailValid ? 'none' : 'block';
        document.getElementById('phoneFeedback').style.display = phoneValid ? 'none' : 'block';
        document.getElementById('ratingFeedback').style.display = ratingValid ? 'none' : 'block';

        document.getElementById('usernameFeedback').textContent = usernameValid ? '' : 'Username should be at least 5 characters long and contain only letters and numbers.';
        document.getElementById('emailFeedback').textContent = emailValid ? '' : 'Please enter a valid email address.';
        document.getElementById('phoneFeedback').textContent = phoneValid ? '' : 'Please type again. The phone number is not valid';
        document.getElementById('ratingFeedback').textContent = ratingValid ? '' : 'Please select a rating.';

        var formValid = usernameValid && emailValid && phoneValid && ratingValid;

        if (formValid) {
            document.getElementById('registrationFeedback').textContent = 'Your submission was accepted!';
            document.getElementById('registrationFeedback').style.display = 'block';

            // Prepare form data
            var formData = {
                username: username,
                email: email,
                phone: phone,
                comment: comment,
                rating: rating // Include the rating in the form data
            };

            // Send form data via AJAX
            fetch('https://formspree.io/f/myzggkob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    document.getElementById('registrationFeedback').textContent = 'Thank you for your feedback!';
                    document.getElementById('registrationFeedback').style.display = 'block';
                    document.getElementById('registrationFeedback').classList.add('valid-feedback');
                    document.getElementById('registrationForm').reset();
                } else {
                    return response.json().then(data => {
                        if (data.errors) {
                            document.getElementById('registrationFeedback').textContent = data.errors.map(error => error.message).join(", ");
                        } else {
                            document.getElementById('registrationFeedback').textContent = 'Oops! There was a problem submitting your form.';
                        }
                        document.getElementById('registrationFeedback').style.display = 'block';
                        document.getElementById('registrationFeedback').classList.add('error-feedback');
                    });
                }
            })
            .catch(error => {
                document.getElementById('registrationFeedback').textContent = 'Oops! There was a problem submitting your form.';
                document.getElementById('registrationFeedback').style.display = 'block';
                document.getElementById('registrationFeedback').classList.add('error-feedback');
            });
        } else {
            document.getElementById('registrationFeedback').textContent = '';
            document.getElementById('registrationFeedback').style.display = 'none';
        }
    });
});
