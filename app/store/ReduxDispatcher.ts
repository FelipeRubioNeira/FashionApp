import { inject, injectable } from "tsyringe";
import { Store } from "@reduxjs/toolkit";
import { RootState } from "./Store";

@injectable()
class ReduxDispatcher {
    constructor(@inject("Store") private store: Store<RootState>) { }

    getDispatch() {
        return this.store.dispatch;
    }

    dispatch(action: Parameters<Store["dispatch"]>[0]){
        const dispatch = this.getDispatch()
        dispatch(action)
    }
}

export default ReduxDispatcher