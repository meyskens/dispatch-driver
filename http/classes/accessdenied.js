import ExtendableError from "./extendablerror";

export default class AccessDeniedError extends ExtendableError {
    constructor(m) {
        super(m);
    }
}