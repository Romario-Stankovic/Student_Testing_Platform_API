export class APIResponse {
    status: string;
    statusCode: number;
    message: string | null;

    constructor(status: string, statusCode: number, message: string | null = null) {
        this.status = status;
        this.statusCode = statusCode;
        this.message = message;
    }

    static readonly OK = new APIResponse("OK!", 0); // All went fine
    /* 1000 - Service */
    static readonly SAVE_FAILED = new APIResponse("Service Error", 1001); // Saving to the database failed
    static readonly DELETE_FAILED = new APIResponse("Service Error", 1002); // Deleting the entry failed
    /* 2000 - Controller */
    static readonly NULL_ENTRY = new APIResponse("Controller Warning", 2001); // While searching the database, the specific query failed to find a entry
    static readonly DUPLICATE_UNIQUE_VALUE = new APIResponse("Controller Error", 2002); // Tried to insert into the database with a duplicate value that needs to be unique
    /* 3000 - Application */
    static readonly TEST_QUESTION_SHORTAGE = new APIResponse("Application Error", 3001); // We need more question than there are in the database
    static readonly WORK_ENDED = new APIResponse("Application Error", 3002); // This work has already ended
    /* 4000 - Authentication */
    static readonly USER_DOES_NOT_EXIST = new APIResponse("Authentication Error", 4001); // While searching for the user, the specific query failed to find a entry
    static readonly PASSWORD_MISMATCH = new APIResponse("Authentication Error", 4002); // Received password (when hashed) does not match the one stored in the database
    static readonly TOKEN_NOT_FOUND = new APIResponse("Authentication Error", 4003); // While searching for the token, the specific query failed to find a entry
    static readonly INVALID_TOKEN = new APIResponse("Authentication Error", 4004); // The token sent is no longer valid or expired
    static readonly BAD_TOKEN = new APIResponse("Authentication Error", 4005); // We got a bad token
    /* 5000 */
}