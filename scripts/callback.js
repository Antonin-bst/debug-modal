class Callback {

    static #callbacks = new Map()

    static register(type, id, callback) {
        let callbacks = this.#callbacks.get(type)
        if (callbacks == null) {
            callbacks = new Map()
        }

        let idCallbacks = callbacks.get(id)
        if (idCallbacks == null) {
            idCallbacks = []
        }

        idCallbacks.push(callback)
        callbacks.set(id, idCallbacks)
        this.#callbacks.set(type, callbacks)
    }

    static find(type, id) {
        const callbacks = this.#callbacks.get(type)
        if (callbacks == null) {
            return []
        }

        const idCallbacks = callbacks.get(id)
        if (idCallbacks == null) {
            return []
        }

        return idCallbacks
    }

}

export { Callback }