import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type Asset = {
    name: string
    projectedAnnualReturnPercentage: number
}

export type AssetHolding = {
    id: number
    asset: Asset
    principalAmount: number
    holdingPeriodInMonths: number
}

type AssetPortfolioState = {
    holdings: AssetHolding[]
}

const initialState: AssetPortfolioState = {
    holdings: [{
        id: 1,
        asset: {
            name: 'Gold',
            projectedAnnualReturnPercentage: 7
        },
        principalAmount: 200000,
        holdingPeriodInMonths: 1
    }, {
        id: 2,
        asset: {
            name: 'Treasury Bond',
            projectedAnnualReturnPercentage: 2
        },
        principalAmount: 54000,
        holdingPeriodInMonths: 1
    }, {
        id: 3,
        asset: {
            name: 'Stocks',
            projectedAnnualReturnPercentage: 12
        },
        principalAmount: 77000,
        holdingPeriodInMonths: 1
    }, {
        id: 4,
        asset: {
            name: 'Cryptocurrencies',
            projectedAnnualReturnPercentage: 22
        },
        principalAmount: 94000,
        holdingPeriodInMonths: 1
    }]
}

const assetPortfolioSlice = createSlice({
    name: 'assetPortfolio',
    initialState: initialState,
    reducers: {
        setHoldingPeriodInMonths: (state, action: PayloadAction<number>) => {

            console.log(`setHoldingPeriodInMonths called. value: ${action.payload}`)

            state.holdings.forEach((item) => {
                item.holdingPeriodInMonths = action.payload
            })
        },
        updatePrincipalAmount: (state, action: PayloadAction<{ id: number, principalAmount: number }>) => {

            const existing = state.holdings.find(x => x.id === action.payload.id)

            if (existing) {

                existing.principalAmount = action.payload.principalAmount
            }
        },
        updateProjectedAnnualReturnPercentage: (state, action: PayloadAction<{ id: number, projectedAnnualReturnPercentage: number }>) => {

            const existing = state.holdings.find(x => x.id === action.payload.id)

            if (existing) {

                existing.asset.projectedAnnualReturnPercentage = action.payload.projectedAnnualReturnPercentage
            }
        }
    }
})

export const { setHoldingPeriodInMonths, updatePrincipalAmount, updateProjectedAnnualReturnPercentage } = assetPortfolioSlice.actions

export default assetPortfolioSlice.reducer