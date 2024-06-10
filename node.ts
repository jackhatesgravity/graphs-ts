export class Node {
    private readonly _id: string;

    constructor(id: string) {
        this._id = id
    }

    get_id() {
        return this._id;
    }
}