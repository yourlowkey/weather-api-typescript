import { useState, useEffect, ChangeEvent } from 'react'
import { OptionType,ForecastType } from '../types'
const useForecast = () => {
    const [term, setTerm] = useState<string>('')
    const [options, setOptions] = useState<OptionType[]>([])
    const [city, setCity] = useState<OptionType>()
    const [forecast, setForecast] = useState<ForecastType| null>(null)
    const getSearchOptions = (value: string) => {
        fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}
        &limit=5&appid=${process.env.REACT_APP_API_KEY}`)
            .then((res) => res.json())
            .then((data) => setOptions(data))
    }
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setTerm(value)
        if (value === '') return
        getSearchOptions(value)
    }

    const getForecast = (city: OptionType) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${process.env.REACT_APP_API_KEY}`)
            .then((res) => res.json())
            .then((data) =>
                setForecast(data))
    }
    const onSubmit = () => {
        if (!city) return

        getForecast(city)
    }
    const onOptionSelect = (option: OptionType) => {
        setCity(option)
    }

    useEffect(() => {
        if (city) { setTerm(city.name) }
        setOptions([])
    }, [city])
    return {
        term,
        options,
        forecast,
        onInputChange,
        onOptionSelect,
        onSubmit
    }
}


export default useForecast