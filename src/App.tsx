import Search from './components/Search'
import useForecast from './hooks/useForecast'
import Forecast from './components/Forecast'
import { useEffect } from 'react'
const App = () => {
 const {
  term,
  options,
  forecast,
  onInputChange,
  onOptionSelect,
  onSubmit,
  clearResult
 }= useForecast()
 
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      {forecast ? (<Forecast data={forecast} clearResult={clearResult}/>) : (
        <Search term={term} options={options} onInputChange={onInputChange} onOptionSelect={onOptionSelect} onSubmit={onSubmit} />
      )}
    </main>
  )
}

export default App
