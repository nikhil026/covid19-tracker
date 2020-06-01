import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row, Switch } from 'react-materialize';
import { useHistory } from 'react-router-dom';
import { fetchCountryAllData } from '../api/api';
import { CustomDoughnut } from '../components/CustomDoughnut';
import { CustomLine } from '../components/CustomLine';
import { Loader } from '../components/Loader';
import { SearchBar } from '../components/SearchBar';
import { commonConfigForLineGraph, convertCumulativeToAccumulative, countryAutocomplete, countryToSlug } from '../utils/index';


export const Country = (props) => {

    const history = useHistory();
    const [selectedTime, setSelectedTime] = useState(61);
    const [countryName, setCountryName] = useState('india');
    const [cumulativeStats, setCumulativeStats] = useState(false);
    const [statsObject, setStatsObject] = useState({
        labels: [],
        confirmed: {
            ...commonConfigForLineGraph,
            label: 'Corona Cases',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            data: []
        },
        deaths: {
            ...commonConfigForLineGraph,
            label: 'Deaths',
            borderColor: '#f00',
            backgroundColor: '#f00',
            data: []
        }, recovered: {
            ...commonConfigForLineGraph,
            label: 'Recovered',
            borderColor: '#0f0',
            backgroundColor: '#0f0',
            data: []
        }
    });

    const updateUIAndSetStates = useCallback((data, timePeriod) => {

        // If fetched data is corrupt
        if (typeof data === 'string') {
            data = [];
            alert('Use Appropriate Country Name');
        }

        // Passing API data in an array
        let array = [...data], labels = [], confirmedCount = [], recoveredCount = [], deathsCount = [];

        // manipulation for required time i.e. lastweek, lastmonth and so on...
        array = data.slice(Math.max(data.length - timePeriod, 0));


        array.forEach((country) => {
            labels.push(`${(new Date(country.Date).getDate()).toString().padStart(2, "0")}/${(new Date(country.Date).getMonth() + 1).toString().padStart(2, "0")}`);
            recoveredCount.push(country.Recovered);
            deathsCount.push(country.Deaths);
            confirmedCount.push(country.Confirmed);
        })

        setStatsObject(statsObject => {
            return {
                labels,
                confirmed: { ...statsObject.confirmed, data: confirmedCount },
                recovered: { ...statsObject.recovered, data: recoveredCount },
                deaths: { ...statsObject.deaths, data: deathsCount },
            }
        });
    }, []);


    useEffect(() => {

        // Fetch countryFromURL
        const countryFromURL = props.match.params.countryName;


        // If country is present in req params of url, update it in useState Hook 
        // By Default India is the country in  countryName state
        if (countryFromURL) {
            setCountryName(() => countryFromURL)
        }

        // If fetch country specific data from api using countryName
        fetchCountryAllData(countryName).then(data => { updateUIAndSetStates(data, selectedTime) });

    }, [props.match.params.countryName, countryName, selectedTime, updateUIAndSetStates]);


    const onAutoCompleteChange = (country) => {
        let standardCountryName = countryToSlug(country);
        setCountryName(() => standardCountryName);
        history.push(`/country/${standardCountryName}`)
    }

    const onSelectTimePeriodChange = (e) => {
        setSelectedTime(e.target.value);
    }

    const onToggleCumulativeSwitch = () => {
        setCumulativeStats((cumulativeStats) => !cumulativeStats);
    }

    const renderTimeSelectButton = () => {
        return (
            <select
                style={styles.selectButton}
                value={selectedTime}
                className="browser-default"
                onChange={onSelectTimePeriodChange}>
                >
                <option disabled defaultValue>Time Period</option>
                <option value={10000}>Overall</option>
                <option value={8}>Last Week</option>
                <option value={15}>Last Two Weeks</option>
                <option value={31}>Last Month</option>
                <option value={61}>Last Two Months</option>
            </select>
        )
    }

    const renderLineGraph = () => {

        let { labels, confirmed, recovered, deaths } = statsObject;

        if (cumulativeStats) {
            let dataProps = { ...statsObject }
            return (
                <CustomLine {...dataProps} />
            )
        }


        return (<CustomLine
            labels={labels.slice(1, labels.length)}
            confirmed={{ ...confirmed, data: convertCumulativeToAccumulative(confirmed.data) }}
            recovered={{ ...recovered, data: convertCumulativeToAccumulative(recovered.data) }}
            deaths={{ ...deaths, data: convertCumulativeToAccumulative(deaths.data) }} />
        )
    }

    const { confirmed: { data: confirmedArray }, recovered: { data: recoveredArray }, deaths: { data: deathsArray } } = statsObject;

    const TotalRecovered = recoveredArray[recoveredArray.length - 1];
    const TotalDeaths = deathsArray[deathsArray.length - 1];
    const TotalActive = confirmedArray[confirmedArray.length - 1] - TotalDeaths - TotalRecovered;

    const renderDoughnutAndLineGraph = () => {
        if (statsObject.confirmed.data.length === 0)
            return <Loader color='#fff' />
        return (<>

            <Col className="center" l={6} s={12} style={styles.doughnutContainer}>
                <Row className="card" style={styles.doughnutContainer}>
                    <h6 style={{ fontWeight: 'bold', color: '#484848' }}>Covid19 Cases {countryName}</h6>
                    <CustomDoughnut
                        data={[
                            TotalActive,
                            TotalRecovered,
                            TotalDeaths]
                        }
                        labels={[`Active Cases: ${TotalActive}`, `Recovered: ${TotalRecovered}`, `Deaths: ${TotalDeaths}`]}
                        backgroundColor={['#00f', '#0f0', '#f00']}
                        borderColor='#fff'
                        textColor='#333'
                    />
                </Row>

            </Col>

            <Col l={6} s={12} style={{ padding: 15 }}>
                <Row className="card" style={{ borderRadius: 20, padding: 5 }}>
                    <Col l={6} s={12} style={{ paddingTop: 10, marginTop: 5, marginBottom: 20, float: 'center' }}>
                        <Switch
                            className="center"
                            style={{ marginTop: 5, marginBottom: 20, float: 'center' }}
                            onChange={onToggleCumulativeSwitch}
                            checked={cumulativeStats}
                            disabled={false}
                            onLabel='Cumulative Stats'
                            offLabel='Daily Stats' /></Col>
                    <Col l={6} s={11} style={styles.selectedTimeButtonContainer}>
                        {renderTimeSelectButton()}

                    </Col>
                    {renderLineGraph()}
                </Row>

            </Col>
        </>
        )
    }
    return (
        <Row>
            <Col l={10} s={12} offset="l1 s0" className="white" style={styles.containerCard} >
                <h5 style={styles.countryNameHeading}>Corona TimeLine: {countryName} </h5>

                <SearchBar placeholder='Type Your Country Name' onAutoCompleteChange={onAutoCompleteChange} data={countryAutocomplete} />
                {renderDoughnutAndLineGraph()}
            </Col>

        </Row>
    );
}

let styles = {
    selectedTimeButtonContainer: {
        textAlign: 'left',
        marginBottom: 20
    },
    countryNameHeading: {
        marginTop: 10,
        textTransform: 'capitalize',
        marginLeft: 20,
        color: '#fff',
        textAlign: 'center'

    }, doughnutContainer: {
        borderRadius: 20,
        cursor: 'pointer',
        padding: 15,
        paddingBottom: 30,
        color: '#fff',
        textAlign: 'center',
    },
    containerCard: {
        borderRadius: 20,
        paddingBottom: 30,
        background: 'linear-gradient(135deg, #F36265 0%,#961276 100%)',
        marginTop: -10

    }

}
