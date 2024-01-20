import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setHoldingPeriodInMonths } from '../state/assetPortfolio/assetPortfolioSlice'

const monthsInAYear = 12

const AssetHolingPeriodRangeSlider = () => {

    const [value, setValue] = useState<number>(0)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(setHoldingPeriodInMonths(value))

    }, [value])

    useEffect(() => {

        console.log(`holding period value changed: ${value}`)

    }, [value])

    const valueTexts: string = useMemo(() => {

        if (value < monthsInAYear) {

            return `${value} ${value !== 1 ? 'months' : 'month'}`

        } else {

            const yearCount = Math.floor(value / 12)

            const monthCount = Math.floor(value % monthsInAYear)

            const monthText = monthCount > 0 ? ` ${monthCount} ${(monthCount > 1 ? 'months' : 'month')}` : ''

            return `${yearCount} ${(yearCount > 1 ? 'years' : 'year')}${monthText}`
        }

        return ''

    }, [value])

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

export default AssetHolingPeriodRangeSlider