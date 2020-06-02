import React, { useContext, useEffect, useState } from 'react';
import { Chip, Col, Row } from 'react-materialize';
import { Link } from 'react-router-dom';
import { fetchSummaryData } from '../api/api';
import { ModalContentContext } from '../App';
import { CompareCountriesBar } from '../components/CompareCountriesBar';
import { CompareCountryButton } from '../components/CompareCountryButton';
import { CountriesModal } from '../components/CountriesModal';


export const CompareCountries = (props) => {


    const [allCountriesData, setAllCountriesData] = useState([]);
    const { checkedItems, dispatch } = useContext(ModalContentContext);

    useEffect(() => {
        const updateDataUI = (countryParams) => {
            let countryNames = [];

            // User Navigated the route by clicking at nav button thus there is no countries to compare
            // So this explicitly set countryNames with some countrynames
            if (countryParams === 'compare') {
                countryNames = ['india', 'russia', 'united-kingdom', 'italy', 'spain', 'france', 'united-states'];
            } else {
                countryNames = countryParams.split(",")
            }

            dispatch({ 'type': 'CHECK_MULTIPLE_CHECKBOX', data: countryNames })


            fetchSummaryData().then(data => {
                setAllCountriesData(data.Countries);
            })
        }
        updateDataUI(props.match.params.countries);
    }, [props.match.params.countries, dispatch]);



    let countryDataToCompare = allCountriesData.filter(country => checkedItems.indexOf(country.Slug) !== -1);

    return (
        <Row>
            <CountriesModal countries={allCountriesData} />
            <Col l={10} s={12} offset="l1 s0" style={styles.containerCard}>
                <Row style={styles.countryNamesTop}>
                    {/* <h6 className="center">Comparing Countries:</h6> */}
                    {checkedItems.map(country =>
                        <Chip key={country} style={styles.countryChip}>
                            <Link to={`/country/${country}`}>
                                {country}
                            </Link>
                            <i style={styles.closeIcon} onClick={() => dispatch({ type: 'UNCHECK_ITEM', data: country })} className="material-icons">close</i>
                        </Chip>
                    )}
                </Row>

                <Col l={10} s={12} offset="l1 s0" >
                    <Row style={{ float: 'right' }}>
                        <CompareCountryButton title='Add Countries...' />
                    </Row>
                    <Row className="white white-text" style={{ borderRadius: 30 }}>
                        <CompareCountriesBar data={countryDataToCompare} />
                    </Row>
                </Col>
            </Col>
        </Row>
    )
}
const styles = {
    countryNamesTop: {
        textTransform: 'capitalize',
        float: 'center',
        marginTop: 10,
        color: '#fff',
        padding: 10

    },
    countryChip: {
        fontSize: 15,
        float: 'left',
        background: '#eee'
    },
    closeIcon: {
        verticalAlign: 'middle',
        cursor: 'pointer',
        size: 12
    },
    containerCard: {
        background: 'linear-gradient(135deg, #F36265 0%,#961276 100%)',
        borderRadius: 30,
    },
    barContainer: {
        borderRadius: 30,
        padding: 10,
    }
}