export type OptionType = {
    name: string
    lat: number
    lon: number
}

export type ForecastType = {
    name: string
    country: string
    dt: number
    main: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_max: number
        temp_min: number
    }
    weather: [
        {
            main: string
            icon: string
            description: string
        }
    ]
    wind: {
        speed: number
        gust: number
        deg: number
    }
    clouds: {
        all: number
    }
    visibility: number

    sys: {
        country: string,
        sunrise: number,
        sunset: number
    }
}