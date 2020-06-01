import React, { useContext } from 'react';
import { Button, Icon, Modal, Row } from 'react-materialize';
import { useHistory } from 'react-router-dom';
import { ModalContentContext, ModalContext } from '../App';
import { CountriesModalContent } from './CountriesModalContent';

export const CountriesModal = (props) => {

    const history = useHistory();

    const { countryModalOpen, dispatch } = useContext(ModalContext);
    const { checkedItems } = useContext(ModalContentContext);

    const closeModal = () => {
        dispatch({ type: 'CLOSE_MODAL' });
    };

    const onCompareSubmit = () => {

        closeModal();

        if (checkedItems.length > 1 && checkedItems.length <= 12) {
            history.push(`/compare-countries/${checkedItems.join(",")}`);
        } else {
            alert('Select Atleast 2 counrties...');
        }
    }

    const onClearModal = () => {
        dispatch({ type: 'RESET_ALL_CHECKBOX' });

    }

    return (
        <Modal
            style={styles.modal}
            open={countryModalOpen}
            fixedFooter={true}
            options={{ onCloseEnd: closeModal }}
            actions={<>
                <Button waves="light" className="red darken-2 pink" onClick={onClearModal}>Clear</Button>
                <Button style={styles.footerButton} className='green' onClick={onCompareSubmit}>Compare</Button>
            </>}
        >
            <Button
                modal="close"
                className="white right material-icons browser-default"
                onClick={closeModal}
                style={styles.closeButton}>
                <Icon className="modal-icons black-text center">close</Icon>
            </Button>
            <Row>
                <CountriesModalContent countries={props.countries} />
            </Row>
        </Modal>
    )
}


const styles = {
    modal: {
        fontFamily: 'montserrat',
        fontSize: 14,
        color: '#484848 !important',
        textTransform: 'capitalize',
        borderRadius: 30,
        width: window.innerWidth > 600 ? '70%' : '100%',
        height: window.innerHeight > 600 ? '100%' : '170%'
    },
    footerButton: {
        marginLeft: 20,
        cursor: 'pointer'
    },
    closeButton: {
        borderRadius: 40,
        height: 40,
        width: 40,
        top: 0,
        padding: 0,
        marginTop: -30,
        zIndex: 10000
    }
}