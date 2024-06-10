interface QueueInterface<T> {
    count(): number;
    empty(): boolean;
    put(node: T): number;
    get(): T | undefined;
}

export class Queue<T> implements QueueInterface<T> {
    private _queue: T[];

    constructor() {
        this._queue = [];
    }

    public count(): number {
        return this._queue.length;
    }

    public empty(): boolean {
        return this._queue.length === 0;
    }

    public put(node: T): number {
        return this._queue.push(node);
    }

    public get(): T | undefined {
        return this._queue.shift();
    }
}
