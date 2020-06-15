import React, { useEffect, useState } from 'react';
import { Bar, HorizontalBar } from 'react-chartjs-2';
import { Col, Row } from 'react-materialize';
import { useHistory } from 'react-router-dom';
import { createDynamicColorArray, scaleHighDigits } from '../utils/index';

export const CustomBarCountries = (props) => {

    const history = useHistory();


    let defaultOptionsforBar = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                ticks: {
                    fontSize: 8,
                }
            }],
            yAxes: [{
                ticks: {
                    stepSize: 100000,
                    callback: scaleHighDigits
                }
            }]

        },
        responsive: false,

        legend: {
            display: false
        },
        hover: {
            onHover: function (e) {
                var point = this.getElementAtEvent(e);
                if (point.length) e.target.style.cursor = 'pointer';
                else e.target.style.cursor = 'default';
            }

        },
        onClick: function (e, data) {
            let countryName = data[0]?._model?.label;
            if (countryName) {
                history.push(`/country/${countryName}`)

            }
        }
    }

    const countries = [...props.countries];
    const dynamicBackgroundArray = createDynamicColorArray(50);


    const [noOfCustomBarCountries, setCustomBarCountries] = useState(10);
    const [labels, setLabels] = useState(countries.slice(0, noOfCustomBarCountries).map(country => country.Slug));
    const [barsData, setBarsData] = useState([
        { label: 'Confirmed', data: countries.slice(0, noOfCustomBarCountries).map(country => country.TotalConfirmed) },
        { label: 'Recovered', data: countries.slice(0, noOfCustomBarCountries).map(country => country.TotalRecovered) },
        { label: 'Deaths', data: countries.slice(0, noOfCustomBarCountries).map(country => country.TotalDeaths) },
    ]);


    const onNoOfCustomBarCountriesChange = (val) => () => {
        if (!(noOfCustomBarCountries === 1 && val === -1) && !(noOfCustomBarCountries === 30 && val === 1))
            setCustomBarCountries(noOfCustomBarCountries + val);
    }

    useEffect(() => {
        setLabels(countries.slice(0, noOfCustomBarCountries).map(country => country.Slug));
        setBarsData([
            { label: 'Confirmed', data: countries.slice(0, noOfCustomBarCountries).map(country => country.TotalConfirmed) },
            { label: 'Recovered', data: countries.slice(0, noOfCustomBarCountries).map(country => country.TotalRecovered) },
            { label: 'Deaths', data: countries.slice(0, noOfCustomBarCountries).map(country => country.TotalDeaths) },
        ]);
    }, [noOfCustomBarCountries])


    return (
        <>
            <Row style={{
                padding: 5,
            }}>
                <Col l={3}></Col>
                <Col l={4} s={9}>
                    <h5 style={{ color: '#333' }} className="center">{noOfCustomBarCountries} Most Affected Countries</h5>
                </Col>
                <Col l={2} s={2} style={{ paddingTop: '15px' }}>

                    <i className="material-icons cursor-pointer" onClick={onNoOfCustomBarCountriesChange(1)}>add_box</i>
                    <i className="material-icons cursor-pointer" onClick={onNoOfCustomBarCountriesChange(-1)}>indeterminate_check_box</i>
                </Col>
                <Col l={3}></Col>
                <br />
            </Row>

            <Row style={{
                padding: 5,
            }}>

                {
                    barsData.map((barData, index) => {
                        return (
                            <Col l={4} s={12} key={index} style={{ marginTop: 20 }}>
                                <Row className="card z-depth-4 hoverable" style={{ margin: 0, paddingTop: 10, borderRadius: 30 }}>
                                    <h6 className="center" style={{ fontWeight: 'bold' }}>{barData.label}</h6>
                                    <Bar data={
                                        {
                                            datasets: [{
                                                label: 'Total Cases',
                                                data: barData.data,
                                                backgroundColor: dynamicBackgroundArray,
                                                barThickness: 5

                                            }],
                                            labels
                                        }
                                    }

                                        height={300}
                                        options={defaultOptionsforBar}
                                    />
                                </Row>
                            </Col>
                        );
                    })
                }


            </Row>
            <Row>
                <Col className="z-depth-3 hoverable card" l={12} s={12} style={{ borderRadius: 30 }} >
                    <h6 className="center" style={{ fontWeight: 'bold' }}>New Cases Yesterday</h6>
                    <HorizontalBar
                        data={
                            {
                                datasets: [
                                    {
                                        data: countries.sort((a, b) => b.NewConfirmed - a.NewConfirmed).slice(0, 10).map(country => country.NewConfirmed),
                                        backgroundColor: createDynamicColorArray(15),
                                        barThickness: 7

                                    }
                                ],
                                labels: countries.sort((a, b) => b.NewConfirmed - a.NewConfirmed).slice(0, 10).map(country => country.Slug)
                            }
                        }
                        options={
                            {
                                responsive: false,
                                legend: {
                                    display: false
                                },
                                scales: {
                                    xAxes: [{
                                        ticks: {
                                            stepSize: 10000,
                                            callback: scaleHighDigits
                                        }
                                    }
                                    ]
                                }
                            }
                        }
                        width={window.innerWidth * 0.8}
                        height={400}
                    />

                </Col>
            </Row>
        </>

    )
}