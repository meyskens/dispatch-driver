import ExtendableError from "./extendablerror";

export default class NotFoundError extends ExtendableError {
    constructor(m) {
        super(m);
    }
}