import { useSelector } from 'react-redux'
import { assetHoldingsTotalProjectedValueSelector } from '../state/assetPortfolio/assetPortfolioSelectors'

const formatter = new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 })

const AssetHoldingsProjectedValueTotal = () => {

    const totalValue = useSelector(assetHoldingsTotalProjectedValueSelector)

    return (<>
        Projected portfolio value: {formatter.format(totalValue)}
    </>)
}

export default AssetHoldingsProjectedValueTotal