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
import { assetHoldingsTrendSelector } from '../state/assetPortfolio/assetPortfolioSelectors';
import { useSelector } from 'react-redux';
import { getFormattedDurationTextByMonthsCount } from '../util';

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

    const pointRadius = firstItem.projectedValueTrend.length < 10
        ? 3
        : firstItem.projectedValueTrend.length < 20
            ? 2
            : 1

    const borderWidth = firstItem.projectedValueTrend.length < 10
        ? 3
        : firstItem.projectedValueTrend.length < 20
            ? 2
            : 1

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
                borderColor: color,
                backgroundColor: color,
                pointRadius: pointRadius,
                borderWidth: borderWidth,
            }
        })
    }
})


const AssetHoldingsProjectedProgressLineChart = () => {

    const chartData = useSelector(chartDataSelector)

    return (<Line options={options} data={chartData} />)
}

export default AssetHoldingsProjectedProgressLineChart