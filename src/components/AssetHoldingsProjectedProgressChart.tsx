import { createSelector } from '@reduxjs/toolkit';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'
import { derivedFieldsSelector } from '../state/assetPortfolio/assetPortfolioSelectors';
import { RootState } from '../state/store';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Asset Trend Projection',
        },
    },
}

const assetHoldings = (state: RootState) => state.assetPortfolio.holdings

const assetHoldingsTrendSelector = createSelector([assetHoldings], (assetHoldings) => {

    console.log('expensive bar chart data calculation running...')

    return assetHoldings.map(assetHolding => {

        const valueProjectionTrend: {
            holdingPeriodInMonths: number
            projectedValue: number
        }[] = assetHolding.holdingPeriodInMonths > 0
                ? Array.from({ length: assetHolding.holdingPeriodInMonths }, (_, index) => index)
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

const chartDataSelector = createSelector([assetHoldingsTrendSelector], (assetHoldings) => {

    const firstItem = assetHoldings[0]

    if (!firstItem) {
        return {
            labels: [],
            datasets: []
        }
    }

    return {
        labels: Array.from({ length: firstItem.projectedValueTrend.length }, (_, index) => index),
        datasets: assetHoldings.map(x => {

            let color: string

            switch (x.asset.name) {
                case 'Gold': color = 'rgb(253 224 71)'
                    break
                case 'Treasury Bond': color = 'rgb(115 115 115)'
                    break
                case 'Stocks': color = 'rgb(34 197 94)'
                    break
                case 'Cryptocurrencies': color = 'rgb(249 115 22)'
                    break
                default: color = 'rgb(96 165 250)'
                    break
            }

            return {
                label: x.asset.name,
                data: x.projectedValueTrend.map(x => x.projectedValue),
                borderColor: color,
                backgroundColor: color,
            }
        })
    }
})


const AssetHoldingsProjectedProgressChart = () => {

    const chartData = useSelector(chartDataSelector)


    return (<Line options={options} data={chartData} />)
}

export default AssetHoldingsProjectedProgressChart