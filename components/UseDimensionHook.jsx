import React, { useState } from 'react'

const UseDimensionHook = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    window.addEventListener('resize', () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })

    })
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>{windowSize.width}*{windowSize.height}</h1>
        </div>
    )
}

export default UseDimensionHook