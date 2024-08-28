import { __ } from 'i18n';


export const returnErrorMessage = (code:string) =>{
    console.log(code)
    switch(code)
    {
        case "40000":
            return __("ERROR_INVALID_EMAIL");
        case "40001":
            return __("ERROR_INVALID_PASSWORD");
        case "40002":
            return __("ERROR_INVALID_TOKEN");
        case "40003":
            return __("ERROR_INVALID_TOKENTYPE");
        case "40004":
            return __("ERROR_USER_NOT_FOUND");
        case "40004":
            return __("ERROR_USER_ALREADY_EXISTS");
        case "40005":
            return __("ERROR_BIKEID");
        case "40006":
            return __("ERROR_CATEGORYID");
        case "40007":
            return __("ERROR_SHAREWITH");
        case "40008":
            return __("ERROR_BLOG_NOT_FOUND");
        case "40009":
            return __("ERROR_BLOG_COMMENT_ID");
        case "40010":
            return __("ERROR_THREAD_COMMENT_ID");
        case "40011":
            return __("ERROR_POST_ID");
        case "40012":
            return __("ERROR_POST_COMMENT_ID");
        case "40013":
            return __("ERROR_TOURING_ID");
        default:
            return code;

    }
}