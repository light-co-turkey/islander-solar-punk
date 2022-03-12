import React, { useEffect } from 'react';
import { RadioInput } from './ui/Buttons';

const SettingsMenager = props => {
    const {radioList, handleChange, checks} = props
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <span className='df jc-sb ai-c mxw-800 fw mlra pt-3'>
        {radioList.map((x, index) =>
            <RadioInput key={index} label={x.label} value={x.value} handleChange={handleChange} isChecked={checks[x.value]} />
        )}
    </span>
    )
}

export default SettingsMenager