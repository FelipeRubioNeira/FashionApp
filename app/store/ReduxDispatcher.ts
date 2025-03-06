import { inject, injectable } from "tsyringe";
import { Store } from "@reduxjs/toolkit";
import { RootState } from "./Store";

@injectable()
class ReduxDispatcher {
    constructor(@inject("Store") private store: Store<RootState>) { }

    /**
     * 
     * @param action Este parametro es una forma de detectar el tipo que nos llegada del store
     */
    dispatch(action: Parameters<Store["dispatch"]>[0]){
        this.store.dispatch(action)
    }
}

export default ReduxDispatcher