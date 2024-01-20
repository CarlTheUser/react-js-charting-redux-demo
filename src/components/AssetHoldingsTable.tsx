import { FC, HTMLProps } from 'react'
import { AssetHolding, updatePrincipalAmount, updateProjectedAnnualReturnPercentage } from '../state/assetPortfolio/assetPortfolioSlice'
import { useDispatch } from 'react-redux'

import styles from './AssetHoldingsTable.module.css'

// const formatter = new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 })


const AssetHoldingsTableRow: FC<{
    item: AssetHolding
} & Omit<HTMLProps<HTMLTableRowElement>, 'children'>> = ({ item, ...rest }) => {

    const dispatch = useDispatch()

    return <tr {...rest}>
        <td>{item.asset.name}</td>
        <td>
            <input
                type='number'
                className='w-100 text-right'
                min={0}
                value={item.asset.projectedAnnualReturnPercentage}
                onChange={(e) => dispatch(updateProjectedAnnualReturnPercentage({ id: item.id, projectedAnnualReturnPercentage: e.target.valueAsNumber }))}
            />
        </td>
        <td>
            <input
                type='number'
                className='w-100 text-right'
                min={0}
                value={item.principalAmount}
                onChange={(e) => dispatch(updatePrincipalAmount({ id: item.id, principalAmount: e.target.valueAsNumber }))}
            />
        </td>
    </tr>
}

export type AssetHoldingsTableProps = {
    items: AssetHolding[]
} & Omit<HTMLProps<HTMLTableElement>, 'children'>

const AssetHoldingsTable: FC<AssetHoldingsTableProps> = ({ items, className, ...rest }) => {



    return (<table className={`${styles['asset-table']} ${className ?? ''}`} {...rest}>
        <thead>
            <tr>
                <th>Asset</th>
                <th>Projected Annual Return %</th>
                <th>Principal Amount</th>
            </tr>
        </thead>
        <tbody>
            {items.map(x => <AssetHoldingsTableRow key={x.id} item={x} />)}
        </tbody>
    </table>)
}

export default AssetHoldingsTable