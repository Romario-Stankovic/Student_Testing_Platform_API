export class APIResponse {
    status : string;
    code : number;
    message : string | null;

    constructor (status : string, code : number, message : string | null = null){
        this.status = status;
        this.code = code;
        this.message = message;
    }

    static fromTemplate(template : APIResponse, message : string | null = null) : APIResponse{
        let response = new APIResponse(template.status, template.code, message);
        return response;
    }

    static readonly OK = new APIResponse("OK!", 0);
    /* 1000 */
    static readonly SAVE_FAILED = new APIResponse("Service Error", 1001);
    /* 2000 */
    static readonly NULL_ENTRY = new APIResponse("Controller Error", 2001);
    static readonly VALIDATION_FAILED = new APIResponse("Controller Error", 2002);
    static readonly DUPLICATE_UNIQUE_VALUE = new APIResponse("Controller Error", 2003);
    /* 3000 */
    /* 4000 */
    static readonly USER_DOES_NOT_EXIST = new APIResponse("Authentication Error", 4001);
    static readonly PASSWORD_MISSMATCH = new APIResponse("Authentication Error", 4002);
    /* 5000 */
}