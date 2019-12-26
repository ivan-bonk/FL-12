let mail = prompt('Enter email', ''),
    pass,
    newPass;

let emailFlag = false,
    passFlag = false;

const LENGTH = 5;

if (mail === null || mail === '') {
    alert('Canceled.');
} else if (mail.length < LENGTH) {
    alert('I don\'t know any emails having name length less than 5 symbols');
} else if (mail === 'user@gmail.com' || mail === 'admin@gmail.com') {
    emailFlag = true;
} else {
    alert('I don\'t know you');
}

if (emailFlag) {
    pass = prompt('Enter password', '');

    if (pass === null || pass === '') {
        alert('Canceled.');
    } else if (mail === 'user@gmail.com' && pass === 'UserPass' ||
        mail === 'admin@gmail.com' && pass === 'AdminPass') {
        passFlag = true;
    } else {
        alert('Wrong password');
    }
}


if (passFlag) {
    if (!confirm('Do you want to change your password?')) {
        alert('You have failed the change.');
        passFlag = false;
    } else {
        pass = prompt('Enter old password', '');

        if (pass === null || pass === '') {
            alert('Canceled.');
        } else if (mail === 'user@gmail.com' && pass === 'UserPass' ||
            mail === 'admin@gmail.com' && pass === 'AdminPass') {
            passFlag = true;
        } else {
            alert('Wrong password');
            passFlag = false;
        }
    }
}

if (passFlag) {
    newPass = prompt('Enter new password', '');
    if (newPass === null || newPass === '') {
        alert('Canceled');
    } else if (newPass.length < LENGTH) {
        alert('It’s too short password. Sorry.');
    } else {
        let newPassMatch = prompt('Enter new password again', '');
        if (newPass !== newPassMatch) {
            alert('You wrote the wrong password');
        } else {
            alert('You have successfully changed your password.');
        }
    }
}