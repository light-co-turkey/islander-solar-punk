import React from "react";

import "./styles.scss";

let pill = {
    pre: {
        n: " bra-1",
        l: " brl-bt-1 br-0",
        m: " bra-0 bl-0 br-0",
        r: " brr-bt-1"
    },
    input: {
        n: " bra-1",
        l: " brl-bt-1",
        m: " bra-0",
        r: " brr-bt-1"
    }
}

export const InputGroup = ({ children, className, style }) => {
    return (
        <div className={"df ai-c jc-c w-100 h-mc " + className}
            style={style}>{children}</div>
    )
}

export const InputPrep = ({ children, className, variant }) => {
    let setVariant = variant === "pill" ? pill.pre.n : variant === "pillL" ? pill.pre.l
        : variant === "pillM" ? pill.pre.m : variant === "pillR" ? pill.pre.r : pill.pre.n
    return (
        <p className={className + " df jc-c ai-c plr-2 b-i " + setVariant}
            style={{ height: "2rem" }}>{children}</p>
    )
}

export const Input = ({ className, variant, height, width, padding, ...rest }) => {
    let setVariant = variant === "pill" ? pill.input.n : variant === "pillL" ? pill.input.l
        : variant === "pillM" ? pill.input.m : variant === "pillR" ? pill.input.r : pill.input.n
    return (
        <input {...rest}
            className={className + " " + setVariant}
            style={{
                width: !width ? "inherit" : width,
                height: !height ? "2rem" : height,
                padding: !padding ? "0 0 0 .3rem" : padding
            }} />
    )
}

export const TextArea = ({ className, variant, height, width, padding, ...rest }) => {
    let setVariant = variant === "pill" ? pill.input.n : variant === "pillL" ? pill.input.l
        : variant === "pillM" ? pill.input.m : variant === "pillR" ? pill.input.r : pill.input.n
    return (
        <textarea {...rest}
            className={className + " b-i " + setVariant}
            style={{
                width: !width ? "inherit" : width,
                height: !height ? "2rem" : height,
                padding: !padding ? "0 0 0 .1rem" : padding
            }} />
    )
}