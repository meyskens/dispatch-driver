import ExtendableError from "./extendablerror";

export default class BadRequestError extends ExtendableError {
    constructor(m) {
        super(m);
    }
}