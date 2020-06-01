import React, { useContext } from 'react';
import { Checkbox, Col } from 'react-materialize';
import {  ModalContentContext } from '../App'


export const CountriesModalContent = (props) => {

    const { checkedItems, dispatch } = useContext(ModalContentContext);

    const updateSelectedList = (e) => {
        if (e.target.checked) {
            if (checkedItems.length === 12) {
                alert('Max 12 countries can be compared!');
                return;
            } else {
                dispatch({ type: 'CHECK_ITEM', data: e.target.value })
            }

        } else {
            dispatch({ type: 'UNCHECK_ITEM', data: e.target.value })
        }
    }


    return (
        props.countries.map(({ Slug }, index) => {
            return (
                <Col l={3} s={6} key={Slug}>
                    <Checkbox
                        style={style.checkBox}
                        label={Slug}
                        value={Slug}
                        name={Slug}
                        onChange={updateSelectedList}
                        checked={checkedItems.indexOf(Slug) !== -1}
                        filledIn={true}
                        id={Slug}
                        key={Slug}
                    />
                </Col>

            )
        }))

}


const style = {
    checkBox: {
        fontFamily: 'montserrat',
        fontSize: 14,
        color: '#484848 !important',
        textTransform: 'capitalize'
    }
}