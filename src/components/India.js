import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Col, Row } from 'react-materialize';
import { fetchIndianStatesData } from '../api/api';
import { indiaStateAndUTAutoComplete } from '../utils';
import { CustomDoughnut } from './CustomDoughnut';
import { Loader } from './Loader';
import { SearchBar } from './SearchBar';

export const India = () => {
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef);


    const [indianStatesData, setIndianStatesData] = useState([]);
    const [selectedStateName, setSelectedStateName] = useState('Maharashtra');
    const [selectedStateData, setSelectedStateData] = useState({});

    useEffect(() => {
        fetchIndianStatesData().then(data => {
            setIndianStatesData(() => data);
        });
    }, []);

    useEffect(() => {
        if (Object.keys(indianStatesData).length > 0) {
            setSelectedStateData(indianStatesData.find(state => state["State/UT"].toLowerCase() === selectedStateName.toLowerCase()))
        }
    }, [selectedStateName, indianStatesData]);

    let common = {
        barThickness: 20
    }
    let labels = [],
        data1 = { data: [], label: 'Total Active Cases', backgroundColor: '#00f', ...common },
        data2 = { data: [], label: 'Total Recovered', backgroundColor: '#0f0', ...common },
        data3 = { data: [], label: 'Total Death', backgroundColor: '#f00', ...common };

    let sortedArray = indianStatesData.sort((a, b) => b['TotalActive'] - a['TotalActive']);

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
            return (<h6 className="center">{new Date(JSON.parse(window.localStorage["IndianStatesData"]).timeStamp).toUTCString()}</h6>)
        } catch (e) {
            return `Not Updated`;
        }
    }

    const renderDoughnut = (indianStatesData) => {

        if (indianStatesData.length === 0)
            return <Loader margin={200} color='#fff' />

        return (
            <Col l={6} s={12} className="center white-text">
                <Row className="white" style={{ borderRadius: 30, margin: 0 }}>
                    <h6 ref={myRef} className="center black-text" style={styles.cardHeading}>{selectedStateName}</h6>
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
        )
    }

    const renderBar = (indianStatesData) => {

        if (indianStatesData.length === 0)
            return <Loader margin={200} color='#fff' />

        return (
            <Col s={12} l={6} offset="l0" className="center white-text">
                <Row className="white card" style={{ borderRadius: 30, margin: 0 }}>
                    <h6 className="black-text" style={styles.cardHeading}>States Affected Most</h6>

                    <Bar
                        data={{
                            datasets: [data1, data2, data3],
                            labels: labels,
                        }}
                        options={{
                            onClick: (ele, data) => { if (data[0]?._model?.label) { setSelectedStateName(data[0]._model.label) } },
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

        )

    }


    const stateNameClicked = (stateName) => {
        executeScroll();
        setSelectedStateName(stateName);
    }

    const renderIndiaTable = (indianStatesData) => {
        return (
            <>
                <h5 className="center">Detailed List</h5>
                <table className="white responsive-table" style={styles.indianStateTable} >
                    <thead>
                        <tr>
                            <th>S. No.</th>
                            <th>State/UT</th>
                            <th>Active Cases</th>
                            <th>Recovered</th>
                            <th>Deaths</th>
                            <th>Total Confirmed</th>

                        </tr>
                    </thead>
                    <tbody>
                        {indianStatesData.map((state, index) => {
                            return (
                                <tr key={state["State/UT"]}>
                                    <td>{index + 1}</td>
                                    <td style={styles.tableStateName} onClick={() => stateNameClicked(state["State/UT"])}>{state["State/UT"]}</td>
                                    <td style={styles.tableActive} >{state["TotalActive"]}</td>
                                    <td style={styles.tableRecovered} >{state["TotalRecovered"]}</td>
                                    <td style={styles.tableDeaths} >{state["TotalDeaths"]}</td>
                                    <td style={styles.tableConfirmed} >{state["TotalActive"] + state["TotalRecovered"] + state["TotalDeaths"]}</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
        )
    }

    return (
        <Row>
            <Col className='card white-text' l={10} s={12} offset="l1 s0" style={styles.containerCard}>
                <h5 className="center ">Indian Covid 19 Stats Tracker Last Updated: </h5>
                {lastUpdatedDate()}
                <SearchBar placeholder='Search Your State...' data={indiaStateAndUTAutoComplete} onAutoCompleteChange={onAutoCompleteChange} />
                <Row>
                    {renderDoughnut(indianStatesData)}
                    {renderBar(indianStatesData)}
                </Row>
                {renderIndiaTable(indianStatesData)}

            </Col>
        </Row>
    );


}


let styles = {
    containerCard: {
        borderRadius: 30,
        background: 'linear-gradient(135deg, #F36265 0%,#961276 100%)',
        marginTop: -10
    },
    cardHeading: {
        paddingTop: 10
    },
    indianStateTable: {
        color: '#333',
        borderRadius: 30,
        marginBottom: 30
    },
    tableStateName: {
        color: '#00f',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    tableDeaths: {
        color: '#f00',
        fontWeight: 'bold'
    },
    tableRecovered: {
        color: '#0f0',
        fontWeight: 'bold'
    },
    tableActive: {
        color: '#333',

    },
    tableConfirmed: {
        color: '#000',
        fontWeight: 'bolder'
    }

}
