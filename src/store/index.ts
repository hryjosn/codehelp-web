import { makeObservable } from 'mobx'

class RootStore {
    constructor() {
        makeObservable(this)
    }
}

const rootStore = new RootStore()
export default rootStore
