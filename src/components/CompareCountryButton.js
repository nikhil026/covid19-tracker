import React, { useContext } from 'react';
import { Button } from 'react-materialize';
import { ModalContext } from '../App';




export const CompareCountryButton = (props) => {

    const { dispatch } = useContext(ModalContext);

    const openModal = () => {
        dispatch({ type: 'OPEN_MODAL' });
    }

    return (
        <Button
            style={{
                background: 'linear-gradient(135deg, #42e695 0%,#3bb2b8 100%)',
                borderRadius: 30,
                fontWeight: 'bolder',
                width: '100%'
            }}
            onClick={openModal} className='green'>
            {props.title || 'Compare Countries'}
        </Button>
    )
}