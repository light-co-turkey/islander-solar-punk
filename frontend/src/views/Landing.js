import React, { useEffect } from 'react';

import Pdf3 from '../assets/pdf3.jpg'
import Pdf4 from '../assets/pdf4.jpg'

export const Landing = e => {

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let style= {
        width: "100%",
        height: "auto"
    }

    return (
        <div style={{maxWidth: "800px"}} className=' mlra'>
            <img style={style} src={Pdf4} />
            <img style={style} src={Pdf3} />
        </div>
    )
}