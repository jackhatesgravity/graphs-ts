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

    // Get number of elements in the Stack.
    public count(): number {
        return this._queue.length;
    }

    // Check if the Stack is empty.
    public empty(): boolean {
        return this._queue.length === 0;
    }

    // Add an element to the top of the Stack
    public put(node: T): number {
        return this._queue.push(node);
    }

    // Removes and returns the top element of the Stack.
    public get(): T | undefined {
        return this._queue.pop();
    }
}