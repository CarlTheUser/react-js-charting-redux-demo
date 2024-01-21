import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setHoldingPeriodInMonths } from '../state/assetPortfolio/assetPortfolioSlice'
import { getFormattedDurationTextByMonthsCount } from '../util'



const AssetHoldingPeriodRangeSlider = () => {

    const [value, setValue] = useState<number>(0)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(setHoldingPeriodInMonths(value))

    }, [value])

    useEffect(() => {

        console.log(`holding period value changed: ${value}`)

    }, [value])

    const valueTexts: string = useMemo(() => getFormattedDurationTextByMonthsCount(value), [value])

    return (
        <div className='flex flex-row gap-2 items-center'>
            Holding Period
            <input
                className='flex-grow max-w-96'
                type='range'
                min='0'
                max='120'
                step={1}
                value={value}
                onChange={(e) => setValue(e.target.valueAsNumber)}
            />
            {valueTexts}
        </div>
    )
}

export default AssetHoldingPeriodRangeSlider