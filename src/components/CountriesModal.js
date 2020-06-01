import React, { useContext } from 'react';
import { Button, Modal, Row } from 'react-materialize';
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
            style={{ width: '100%', maxHeight: '150%', ...styles.modal, overflow: 'hidden', color: '#484848' }}
            open={countryModalOpen}
            fixedFooter={true}
            bottomSheet={true}
            options={{
                onCloseEnd: closeModal
            }
            }
            actions={<>
                <Button waves="light" className="red darken-2 pink" onClick={onClearModal}>Clear</Button>
                <Button style={styles.footerButton} className='green' onClick={onCompareSubmit}>Compare</Button>

            </>}
        ><Button style={styles.footerButton} modal="close" waves="light" className="red darken-2 right" onClick={closeModal}>Close</Button>
            <h6 style={{ marginTop: -15, textAlign: 'center' }}>Select Countries (Min: 2, Max: 12)</h6>
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
        textTransform: 'capitalize'
    },
    footerButton: {
        marginLeft: 20
    }
}