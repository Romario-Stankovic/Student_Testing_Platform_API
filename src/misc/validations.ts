
    export function validateName(name : string | null) : boolean {
        if(name == null || name.length == 0){
            return false;
        }
        return true;
    }

    export function validateLastName(lastName : string | null) : boolean {
        if(lastName == null || lastName.length == 0){
            return false;
        }
        return true;
    }

    export function validateUsername(username : string | null) : boolean {
        if(username == null || username.length == 0){
            return false;
        }
        return true;
    }

    export function validatePassword(password : string | null) : boolean {
        if (password == null || password.length == 0){
            return false;
        }
        return true;
    }

    export function validateIndexNumber(indexNumber : string | null) : boolean {
        if(indexNumber == null || indexNumber.length != 10){
            return false;
        }

        if(!indexNumber.match(/^\d+$/)){
            return false;
        }

        return true;
    }
