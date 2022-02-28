import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Pdf from '../assets/pdf.jpg'
import Pdf1 from '../assets/pdf1.jpg'
import Pdf2 from '../assets/pdf2.jpg'
import Pdf3 from '../assets/pdf3.jpg'
import Pdf4 from '../assets/pdf4.jpg'
import Pdf5 from '../assets/pdf5.jpg'

export const Landing = e => {

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let style= {
        width: "100%",
        height: "max-content"
    }

    return (
        <div style={{maxWidth: "1000px"}} className=' mlra'>
            <img style={style} src={Pdf} />
            <img style={style} src={Pdf1} />
            <img style={style} src={Pdf2} />
            <img style={style} src={Pdf3} />
            <img style={style} src={Pdf4} />
            <img style={style} src={Pdf5} />
        </div>
    )
}