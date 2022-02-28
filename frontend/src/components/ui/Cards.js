import React from "react";

import "./ui.scss";

export const AlertCard = ({ children, className, variant }) => {
    return (
        <p className={!variant ? "clear " + className : variant + " df ai-c bra-1 plr-1 " + className}
            style={{ height: "2rem" }}>{children}</p>
    )
}