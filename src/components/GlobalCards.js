import React from 'react';
import { Col, Row } from 'react-materialize';
import { Loader } from './Loader';


export const GlobalCards = (props) => {
    let { NewDeaths, NewConfirmed, NewRecovered, TotalConfirmed, TotalRecovered, TotalDeaths } = props.global;

    if (!NewDeaths) {
        return <Loader style={{ margin: 50 }} center={true} />
    }
    return (
        <Row style={styles.globalCardsRow}>
            <Col l={6} s={12} >
                <div className="card hoverable z-depth-1" style={{ ...styles.globalCard, ...styles.totalGlobalCardBgColor }}>
                    <Row>
                        <h5>Total Cases </h5>
                        <span style={styles.dateSpan} className='small-text'> (as of {new Date().toLocaleDateString()})</span>

                        <h4>{TotalConfirmed.toLocaleString()}</h4>
                    </Row>
                    <Row className="row">
                        <Col l={6} s={12}>
                            <div className="green lighten-1" style={styles.globalCardRecoveredAndDeath}>

                                <h6>Total Recovered</h6>
                                <h5>{TotalRecovered.toLocaleString()}</h5>

                            </div>
                        </Col>
                        <div className="col l6  s12">
                            <div className="red" style={styles.globalCardRecoveredAndDeath}>
                                <h6>Total Deaths</h6>
                                <h5>{TotalDeaths.toLocaleString()}</h5>
                            </div>
                        </div>
                    </Row>

                </div>
            </Col>
            <Col l={6} s={12}>
                <div className="card hoverable z-depth-1" style={{ ...styles.globalCard, ...styles.newGlobalCardBgColor }}>
                    <div className="row">
                        <h5>New Cases</h5>
                        <span style={styles.dateSpan} className='small-text'> (on {new Date(new Date().getTime() - 86400000).toLocaleDateString()})</span>


                        <h4>{NewConfirmed.toLocaleString()}</h4>
                    </div>
                    <Row>
                        <Col l={6} s={12}>
                            <div className="green lighten-1" style={styles.globalCardRecoveredAndDeath}>

                                <h6>Recovered</h6>
                                <h5>{NewRecovered.toLocaleString()}</h5>

                            </div>
                        </Col>
                        <div className="col l6 s12">
                            <div className="red" style={styles.globalCardRecoveredAndDeath}>
                                <h6>New Deaths</h6>
                                <h5>{NewDeaths.toLocaleString()}</h5>
                            </div>
                        </div>
                    </Row>

                </div>
            </Col>
        </Row>);
}

const styles = {
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
    },
    globalCardRecoveredAndDeath: {
        borderRadius: 20,
        padding: 5,
        margin: 5,
        marginBottom: 10
    },
    totalGlobalCardBgColor: {
        background: 'linear-gradient(135deg, #f65599 0%,#4d0316 100%)'

    },
    newGlobalCardBgColor: {
        background: 'linear-gradient(135deg, #C56CD6 0%,#3425AF 100%)'
    },
    dateSpan: {
        marginTop: -10,
        marginBottom: -15,
        display: 'block'
    }
}
