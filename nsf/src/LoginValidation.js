function Validation(value){

    let error = {}
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/
    const password_pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*_)(?!.*\W)(?!.* ).{8,16}$/

    if(value.email === ""){
        error.email = "Not empty"
    }
    else if(!email_pattern.test(value.email)){
        error.email = "Not good email"
    }
    else {
        error.email = ""
    }

    if(value.password === ""){
        error.password = "Not empty"
    }
    else if(!password_pattern.test(value.password)){
        error.password = "Not good mdp"
    }
    else {
        error.password = ""
    }
    return error
}

export default Validation;