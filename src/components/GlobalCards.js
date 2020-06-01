import React from 'react';
import { Col, Row } from 'react-materialize';
import { CustomDoughnut } from './CustomDoughnut';
import { Loader } from './Loader';


export const GlobalCards = (props) => {
    let { NewDeaths, NewConfirmed, NewRecovered, TotalConfirmed, TotalRecovered, TotalDeaths } = props.global;

    if (!NewDeaths) {
        return <Loader style={{ margin: 50 }} center={true} />
    }
    return (
        <Row style={style.globalCardsRow}>
            <Col l={6} s={12} >
                <div className="card hoverable z-depth-1" style={{ ...style.globalCard, ...style.totalGlobalCardBgColor }}>
                    <Row>
                        <h5>Total Cases </h5>
                        <span className='small-text'> (as of {new Date().toLocaleDateString()})</span>

                        <h4>{TotalConfirmed.toLocaleString()}</h4>
                    </Row>
                    <Row className="row">
                        <Col l={6} s={12}>
                            <div className="green" style={style.globalCardRecoveredAndDeath}>

                                <h6>Total Recovered</h6>
                                <h5>{TotalRecovered.toLocaleString()}</h5>

                            </div>
                        </Col>
                        <div className="col l6  s12">
                            <div className="red" style={style.globalCardRecoveredAndDeath}>
                                <h6>Total Deaths</h6>
                                <h5>{TotalDeaths.toLocaleString()}</h5>
                            </div>
                        </div>
                    </Row>

                    <CustomDoughnut data={
                        [TotalConfirmed - TotalRecovered - TotalDeaths,
                            TotalRecovered,
                            TotalDeaths]}
                        labels={['Active Cases', 'Recovered', 'Deaths']}
                        backgroundColor={['#00f', '#0f0', '#f00']}
                        borderColor='#fff'

                    />
                </div>
            </Col>
            <Col l={6} s={12}>
                <div className="card hoverable z-depth-1" style={{ ...style.globalCard, ...style.newGlobalCardBgColor }}>
                    <div className="row">
                        <h5>New Cases</h5>
                        <span className='small-text'> (on {new Date(new Date().getTime() - 86400000).toLocaleDateString()})</span>


                        <h4>{NewConfirmed.toLocaleString()}</h4>
                    </div>
                    <Row>
                        <Col l={6} s={12}>
                            <div className="green" style={style.globalCardRecoveredAndDeath}>

                                <h6>Recovered</h6>
                                <h5>{NewRecovered.toLocaleString()}</h5>

                            </div>
                        </Col>
                        <div className="col l6 s12">
                            <div className="red" style={style.globalCardRecoveredAndDeath}>
                                <h6>New Deaths</h6>
                                <h5>{NewDeaths.toLocaleString()}</h5>
                            </div>
                        </div>
                    </Row>

                    <CustomDoughnut data={
                        [NewConfirmed - NewRecovered - NewDeaths,
                            NewRecovered,
                            NewDeaths]}
                        labels={['New Cases', 'New Recovered', 'New Deaths']}
                        backgroundColor={['#00f', '#0f0', '#f00']}
                        borderColor='#fff'

                    />
                </div>
            </Col>
        </Row>

    )
}

const style = {
    globalCardsRow: {
        marginTop: 10,
        float: 'center'
    },
    globalCard: {
        borderRadius: 20,
        cursor: 'pointer',
        padding: 5,
        paddingBottom: 0,
        color: '#fff',
        textAlign: 'center'
        // padding: 10
    },
    globalCardRecoveredAndDeath: {
        borderRadius: 20,
        padding: 5,
        margin: 5
    },
    totalGlobalCardBgColor: {
        backgroundImage: 'linear-gradient(135deg, #CE9FFC 0%,#7367F0 100%)',

    },
    newGlobalCardBgColor: {
        backgroundImage: 'linear-gradient(135deg, #F36265 0%,#961276 100%)'
    }
}

