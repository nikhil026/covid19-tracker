import React from 'react';
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import { sortObjArrayWithKeyAndDirection } from '../utils';


export const CountriesList = (props) => {


    const renderHeaderRow = () => {
        return (
            <tr>
                <td>S.No</td>
                {
                    [{ 'Slug': 'Countries' },
                    { 'TotalConfirmed': 'Total Cases' },
                    { 'TotalDeaths': 'Total Deaths' },
                    { 'TotalRecovered': 'Total Recov.' },
                    { 'NewConfirmed': 'New Cases' },
                    { 'NewDeaths': 'New Deaths' },
                    { 'NewRecovered': 'New Recov.' }
                    ].map((th, index) => {
                        return (
                            <td key={index} onClick={onSortChange.bind(null, Object.keys(th)[0])}>{Object.values(th)[0]}
                                {renderSortingIcons(Object.keys(th)[0])}</td>
                        )
                    })
                }
                <td>Death %</td>
            </tr>
        )

    }

    const renderList = (countries, sortBy, sortDirection) => {

        if (countries.length === 0) {
            return null;
        }

        countries = sortObjArrayWithKeyAndDirection(countries, sortBy, sortDirection)


        return (<>
            <tbody>
                {renderHeaderRow()}
                {countries.map(({ Slug, Country, TotalConfirmed, TotalDeaths, NewConfirmed, NewDeaths, CountryCode, Date, TotalRecovered, NewRecovered }, index) => {
                    return (
                        <tr key={`${CountryCode}`}>
                            <td>{index + 1}</td>
                            <td style={styles.slug}>
                                <Link to={`/country/${Slug}`} >
                                    {Slug}
                                </Link>

                            </td>
                            <td>{TotalConfirmed?.toLocaleString()}</td>
                            <td>{TotalDeaths?.toLocaleString()}</td>
                            <td>{TotalRecovered?.toLocaleString()}</td>
                            <td>{NewConfirmed?.toLocaleString()}</td>
                            <td>{NewDeaths?.toLocaleString()}</td>
                            <td>{NewRecovered?.toLocaleString()}</td>
                            <td>{((TotalDeaths / TotalConfirmed) * 100).toPrecision(3)}%</td>

                        </tr>)
                })
                }
            </tbody></>)
    }
    const renderSortingIcons = (sortBy) => {

        if (sortBy !== props.sortBy) {
            return null;
        }

        if (!props.sortDirection) {
            return (
                <span style={{ cursor: 'pointer' }} onClick={props.onSortReverse}>
                    <Icon className="material-icons">arrow_downward</Icon>
                </span>)
        } else {
            return (<span style={{ cursor: 'pointer' }} onClick={props.onSortReverse} >
                <Icon className="material-icon">arrow_upward</Icon>
            </span >)
        }
    }
    const onSortChange = (val) => {
        props.onSortChange({ 'target': { value: val } })
    }

    return (
        <table className="country-list-table">

            {renderList(props.countries, props.sortBy, props.sortDirection)}

        </table>
    )
}

const styles = {
    slug: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        maxWidth: 80
    },
    checkBox: {
        fontFamily: 'montserrat',
        fontSize: 14,
        color: '#484848',
        textTransform: 'capitalize'
    },
    footerButton: {
        marginLeft: 20
    },
    arrowStyle: {
        cursor: 'pointer'
    },
    selectButton: {
        marginTop: 10
    }
}