function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if (values.username === "") {
        error.username = "Username should not be empty"
    } else {
        error.username = ""
    }
    
    if (values.email === "") {
        error.email = "Email should not be empty"
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email doesn't have the correct format"
    } else {
        error.email = ""
    }

    if (values.password === "") {
        error.password = "Password should not be empty"
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password must contain at least 1 digit, lowercase and uppercase letter, at least 8 characters length and no special ones like @ or _"
    } else {
        error.password = ""
    }

    return error;
}

export default Validation;