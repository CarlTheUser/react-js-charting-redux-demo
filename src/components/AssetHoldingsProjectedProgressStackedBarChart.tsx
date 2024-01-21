import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { assetHoldingsTrendSelector } from '../state/assetPortfolio/assetPortfolioSelectors'
import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { getFormattedDurationTextByMonthsCount } from '../util'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Asset Allocation Projection',
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
    interaction: {
        mode: 'x' as const
    }
}

const chartDataSelector = createSelector([assetHoldingsTrendSelector], (assetHoldings) => {

    const firstItem = assetHoldings[0]

    if (!firstItem) {
        return {
            labels: [],
            datasets: []
        }
    }

    return {
        labels: Array.from({ length: firstItem.projectedValueTrend.length }, (_, index) => index !== 0 ? getFormattedDurationTextByMonthsCount(index) : 'initial'),
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
                backgroundColor: color,
            }
        })
    }
})

const AssetHoldingsProjectedProgressStackedBarChart = () => {

    const chartData = useSelector(chartDataSelector)

    return (<Bar options={options} data={chartData} />)
}

export default AssetHoldingsProjectedProgressStackedBarChart