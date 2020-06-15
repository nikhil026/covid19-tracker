import React, { useEffect } from 'react';
import { Bar, HorizontalBar } from 'react-chartjs-2';
import { Col, Row } from 'react-materialize';
import { useHistory } from 'react-router-dom';
import { createDynamicColorArray, scaleHighDigits } from '../utils/index';



export const CustomBarCountries = (props) => {

    const history = useHistory();
    let barThickness = 2;
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

    const [noOfCustomBarCountries, setCustomBarCountries] = React.useState(10);

    const onNoOfCustomBarCountriesChange = (val) => () => {
        setCustomBarCountries(noOfCustomBarCountries + val);
    }

    let countries = [...props.countries];
    let dynamicBackgroundArray = createDynamicColorArray(50);
    let labels = countries.slice(0, noOfCustomBarCountries).map(country => country.Slug);
    let barsData = [
        { label: 'Confirmed', data: countries.slice(0, noOfCustomBarCountries).map(country => country.TotalConfirmed) },
        { label: 'Recovered', data: countries.slice(0, noOfCustomBarCountries).map(country => country.TotalRecovered) },
        { label: 'Deaths', data: countries.slice(0, noOfCustomBarCountries).map(country => country.TotalDeaths) },
    ];

    useEffect(() => {
        labels = countries.slice(0, noOfCustomBarCountries).map(country => country.Slug);
        barsData = [
            { label: 'Confirmed', data: countries.slice(0, noOfCustomBarCountries).map(country => country.TotalConfirmed) },
            { label: 'Recovered', data: countries.slice(0, noOfCustomBarCountries).map(country => country.TotalRecovered) },
            { label: 'Deaths', data: countries.slice(0, noOfCustomBarCountries).map(country => country.TotalDeaths) },
        ];
    }, [noOfCustomBarCountries])


    return (
        <>
            <Row style={{
                padding: 5,
            }}>
                <Col l={3}></Col>
                <Col l={4} s={10}>
                    <h5 style={{ color: '#333' }} className="center">{noOfCustomBarCountries} Most Affected Countries</h5>
                </Col>
                <Col l={2} s={2}>
                    <i class="medium material-icons" onClick={onNoOfCustomBarCountriesChange(1)}>arrow_upward</i>
                    <i class="medium material-icons" onClick={onNoOfCustomBarCountriesChange(-1)}>arrow_downward</i>
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