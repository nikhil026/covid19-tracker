import React from 'react';
import { Footer } from 'react-materialize';

export const FooterComponent = () => {
    return (
        <Footer
            style={{
                backgroundColor: '#04081d', bottom: 0
            }}

            copyrights={
                <p className="center" style={{ padding: 0, marginTop: -15, marginBottom: -5 }}>Designed and Developed By: <a href="https://github.com/nikhil026/covid19-tracker">Nikhil Gupta</a>
                &nbsp;&nbsp;
                    <br />
                   Created using React, Chart.js, MaterializeCSS and lots of &nbsp;<i style={styles.heartIcon} className="red material-icons red red">favorite</i>
                </p>
            } />
    )

}
const styles = {
    heartIcon: {
        borderRadius: 30,
        padding: 5
    }
}