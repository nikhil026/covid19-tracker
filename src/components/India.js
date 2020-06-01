import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Col, Row } from 'react-materialize';
import { fetchIndianData } from '../api/api';
import { indiaStateAndUTAutoComplete } from '../utils';
import { CustomDoughnut } from './CustomDoughnut';
import { SearchBar } from './SearchBar';

export const India = () => {

    const [indianData, setIndianData] = useState([]);
    const [selectedStateName, setSelectedStateName] = useState('Delhi');
    const [selectedStateData, setSelectedStateData] = useState({});

    // const [sortBy, setSortBy] = useState('TotalActive');


    useEffect(() => {
        fetchIndianData().then(data => {
            setIndianData(() => data);
        });
    }, []);

    useEffect(() => {
        if (Object.keys(indianData).length > 0) {
            console.log(indianData.find(state => state["State/UT"].toLowerCase() === selectedStateName.toLowerCase()))
            setSelectedStateData(indianData.find(state => state["State/UT"].toLowerCase() === selectedStateName.toLowerCase()))

        }
    }, [selectedStateName, indianData]);

    let common = {
        barThickness: 20
    }
    let labels = [],
        data1 = { data: [], label: 'Total Active Cases', backgroundColor: '#00f', ...common },
        data2 = { data: [], label: 'Total Recovered', backgroundColor: '#0f0', ...common },
        data3 = { data: [], label: 'Total Death', backgroundColor: '#f00', ...common };

    let sortedArray = indianData.sort((a, b) => b['TotalActive'] - a['TotalActive']);

    sortedArray.forEach((state, index) => {
        if (index < 10) {

            data1['data'].push(state.TotalActive);
            data2['data'].push(state.TotalRecovered);
            data3['data'].push(state.TotalDeaths);
            labels.push(state["State/UT"]);
        }
    });

    const onAutoCompleteChange = (stateName) => {
        setSelectedStateName(stateName)
    }
    const lastUpdatedDate = () => {
        try {
            return (<h6 className="center">{new Date(JSON.parse(window.localStorage["IndianData"]).timeStamp).toUTCString()}</h6>)
        } catch (e) {
            return `Not Updated`
        }
    }

    return (
        <Row>
            <Col className='card white-text' l={10} s={12} offset="l1 s0" style={styles.containerCard}>
                <h5 className="center ">Indian Covid 19 Stats Tracker Last Updated: </h5>
                {lastUpdatedDate()}
                <SearchBar placeholder='Type State Name for India' data={indiaStateAndUTAutoComplete} onAutoCompleteChange={onAutoCompleteChange} />
                <Row>
                    <Col l={6} s={12} className="center white-text">
                        <Row className="white" style={{ borderRadius: 30, margin: 0 }}>
                            <h6 className="center black-text" style={styles.cardHeading}>{selectedStateName}</h6>
                            <CustomDoughnut data={
                                [selectedStateData.TotalActive,
                                selectedStateData.TotalRecovered,
                                selectedStateData.TotalDeaths]}
                                labels={[
                                    `Active Cases: ${selectedStateData.TotalActive}`,
                                    `Recovered: ${selectedStateData.TotalRecovered}`,
                                    `Deaths: ${selectedStateData.TotalDeaths}`
                                ]}
                                backgroundColor={['#00f', '#0f0', '#f00']}
                                borderColor='#fff'
                                textColor='#333'
                            />
                        </Row>

                    </Col>
                    <Col s={12} l={6} offset="l0" className="center white-text">
                        <Row className="white card" style={{ borderRadius: 30, margin: 0 }}>
                            <h6 className="black-text" style={styles.cardHeading}>State Affected Most</h6>

                            <Bar
                                data={{
                                    datasets: [data1, data2, data3],
                                    labels: labels,
                                }}
                                options={{
                                    responsive: true,
                                    legend: {
                                        display: false,
                                    },

                                    scales: {
                                        yAxes: [{
                                            stacked: true,
                                            ticks: {
                                                min: 0
                                            }
                                        }],
                                        xAxes: [{
                                            stacked: true
                                        }]
                                    }
                                }}
                            />

                        </Row>


                    </Col>

                </Row>

            </Col>
        </Row>
    );


}


let styles = {
    containerCard: {
        borderRadius: 30,
        background: 'linear-gradient(135deg, #F36265 0%,#961276 100%)'
    },
    cardHeading: {
        paddingTop: 10
    }

}
