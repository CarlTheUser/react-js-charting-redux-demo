import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { AssetHolding } from "./assetPortfolioSlice"

const assetHoldings = (state: RootState) => state.assetPortfolio.holdings

export const derivedFieldsSelector = createSelector([assetHoldings], (assetHoldings) => {

    console.log('expensive calculation running...')

    return assetHoldings.map((assetHolding: AssetHolding) => ({
        ...assetHolding,
        projectedValue: assetHolding.holdingPeriodInMonths > 0 ? ((((assetHolding.asset.projectedAnnualReturnPercentage / 100) * assetHolding.principalAmount) / 12) * assetHolding.holdingPeriodInMonths) + assetHolding.principalAmount : assetHolding.principalAmount
    }))
})

export const assetHoldingsTotalProjectedValueSelector = createSelector([derivedFieldsSelector], (assetHoldings) => {

    return assetHoldings.reduce((accumulator: number, current) => accumulator + current.projectedValue, 0)
})

export const assetHoldingsTrendSelector = createSelector([assetHoldings], (assetHoldings) => {

    console.log('expensive bar chart data calculation running...')

    return assetHoldings.map(assetHolding => {

        const valueProjectionTrend: {
            holdingPeriodInMonths: number
            projectedValue: number
        }[] = assetHolding.holdingPeriodInMonths > 0
                ? Array.from({ length: assetHolding.holdingPeriodInMonths + 1 }, (_, index) => index)
                    .map(x => ({
                        holdingPeriodInMonths: x,
                        projectedValue: x > 0 ? ((((assetHolding.asset.projectedAnnualReturnPercentage / 100) * assetHolding.principalAmount) / 12) * x) + assetHolding.principalAmount : assetHolding.principalAmount
                    }))
                : []

        return {
            id: assetHolding.id,
            asset: assetHolding.asset,
            projectedValueTrend: valueProjectionTrend
        }
    })
})
