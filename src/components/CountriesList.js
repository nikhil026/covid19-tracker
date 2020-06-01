import React from 'react';
import { Link } from 'react-router-dom';
import { sortObjArrayWithKeyAndDirection } from '../utils';



export const CountriesList = (props) => {

    const renderList = (countries, sortBy, sortDirection) => {

        if (countries.length === 0) {
            return null;
        }

        countries = sortObjArrayWithKeyAndDirection(countries, sortBy, sortDirection)


        return (<tbody>
            {countries.map(({ Slug, Country, TotalConfirmed, TotalDeaths, NewConfirmed, NewDeaths, CountryCode, Date, TotalRecovered, NewRecovered }, index) => {
                return (
                    <tr className="collection-item" key={`${CountryCode}`}>
                        <td style={{ padding: 0 }}>{index + 1}</td>
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
                    </tr>)
            })
            }
        </tbody>)
    }
    const renderSelectButton = (sortBy, onSortChange) => {
        return (
            <select style={styles.selectButton} value={sortBy} className="browser-default" onChange={onSortChange}>
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
        <div>

            {renderSelectButton(props.sortBy, props.onSortChange)}

            <table className="country-list-table" style={{ marginTop: 10 }}>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Country</th>
                        <th>Total Cases</th>
                        <th>Total Death</th>
                        <th>Total Recov.</th>
                        <th>New Cases</th>
                        <th>New Deaths</th>
                        <th>New Recov.</th>
                    </tr>
                </thead>

                {renderList(props.countries, props.sortBy, props.sortDirection)}

            </table>
        </div>
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