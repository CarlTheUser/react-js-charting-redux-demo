import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { derivedFieldsSelector } from '../state/assetPortfolio/assetPortfolioSelectors'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
            display: false
        },
        title: {
            display: true,
            text: 'Asset Holdings',
        },
    },
};

const chartDataSelector = createSelector([derivedFieldsSelector], (assetHoldings) => {

    console.log('expensive bar chart data calculation running...')

    return {
        labels: assetHoldings.map(x => x.asset.name),
        datasets: [{
            label: 'Projected Value',
            data: assetHoldings.map(x => x.projectedValue),
            backgroundColor: 'rgb(14 165 233)'
        }]
    }
})

const AssetHoldingsBarChart = () => {

    const chartData = useSelector(chartDataSelector)

    return (<Bar
        options={options}
        data={chartData} />)
}

export default AssetHoldingsBarChart