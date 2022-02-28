import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { TextBtn } from './ui/Buttons';
import { postImage } from '../actions/mediaActions';
import { arrayBuffertoBase64 } from '../utils/basicUtils';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const PostImage = props => {
    const history = useHistory();
    const dispatch = useDispatch()
    const {usageType, createdBy, variant, className} = props

    let checkVar = variant === "profilePage"

    const [isLoaded, setIsLoaded] = useState(true);
    const [arrayBuffer, setArrayBuffer] = useState();
    const [mediaEncode, setMediaEncode] = useState();

    useEffect(() => {
    }, []);


    async function Main() {
        const file = document.querySelector('#myFile').files[0];
        setMediaEncode(await arrayBuffertoBase64(file));
    }


    const handleOnSubmit = () => {
        setIsLoaded(false)
        let postImageReq = {
            setIsLoaded: setIsLoaded,
            mediaEncode: mediaEncode,
            mediaType: arrayBuffer.type,
            usageType: usageType,
            createdBy: createdBy
        }
        dispatch(postImage(postImageReq, history))
    };

    const onImageChange = async event => {
        let arrayBuffer = event
        setArrayBuffer(arrayBuffer)
        await Main()
    }

    const blob = !arrayBuffer ? null : new Blob([arrayBuffer])
    const srcBlob = !arrayBuffer ? null : URL.createObjectURL(blob);

    const hiddenFileInput = React.useRef(null);
    const handleClick = event => { hiddenFileInput.current.click(); };
    const handleChange = event => { const fileUploaded = event.target.files[0]; onImageChange(fileUploaded); };

    const inputField =
        <span className='mr-2'>
            <TextBtn variant="info" onClick={handleClick}>
                Select Profile Photo
            </TextBtn>
            <input type="file"
                id="myFile"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </span>

    return (
        <>{!isLoaded ? <Loading /> :
            <span className={'dfc jc-c ai-c ' + className}>
                <span className='df'>
                    {inputField}
                    <TextBtn variant="info" disabled={!arrayBuffer} onClick={() => handleOnSubmit()}>Upload</TextBtn>
                </span>
                {!arrayBuffer ? null : <img className='p-3 bra-3' style={{ width: "150px", height: "150px" }} src={srcBlob} alt="preview" />}
            </span>
        }</>
    )
}

export default PostImage;