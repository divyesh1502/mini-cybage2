$(document).ready(function () {

    var notSameError = $("#notSameError");
    var mobileError = $("#mobileError");
    var emailError = $("#emailError");
    var passError = $("#passError");
    var nameError = $("#nameError");
    var flag = true;


    // validations
    $('#name').keyup(() => {
        const wordInFname = $('#name').val().split(" ");
        if (wordInFname.length <= 1) {
            nameError.text("Please enter full name");
            flag = false;
        } else {
            nameError.text("");
            flag = true;
        }
    })

    $('#password').keyup(() => {
        if (IsValidPass($('#password').val()) == false) {
            passError.text("Password must have special char and a number");
            flag = false;
        } else {
            passError.text("");
            flag = true;
        }
        
    })

    $('#cpassword').keyup(() => {
        if ($('#password').val() !== $('#cpassword').val()) {
            notSameError.text("Please enter same password");
            flag = false;
        } else {
            notSameError.text("");
            flag = true;
        }  
    })

    $('#mobile').keyup(() => {
        if($('#mobile').val().length == 10) {
            mobileError.text("");
            flag = true;
        }
        else if ($('#mobile').val().length < 10 || $('#mobile').val().length > 10) {
            mobileError.text("Please enter 10 digit number only");
            flag = false;
        }
    })

    $('#email').keyup(() => {
        if (IsEmail($('#email').val()) == false) {
            emailError.text("Please enter valid email");
            flag = false;
        } else {
            emailError.text("");
            flag = true;
        }
    })

    //posting data in database
    $('#registrationform').submit(function (event) {
        event.preventDefault();

        const name = $('#name').val();
        const password = $('#password').val();
        // const cpassword = $('#cpassword').val();
        const mobile = $('#mobile').val();
        const email = $('#email').val();
        
        const token = generateToken();
        console.log(flag);

        if (flag == true) {

            axios.post('http://localhost:3000/user', { name, password, mobile, email })
                .then(response => {
                    console.log('Registration successful:', response.data);
                    // const userData = { username, password, token };
                    //console.log(userdata)
                    // localStorage.setItem('userData', JSON.stringify(userData));
                    //window.location.replace("login.html");
                    alert('Registration successful. Please log in.');
                    // window.location.href = './login.html';

                })
                .catch(error => {
                    console.error('Registration failed:', error);
                });
        }


    });
});
function generateToken() {
    return 'dummyToken';
}

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    }
    else {
        return true;
    }
}
function IsValidPass(password) {
    var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (!regex.test(password)) {
        return false;
    }
    else {
        return true;
    }
}