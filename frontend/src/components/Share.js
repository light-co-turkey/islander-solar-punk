/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import React, { Component } from 'react';
import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon,
    TelegramIcon
} from 'react-share';

import './Share.css';

const Share = props => {
    const {shareUrl, title} = props

    return (
        <div className="Demo__container pt-2">
            <div className="Demo__some-network">
                <FacebookShareButton
                    url={shareUrl}
                    quote={title}
                    className="Demo__some-network__share-button"
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>  
            </div>

{/*             <div className="Demo__some-network">
                <FacebookMessengerShareButton
                    url={shareUrl}
                    appId="521270401588372"
                    className="Demo__some-network__share-button"
                >
                    <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>
            </div> */}

            <div className="Demo__some-network">
                <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
            </div>

            <div className="Demo__some-network">
                <TelegramShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                >
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
            </div>

            <div className="Demo__some-network">
                <WhatsappShareButton
                    url={shareUrl}
                    title={title}
                    separator=":: "
                    className="Demo__some-network__share-button"
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </div>

            <div className="Demo__some-network">
                <EmailShareButton
                    url={shareUrl}
                    subject={title}
                    body="body"
                    className="Demo__some-network__share-button"
                >
                    <EmailIcon size={32} round />
                </EmailShareButton>
            </div>
        </div>
    );
}

export default Share;