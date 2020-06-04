import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { scaleHighDigits } from '../utils';

export const CustomLine = (props) => {

    const chartRef = useRef(null);

    return (
        <Line
            ref={chartRef}
            data={{ labels: props.labels, datasets: [props.confirmed, props.deaths, props.recovered] }}
            options={{
                responsive: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            stepSize: 10000,
                            callback: scaleHighDigits
                        }
                    }
                    ]
                }

            }}
            height={300}
            width={window.innerWidth * 0.8}
        />
    );
}
