class MyPromise {
    PromiseResult = null;
    PromiseState = 'pending' //pending fulfilled rejected
    fulfilledCallbackList = [] as Array<any>;
    rejectCallbackList = [] as Array<any>;

    constructor(executor) {
        this.PromiseResult = null;
        this.PromiseState = 'pending';
        this.fulfilledCallbackList = [];
        this.rejectCallbackList = [];
        //throw error => reject
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (e) {
            this.reject(e)
        }
    }

    resolve(value?) {
        //状态一旦改变 不可再次改变
        if (this.PromiseState !== 'pending') return;
        this.PromiseResult = value;
        this.PromiseState = 'fulfilled';

        while (this.fulfilledCallbackList.length) {
            const func = this.fulfilledCallbackList.shift();
            setTimeout(() => func(this.PromiseResult), 0);
        }
    };

    reject(reason?) {
        if (this.PromiseState !== 'pending') return;
        this.PromiseResult = reason;
        this.PromiseState = 'rejected';

        while (this.rejectCallbackList.length) {
            const func = this.rejectCallbackList.shift();
            setTimeout(() => func(this.PromiseResult), 0);
        }
    };

    then(onFulfilled?, onRejected?) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

        const returnPromise = new MyPromise((resolve, reject) => {

            const resolvePromise = callback => {
                try {
                    const data = callback(this.PromiseResult);
                    if (data === returnPromise) {
                        throw new Error('不能返回自身')
                    } else if (data instanceof MyPromise) {
                        data.then(resolve, reject);
                    } else {
                        resolve(data);
                    }

                } catch (e) {
                    reject(e)
                }
            };

            if (this.PromiseState === 'fulfilled') resolvePromise(this.PromiseResult);
            if (this.PromiseState === 'rejected') resolvePromise(this.PromiseResult);

            if (this.PromiseState === 'pending') {
                this.fulfilledCallbackList.push(resolvePromise.bind(this, onFulfilled));
                this.rejectCallbackList.push(resolvePromise.bind(this, onRejected));
            }
        });

        return returnPromise;
    };

    catch() {

    };

    finally() {

    };
}

export default MyPromise
