import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-materialize';
import { fetchSummaryData } from '../api/api';
import { CountriesList } from '../components/CountriesList';
import { CountriesModal } from '../components/CountriesModal';
import { GlobalCards } from '../components/GlobalCards';
import { CompareCountryButton } from './CompareCountryButton';

export const Home = () => {

    const [countries, setCountries] = useState([]);
    const [global, setGlobal] = useState({});
    const [sortBy, setSortBy] = useState('TotalConfirmed');
    const [sortDirection, setSortDirection] = useState(0);

    useEffect(() => {
        fetchSummaryData().then(data => {
            setCountries(() => data.Countries);
            setGlobal(() => data.Global)
        });
    }, [])


    const onSortChange = (e) => {
        setSortBy(e.target.value);
    }

    const onSortReverse = () => {
        setSortDirection(Number(!sortDirection));
    }



    const renderSelectButton = () => {
        return (
            <select style={style.selectButton} value={sortBy} className="browser-default" onChange={onSortChange}>
                <option disabled defaultValue>Sort By</option>
                <option value='Slug'>Sort ByName</option>
                <option value='TotalConfirmed'>Total Cases</option>
                <option value='TotalDeaths'>Total Deaths</option>
                <option value='TotalRecovered'>Total Recovered</option>
                <option value='NewConfirmed'>New Cases</option>
                <option value='NewDeaths'>New Deaths</option>
                <option value='NewRecovered'>New Recovered</option>
            </select>
        )
    }

    return (
        <div className="App">
            <CountriesModal countries={countries} />

            <Row>
                <Col l={10} offset='l1 s0'>
                    <h5 className="center">Global Covid 19 Stats Tracker </h5>
                    <GlobalCards global={global} />
                    <Row>
                        <Col l={4} s={12}>
                            <CompareCountryButton />
                        </Col>
                        <Col l={4} offset="l4" s={12}>
                            {renderSelectButton()}

                        </Col>
                    </Row>
                    <CountriesList countries={countries} sortBy={sortBy} sortDirection={sortDirection} onSortReverse={onSortReverse} />


                </Col>

            </Row>


        </div>
    );


}


// export class Home extends Component {

//     constructor() {
//         super();
//         this.state = { countries: [], global: {}, sortBy: 'TotalConfirmed', sortDirection: 0 };
//         this.onSortChange = this.onSortChange.bind(this);
//         this.chartReference = React.createRef()
//     }


//     componentDidMount() {
//         fetchSummaryData().then(data => {
//             this.setState({
//                 countries: data.Countries,
//                 global: data.Global
//             })
//         })
//     }

//     onSortChange(e) {
//         this.setState({ sortBy: e.target.value })
//     }



//     renderSelectButton() {
//         return (
//             <select style={style.selectButton} value={this.state.sortBy} className="browser-default" onChange={this.onSortChange}>
//                 <option disabled defaultValue>Sort By</option>
//                 <option value='TotalConfirmed'>Total Cases</option>
//                 <option value='TotalDeaths'>Total Deaths</option>
//                 <option value='TotalRecovered'>Total Recovered</option>
//                 <option value='NewConfirmed'>New Cases</option>
//                 <option value='NewDeaths'>New Deaths</option>
//                 <option value='NewRecovered'>New Recovered</option>
//             </select>
//         )
//     }


//     render() {
//         return (
//             <div className="App">
//                 <Row>
//                     <Col l={10} offset={'l1'}>
//                         <h5>Global Covid 19 Stats Tracker</h5>
//                         <GlobalCards global={this.state.global} />
//                         <Row>
//                             <Col l={4} s={12} >
//                                 <CompareCountryButton />
//                             </Col>
//                             {this.renderSelectButton()}
//                         </Row>
//                         <CountriesModal countries={this.state.countries} />
//                         <CountriesList countries={this.state.countries} sortBy={this.state.sortBy} sortDirection={this.state.sortDirection} />
//                     </Col>
//                 </Row>

//             </div>
//         );

//     }


// }

let style = {
    selectButton: {
        // float: 'right',
        // width: 140,
        // marginRight: 20
        marginTop: 10
    }
}
