import { configureStore } from "@reduxjs/toolkit";
import assetPortfolioSlice from "./assetPortfolio/assetPortfolioSlice";

export const store = configureStore({
    reducer: {
        assetPortfolio: assetPortfolioSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch