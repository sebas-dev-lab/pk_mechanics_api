export default class SecurityValidation {
    static validateserver = (target: any) : boolean => target === process.env.SERVER_KEY
}