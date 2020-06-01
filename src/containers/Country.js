import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row, Switch } from 'react-materialize';
import { useHistory } from 'react-router-dom';
import { fetchCountryAllData } from '../api/api';
import { Chart } from '../components/CustomChart';
import { CustomDoughnut } from '../components/CustomDoughnut';
import { SearchBar } from '../components/SearchBar';
import { convertCumulativeToAccumulative, countryAutocomplete, countryToSlug } from '../utils/index';


const common = {
    lineTension: 0.1,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10
}


export const Country = (props) => {

    const history = useHistory();
    const [selectedTime, setSelectedTime] = useState(61);
    const [countryName, setCountryName] = useState('india');
    const [cumulativeStats, setCumulativeStats] = useState(false);
    const [statsObject, setStatsObject] = useState({
        labels: [],
        confirmed: {
            ...common,
            label: 'Corona Cases',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            data: []
        },
        deaths: {
            ...common,
            label: 'Deaths',
            borderColor: '#f00',
            backgroundColor: '#f00',
            data: []
        }, recovered: {
            ...common,
            label: 'Recovered',
            borderColor: '#0f0',
            backgroundColor: '#0f0',
            data: []
        }
    })

    const settingDataInstate = useCallback((data, timePeriod) => {

        // If fetched data is corrupt
        if (typeof data === 'string') {
            data = [];
            alert('Use Appropriate Country Name');
        }

        // Passing API data in an array
        let array = [...data], labels = [], confirmedCount = [], recoveredCount = [], deathsCount = [];

        // manipulation for required time i.e. lastweek, lastmonth and so on...
        array = data.slice(Math.max(data.length - timePeriod, 0));


        array.forEach((ele, index) => {
            labels.push(`${(new Date(ele.Date).getDate()).toString().padStart(2, "0")}/${(new Date(ele.Date).getMonth() + 1).toString().padStart(2, "0")}`);
            recoveredCount.push(ele.Recovered);
            deathsCount.push(ele.Deaths);
            confirmedCount.push(ele.Confirmed);
        })

        setStatsObject({
            labels,
            confirmed: { ...statsObject.confirmed, data: confirmedCount },
            recovered: { ...statsObject.recovered, data: recoveredCount },
            deaths: { ...statsObject.deaths, data: deathsCount },
        });
    }, []);


    useEffect(() => {
        const countryFromURL = props.match.params.countryName;

        if (countryFromURL) {
            setCountryName(countryFromURL)
        }
        fetchCountryAllData(countryName).then(data => { settingDataInstate(data, selectedTime) });


    }, [props.match.params.countryName, countryName, selectedTime, settingDataInstate])


    const onAutoCompleteChange = (country) => {
        let standardCountryName = countryToSlug(country);
        setCountryName(standardCountryName);
        history.push(`/country/${standardCountryName}`)
    }
    const onSelectTimePeriodChange = (e) => {
        setSelectedTime(e.target.value);
        fetchCountryAllData(countryName).then(data => { settingDataInstate(data, selectedTime) });
    }
    const onToggleCumulativeSwitch = () => {
        setCumulativeStats(!cumulativeStats);
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

    const renderChart = () => {
        let { labels, confirmed, recovered, deaths } = statsObject;

        if (cumulativeStats) {
            let dataProps = { ...statsObject, countryName }
            return (
                <Chart {...dataProps} />
            )
        }


        return (<Chart
            countryName={countryName}
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

    return (
        <Row>
            <Col l={10} s={12} offset="l1 s0" className="white" style={styles.containerCard} >
                <h5 style={styles.countryNameHeading}>Corona TimeLine: {countryName} </h5>
                <SearchBar placeholder='Type Country Name' onAutoCompleteChange={onAutoCompleteChange} data={countryAutocomplete} />

                <Col className="center" l={6} s={12} style={styles.doughnutContainer}>
                    <Row className="card" style={styles.doughnutContainer}>
                        <h6 className="black-text">Covid19 Cases {countryName}</h6>
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
                        {renderChart()}
                    </Row>

                </Col>

            </Col>

        </Row>
    );
}

// export class Country extends Component {



//     constructor(props) {
//         super(props);

//         this.state = {
//             selectedTime: 61,
//             labels: [],
//             countryName: 'india',
//             cumulativeStats: false,
//             confirmed: {
//                 ...common,
//                 label: 'Corona Cases',
//                 backgroundColor: 'rgba(75,192,192,0.4)',
//                 borderColor: 'rgba(75,192,192,1)',
//                 data: []
//             },
//             deaths: {
//                 ...common,
//                 label: 'Deaths',
//                 borderColor: '#f00',
//                 backgroundColor: '#f00',
//                 data: []
//             }, recovered: {
//                 ...common,
//                 label: 'Recovered',
//                 borderColor: '#0f0',
//                 backgroundColor: '#0f0',
//                 data: []
//             }
//         }

//         this.chartRef = React.createRef();
//         this.onAutoCompleteChange = this.onAutoCompleteChange.bind(this);
//         this.settingDataInstate = this.settingDataInstate.bind(this);
//         this.onSelectTimePeriodChange = this.onSelectTimePeriodChange.bind(this);
//         this.onToggleCumulativeSwitch = this.onToggleCumulativeSwitch.bind(this);
//     }

//     componentDidMount() {
//         // If url contains /country/:countryName
//         const country = this.props.match.params.countryName;

//         // If Url contains route params
//         if (country) {
//             this.setState({ countryName: country })
//         }

//         fetchCountryAllData(this.state.countryName).then(data => { this.settingDataInstate(data, this.state.selectedTime) });
//     }

//     componentDidUpdate(prevProps, prevState) {
//         if (this.state.countryName !== prevState.countryName) {
//             fetchCountryAllData(this.state.countryName).then(data => { this.settingDataInstate(data, this.state.selectedTime) });
//         }
//     }

//     settingDataInstate(data, timePeriod) {

//         // If fetched data is corrupt
//         if (typeof data === 'string') {
//             data = [];
//             alert('Use Appropriate Country Name');
//         }

//         // Passing API data in an array
//         let array = [...data], labels = [], confirmedCount = [], recoveredCount = [], deathsCount = [];

//         // manipulation for required time i.e. lastweek, lastmonth and so on...
//         array = data.slice(Math.max(data.length - timePeriod, 0));


//         array.forEach((ele, index) => {
//             labels.push(`${(new Date(ele.Date).getDate()).toString().padStart(2, "0")}/${(new Date(ele.Date).getMonth() + 1).toString().padStart(2, "0")}`);
//             recoveredCount.push(ele.Recovered);
//             deathsCount.push(ele.Deaths);
//             confirmedCount.push(ele.Confirmed);
//         })

//         this.setState({
//             labels,
//             confirmed: { ...this.state.confirmed, data: confirmedCount },
//             recovered: { ...this.state.recovered, data: recoveredCount },
//             deaths: { ...this.state.deaths, data: deathsCount },
//         });
//     }

//     onAutoCompleteChange(country) {
//         let standardCountryName = countryToSlug(country);
//         this.setState({ countryName: standardCountryName });
//     }
//     onSelectTimePeriodChange(e) {
//         this.setState({ selectedTime: e.target.value });
//         fetchCountryAllData(this.state.countryName).then(data => { this.settingDataInstate(data, this.state.selectedTime) });
//     }
//     onToggleCumulativeSwitch() {
//         this.setState({ cumulativeStats: !this.state.cumulativeStats })
//     }
//     renderTimeSelectButton() {
//         return (
//             <select
//                 style={styles.selectButton}
//                 value={this.state.selectedTime}
//                 className="browser-default"
//                 onChange={this.onSelectTimePeriodChange}>
//                 >
//                 <option disabled defaultValue>Time Period</option>
//                 <option value={10000}>Overall</option>
//                 <option value={8}>Last Week</option>
//                 <option value={15}>Last Two Weeks</option>
//                 <option value={31}>Last Month</option>
//                 <option value={61}>Last Two Months</option>
//             </select>
//         )
//     }props.m

//     renderChart() {
//         if (this.state.cumulativeStats) {
//             return (
//                 <Chart {...this.state} />
//             )
//         }
//         let { countryName, labels, confirmed, recovered, deaths } = this.state;
//         return (<Chart
//             countryName={countryName}
//             labels={labels.slice(1, labels.length)}
//             confirmed={{ ...confirmed, data: convertCumulativeToAccumulative(confirmed.data) }}
//             recovered={{ ...recovered, data: convertCumulativeToAccumulative(recovered.data) }}
//             deaths={{ ...deaths, data: convertCumulativeToAccumulative(deaths.data) }} />
//         )
//     }
//     render() {
//         const { confirmed: { data: confirmedArray }, recovered: { data: recoveredArray }, deaths: { data: deathsArray } } = this.state;

//         const TotalRecovered = recoveredArray[recoveredArray.length - 1];
//         const TotalDeaths = deathsArray[deathsArray.length - 1];
//         const TotalActive = confirmedArray[confirmedArray.length - 1] - TotalDeaths - TotalRecovered;

//         return (
//             <Row>

//                 <Col l={10} s={12} offset="l1" className="white card" style={styles.containerCard} >
//                     <Row>
//                         <h5 style={styles.countryNameHeading}>Corona TimeLine: {this.state.countryName} </h5>

//                     </Row>
//                     <Row>
//                         <Col l={10} offset="l1 s0" s={11} style={styles.searchBarContainer}>
//                             <SearchBar placeholder='Type Country Name' onAutoCompleteChange={this.onAutoCompleteChange} data={countryAutocomplete} />

//                         </Col>

//                     </Row>

//                     <Row>

//                         <Col l={6} s={12}>
//                             <Col l={6} s={12} style={{ paddingTop: 10, marginTop: 5, marginBottom: 20, float: 'center' }}>
//                                 <Switch
//                                     className="center"
//                                     style={{ marginTop: 5, marginBottom: 20, float: 'center' }}
//                                     onChange={this.onToggleCumulativeSwitch}
//                                     checked={this.state.cumulativeStats}
//                                     disabled={false}
//                                     onLabel='Cumulative Stats'
//                                     offLabel='Daily Stats' /></Col>
//                             <Col l={6} s={11} style={styles.selectedTimeButtonContainer}>
//                                 {this.renderTimeSelectButton()}

//                             </Col>
//                             {this.renderChart()}
//                         </Col>
//                         <Col className="center" l={6} s={12} style={styles.doughnutContainer}>
//                             <CustomDoughnut
//                                 data={[
//                                     TotalActive,
//                                     TotalRecovered,
//                                     TotalDeaths]
//                                 }
//                                 labels={['Active Cases', 'Recovered', 'Deaths']}
//                                 backgroundColor={['#00f', '#0f0', '#f00']}
//                                 borderColor='#fff'
//                             />
//                         </Col>

//                     </Row>
//                 </Col>

//             </Row>
//         );
//     }


// }

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
