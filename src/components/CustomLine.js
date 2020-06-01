import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';

export const CustomLine = (props) => {

    const chartRef = useRef(null);

    return (
        <Line
            ref={chartRef}
            data={{ labels: props.labels, datasets: [props.confirmed, props.deaths, props.recovered] }}
            options={{
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0
                        }
                    }
                    ]
                }
            }} />
    );
}
