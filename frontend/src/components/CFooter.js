import React from "react";

const CFooter = e => {
  return (
    <div style={{ height: "7rem", position: "relative", top: "80px", borderTop: ".05rem solid grey"}} className="plr-3 pb-3 pt-1 bst-4">
      <div className="h-100 df jc-sb ai-c mlra" style={{ maxWidth: "1140px" }}>
        <span className="dfc jc-c ai-c f-3">
          <a href="https://t.me/avatar_finance" target="_blank" rel="noopener noreferrer" className=""><b>Telegram</b></a>
        </span>
        <span className="dfc jc-c ai-c f-3">
        </span>
      </div>
    </div>
  );
}

export default CFooter;
