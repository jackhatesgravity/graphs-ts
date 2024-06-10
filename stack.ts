interface StackInterface<T> {
    count(): number;
    empty(): boolean;
    put(node: T): number;
    get(): T | undefined;
}

class Stack<T> implements StackInterface<T> {
    private _stack: T[];

    constructor() {
        this._stack = [];
    }

    // Get number of elements in the Stack.
    public count(): number {
        return this._stack.length;
    }

    // Check is the Stack is empty.
    public empty(): boolean {
        return this._stack.length === 0;
    }

    // Add element to the top of the Stack
    public put(node: T): number {
        return this._stack.unshift(node);
    }

    // Removes and returns the top element of the Stack.
    public get(): T | undefined {
        return this._stack.pop();
    }
}