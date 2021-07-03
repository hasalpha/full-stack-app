const passwordStrengthValidator = ()=>{
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const passwordField = document.querySelector('#password');
    const passwordDiv = document.querySelector("form label:nth-of-type(2)");
    let text = document.createTextNode('Password is not strong')
    let error = document.createElement('p');
    error.appendChild(text);
    passwordDiv.appendChild(error);
    error.style.display = "none";
    passwordField.addEventListener('input', e =>{
    if(!pattern.test(e.target.value)){
        error.style.display = "block";
        document.querySelector('input[type=submit]').style.opacity = 0.5;
        document.querySelector('input[type=submit]').style.cursor = "not-allowed";
        document.querySelector('input[type=submit]').disabled = true;
    }else{
        error.style.display = "none";
        document.querySelector('input[type=submit]').style.opacity = 1;
        document.querySelector('input[type=submit]').style.cursor = "pointer";
        document.querySelector('input[type=submit]').disabled = false;
    }});
};

const passwordMatch = () =>{
    const rpasswordField = document.querySelector('#rpassword');
    const passwordField = document.querySelector('#password');
    const errorDiv = document.querySelector('.error');
    rpasswordField.addEventListener('focusout', e=>{
        if(e.target.value != passwordField.value){
            errorDiv.style.display = 'block';
            document.querySelector('input[type=submit]').style.opacity = 0.5;
            document.querySelector('input[type=submit]').style.cursor = "not-allowed";
            document.querySelector('input[type=submit]').disabled = true;
        }else{
            errorDiv.style.display = 'none';
            document.querySelector('input[type=submit]').style.opacity = 1;
            document.querySelector('input[type=submit]').style.cursor = "pointer";
            document.querySelector('input[type=submit]').disabled = false;
        }  
    });
}

passwordMatch();
passwordStrengthValidator();