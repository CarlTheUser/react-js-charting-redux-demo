
const monthsInAYear = 12

export function getFormattedDurationTextByMonthsCount(countOfMonths: number): string {

    if (countOfMonths < monthsInAYear) {

        return `${countOfMonths} ${countOfMonths > 1 ? 'months' : 'month'}`

    } else {

        const yearCount = Math.floor(countOfMonths / 12)

        const monthCount = Math.floor(countOfMonths % monthsInAYear)

        const monthText = monthCount > 0 ? ` ${monthCount} ${(monthCount > 1 ? 'months' : 'month')}` : ''

        return `${yearCount} ${(yearCount > 1 ? 'years' : 'year')}${monthText}`
    }

    return ''

}