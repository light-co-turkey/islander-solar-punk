import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { deleteMedia, getMedia } from '../actions/mediaActions';
import { useDispatch, useSelector } from 'react-redux';
import { TextBtn } from './ui/Buttons';
import { useHistory, useLocation } from 'react-router-dom';
import { setUserProps } from '../actions/userActions';
import { nestUserPI } from '../actions/paramActions';

const ViewImage = props => {
    const { createdBy, usageType, variant, size } = props
    const location = useLocation()
    const param = useSelector(state => state.param)

    let clientLoc = location.pathname
    let usersList = param.usersList

    const dispatch = useDispatch()
    const [id, setId] = useState("")
    const [isLoaded, setIsLoaded] = useState(true);
    const [mediaEncode, setMediaEncode] = useState(null);
    const [mediaType, setMediaType] = useState(null);

    let checkVar = variant === "profilePage"

    let sizee = size === "lg" ? {
        width: "150px", height: "150px"
    } : size === "md" ? {
        width: "100px", height: "100px"
    } : {
        width: "50px", height: "50px"
    }

    let handleSets = async x => {
        setMediaEncode(x.mediaBuffer)
        setMediaType(x.mediaType)
    }

    const handleOnLoad = () => {
        setIsLoaded(false)
        let newProps = { field: "pILoaded", prop: true }

        let filter = async () => {
            return await Promise.resolve(usersList.filter(x => x._id === createdBy)[0])
        }
        filter().then((x) => {
            if (x.mediaBuffer) {
                dispatch(setUserProps(newProps))
                setId(x.uPIId)
                handleSets(x)
                    .then(setIsLoaded(true))
            } else {
                console.log("getting media")
                dispatch(getMedia({ createdBy, usageType, usersList }))
                    .then(x => {
                        if (x !== undefined) {
                            handleSets(x)
                            setId(x.id)
                            if (checkVar) {
                                dispatch(setUserProps(newProps))
                            }
                        }
                        setIsLoaded(true)
                    })
                    .catch(err => console.log(err))
            }
        })
    };

    useEffect(() => {
        handleOnLoad()
    }, [param.isLoaded]);

    let handleOnRemoveClick = () => {
        if (window.confirm("Delete This Media!?")) {
            dispatch(deleteMedia({ id, handleSets, setIsLoaded })).then(res => {
                if (checkVar) {
                    let newProps = { field: "pILoaded", prop: false }
                    let medias = { mediaBuffer: null, mediaType: null, uPIId: null }
                    dispatch(setUserProps(newProps))
                    dispatch(nestUserPI({ usersList, medias, createdBy }))
                }
            })
        }
    }

    /* let baseToImg = `data:${mediaType};base64,${mediaEncode}`*/
    return (
        <>{!isLoaded ? <Loading /> :
            <>{!mediaEncode || !mediaType ? null :
                <span className='dfc jc-c ai-c w-mc mlra p-3'>
                    {clientLoc !== "/profile" ? null : <TextBtn className="mla" variant="warning" onClick={() => handleOnRemoveClick()}><b>X</b></TextBtn>}
                    <img className='bra-3' style={sizee} src={mediaEncode} alt="general-media" />
                </span>}</>
        }</>
    )
}

export default ViewImage;