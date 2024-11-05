import { makeAutoObservable } from 'mobx'

class ChatStore {
    constructor() {
        makeAutoObservable(this)
    }
}

export default ChatStore
