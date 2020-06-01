import React, { useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';

export const CustomDoughnut = (props) => {


    let doughnutReference = useRef(null);

    return (
        <Doughnut ref={doughnutReference}
            data={{
                datasets:
                    [{
                        data: props.data,
                        backgroundColor: props.backgroundColor,
                        borderColor: props.borderColor
                    }],

                labels: props.labels,

            }}
            options={{
                responsive: true,
                legend: {
                    labels: {
                        fontColor: props.textColor || '#fff',
                    }
                }
            }}
        />
    )
} 