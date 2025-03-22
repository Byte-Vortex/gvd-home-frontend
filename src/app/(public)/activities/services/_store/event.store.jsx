"use client"

import { createContext, useContext, useState } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
const StoreContext = createContext(null)


/*
The global store of this application, I first thought of just using context, but to prevent
re-renders on context value change I thought of using zustand as the external store, but then I read this article
https://tkdodo.eu/blog/zustand-and-react-context
so I thought of going with a mixture,

from the official docs of zustand I also found out the simple way to persist the zustand values to local storage.
*/
export const EventStoreProvider = ({ children }) => {

    const [store] = useState(() => {
        return createStore(

            immer((set) => ({
                /*
                {
                    current: "form" | "payment" | "settled"
                    meta: {

                    }
                }
                */
                tabState: {
                    current: "form"
                },
                actions: {

                    setTab: (tabValue) => {
                        set(state => {
                            state.tabState = tabValue
                        })
                    }
                },

            })
            )
        )

    })

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}

export const useEventStore = (selector) => {

    const store = useContext(StoreContext)

    if (!store) {

        throw new Error('Missing StoreProvider')

    }

    return useZustandStore(store, selector)

}