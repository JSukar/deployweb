const bcrypt = require('bcrypt');

// Replace this with your desired admin password
const password = 'YourSecurePassword123!@#';

// Generate a salt and hash the password
bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
        console.error('Error generating hash:', err);
        return;
    }
    console.log('Your hashed password:');
    console.log(hash);
}); 