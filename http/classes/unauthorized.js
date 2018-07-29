import ExtendableError from "./extendablerror";

export default class UnauthorizedError extends ExtendableError {
    constructor(m) {
        super(m);
    }
}