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
                cutoutPercentage: 10,
                responsive: true,
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: props.textColor || '#fff',
                    }
                },

            }}
        />
    )
} 