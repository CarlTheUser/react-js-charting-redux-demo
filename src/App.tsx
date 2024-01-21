import { useSelector } from 'react-redux'
import { RootState } from './state/store'
import AssetHoldingsTable from './components/AssetHoldingsTable'
import AssetHoldingPeriodRangeSlider from './components/AssetHoldingPeriodRangeSlider'
import AssetHoldingsBarChart from './components/AssetHoldingsBarChart'
import AssetHoldingsProjectedValueTotal from './components/AssetHoldingsProjectedValueTotal'
import AssetHoldingsPieChart from './components/AssetHoldingsPieChart'
import AssetHoldingsProjectedProgressLineChart from './components/AssetHoldingsProjectedProgressLineChart'
import AssetHoldingsProjectedProgressStackedBarChart from './components/AssetHoldingsProjectedProgressStackedBarChart'
import { AssetHolding } from './state/assetPortfolio/assetPortfolioSlice'

function App() {

  const assetHoldings: AssetHolding[] = useSelector((state: RootState) => state.assetPortfolio.holdings)

  return (
    <div className='container min-h-screen mx-auto md:px-4'>
      <div className='min-w-96 max-w-screen-lg shadow-md border w-full my-12 rounded-lg bg-white'>
        <div className='p-3'>
          <h1 className='font-semibold'>Asset Allocation</h1>
        </div>
        <div className='p-3'>
          <AssetHoldingsTable items={assetHoldings} />
        </div>
        <div className='px-3 mb-3'>
          <AssetHoldingPeriodRangeSlider />
        </div>
        <div className='px-3'>
          <AssetHoldingsProjectedValueTotal />
        </div>
        <div className='border border-dashed mx-2 my-3'></div>
        <div className='px-3'>
          <div className='grid grid-cols-2 gap-y-2'>
            <div className='flex items-center'>
              <AssetHoldingsBarChart />
            </div>
            <div>
              <AssetHoldingsPieChart />
            </div>
            <div className='col-span-2'>
              <AssetHoldingsProjectedProgressLineChart />
            </div>
            <div className='col-span-2'>
              <AssetHoldingsProjectedProgressStackedBarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
