import { useSelector } from 'react-redux'
import { assetHoldingsTotalProjectedValueSelector } from '../state/assetPortfolio/assetPortfolioSelectors'

const formatter = new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 })

const AssetHoldingsProjectedValueTotal = () => {

    const totalValue = useSelector(assetHoldingsTotalProjectedValueSelector)

    return (<>
        <p>Projected portfolio value: <span className='font-semibold'>{formatter.format(totalValue)}</span></p>
    </>)
}

export default AssetHoldingsProjectedValueTotal