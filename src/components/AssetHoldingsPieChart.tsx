import { createSelector } from '@reduxjs/toolkit';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { derivedFieldsSelector } from '../state/assetPortfolio/assetPortfolioSelectors';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const
        },
        title: {
            display: true,
            text: 'Asset Allocation',
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
            backgroundColor: [
                'rgb(253 224 71)',
                'rgb(115 115 115)',
                'rgb(34 197 94)',
                'rgb(249 115 22)'
            ]
        }]
    }
})

const AssetHoldingsPieChart = () => {

    const chartData = useSelector(chartDataSelector)

    return (<Pie
        data={chartData}
        options={options}
    />)
}

export default AssetHoldingsPieChart