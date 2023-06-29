import React from 'react'
import useForecast from '../hooks/useForecast'
type ClearResultButtonProps = {
    clearResult:()=>void
}
const ClearResultButton = (prop:ClearResultButtonProps) => {
    return (
        <button onClick={prop.clearResult}>Go Back</button>
    )
}

export default ClearResultButton