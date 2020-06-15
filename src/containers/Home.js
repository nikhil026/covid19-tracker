import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-materialize';
import { fetchSummaryData } from '../api/api';
import { CountriesList } from '../components/CountriesList';
import { CountriesModal } from '../components/CountriesModal';
import { CustomBarCountries } from '../components/CustomBarCountries';
import { GlobalCards } from '../components/GlobalCards';
import { useIsMountedRef } from '../hooks/useIsMountedRef';

export const Home = () => {

    const [countries, setCountries] = useState([]);
    const [global, setGlobal] = useState({});
    const [sortBy, setSortBy] = useState('TotalConfirmed');
    const [sortDirection, setSortDirection] = useState(0);
    const isMountedRef = useIsMountedRef();


    useEffect(() => {
        if (isMountedRef.current) {
            fetchSummaryData().then(data => {
                setCountries(() => data.Countries);
                setGlobal(() => data.Global)
            });
        }
    }, [isMountedRef]);


    const onSortChange = (e) => {
        setSortBy(e.target.value);
    }

    const onSortReverse = () => {
        setSortDirection(Number(!sortDirection));
    }

    const renderCountriesListAndSelectButton = (countries) => {
        if (countries.length === 0)
            return null
        return (
            <Row className="center card" style={{ paddingTop: 10, borderRadius: 30, ...styles.countryListHeader }}>
                <h5 className="">All Countries</h5>
                <Col className="white" l={12} s={12}>
                    <CountriesList countries={countries} sortBy={sortBy} sortDirection={sortDirection} onSortReverse={onSortReverse} onSortChange={onSortChange} />

                </Col>
            </Row>
        )

    }
    return (
        <div className="App">
            <CountriesModal countries={countries} />
            <Row>
                <Col l={10} offset='l1 s0'>
                    <h5 className="center">Global Covid 19 Stats Tracker </h5>
                    <GlobalCards global={global} />

                    {countries.length > 0 && <CustomBarCountries countries={countries} />}

                    {renderCountriesListAndSelectButton(countries)}
                </Col>
            </Row>
        </div>
    );
}

const styles = {

}