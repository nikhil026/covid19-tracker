import React from 'react';
import { Bar } from 'react-chartjs-2';
import { scaleHighDigits } from '../utils';

export const CompareCountriesBar = (props) => {
    let common = {
        barThickness: 5
    }
    let labels = [],
        data1 = { data: [], label: 'Total Cases', backgroundColor: '#00f', ...common },
        data2 = { data: [], label: 'Total Recovered', backgroundColor: '#0f0', ...common },
        data3 = { data: [], label: 'Total Death', backgroundColor: '#f00', ...common };

    props.data.forEach(country => {
        data1['data'].push(country.TotalConfirmed);
        data2['data'].push(country.TotalRecovered);
        data3['data'].push(country.TotalDeaths);
        labels.push(country.Slug)
    });
    return (
        <Bar
            data={{
                datasets: [data1, data2, data3],
                labels: labels
            }}

            options={{
                responsive: true,
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: scaleHighDigits
                        }
                        // stacked: true
                    }],
                    xAxes: [{
                        // stacked: true
                    }]
                },
            }}
        />

    )
}