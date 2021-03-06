//This function converts cumulative to non cumulative array and returns 
// updated array skipping the first element as it not useful 

export const convertCumulativeToAccumulative = (array) => {
    if (array) {
        return array.map((e, i) => e - array[i - 1] || (e)).slice(1, array.length);
    }
    return [];
}

export const countryToSlug = (countryName) => {
    let countrySlugObject = { "Afghanistan": "afghanistan", "Albania": "albania", "Algeria": "algeria", "Andorra": "andorra", "Angola": "angola", "Antigua and Barbuda": "antigua-and-barbuda", "Argentina": "argentina", "Armenia": "armenia", "Australia": "australia", "Austria": "austria", "Azerbaijan": "azerbaijan", "Bahamas": "bahamas", "Bahrain": "bahrain", "Bangladesh": "bangladesh", "Barbados": "barbados", "Belarus": "belarus", "Belgium": "belgium", "Belize": "belize", "Benin": "benin", "Bhutan": "bhutan", "Bolivia": "bolivia", "Bosnia and Herzegovina": "bosnia-and-herzegovina", "Botswana": "botswana", "Brazil": "brazil", "Brunei Darussalam": "brunei", "Bulgaria": "bulgaria", "Burkina Faso": "burkina-faso", "Burundi": "burundi", "Cambodia": "cambodia", "Cameroon": "cameroon", "Canada": "canada", "Cape Verde": "cape-verde", "Central African Republic": "central-african-republic", "Chad": "chad", "Chile": "chile", "China": "china", "Colombia": "colombia", "Comoros": "comoros", "Congo (Brazzaville)": "congo-brazzaville", "Congo (Kinshasa)": "congo-kinshasa", "Costa Rica": "costa-rica", "Croatia": "croatia", "Cuba": "cuba", "Cyprus": "cyprus", "Czech Republic": "czech-republic", "Côte d'Ivoire": "cote-divoire", "Denmark": "denmark", "Djibouti": "djibouti", "Dominica": "dominica", "Dominican Republic": "dominican-republic", "Ecuador": "ecuador", "Egypt": "egypt", "El Salvador": "el-salvador", "Equatorial Guinea": "equatorial-guinea", "Eritrea": "eritrea", "Estonia": "estonia", "Ethiopia": "ethiopia", "Fiji": "fiji", "Finland": "finland", "France": "france", "Gabon": "gabon", "Gambia": "gambia", "Georgia": "georgia", "Germany": "germany", "Ghana": "ghana", "Greece": "greece", "Grenada": "grenada", "Guatemala": "guatemala", "Guinea": "guinea", "Guinea-Bissau": "guinea-bissau", "Guyana": "guyana", "Haiti": "haiti", "Holy See (Vatican City State)": "holy-see-vatican-city-state", "Honduras": "honduras", "Hungary": "hungary", "Iceland": "iceland", "India": "india", "Indonesia": "indonesia", "Iran, Islamic Republic of": "iran", "Iraq": "iraq", "Ireland": "ireland", "Israel": "israel", "Italy": "italy", "Jamaica": "jamaica", "Japan": "japan", "Jordan": "jordan", "Kazakhstan": "kazakhstan", "Kenya": "kenya", "Korea (South)": "korea-south", "Kuwait": "kuwait", "Kyrgyzstan": "kyrgyzstan", "Lao PDR": "lao-pdr", "Latvia": "latvia", "Lebanon": "lebanon", "Lesotho": "lesotho", "Liberia": "liberia", "Libya": "libya", "Liechtenstein": "liechtenstein", "Lithuania": "lithuania", "Luxembourg": "luxembourg", "Macedonia, Republic of": "macedonia", "Madagascar": "madagascar", "Malawi": "malawi", "Malaysia": "malaysia", "Maldives": "maldives", "Mali": "mali", "Malta": "malta", "Mauritania": "mauritania", "Mauritius": "mauritius", "Mexico": "mexico", "Moldova": "moldova", "Monaco": "monaco", "Mongolia": "mongolia", "Montenegro": "montenegro", "Morocco": "morocco", "Mozambique": "mozambique", "Myanmar": "myanmar", "Namibia": "namibia", "Nepal": "nepal", "Netherlands": "netherlands", "New Zealand": "new-zealand", "Nicaragua": "nicaragua", "Niger": "niger", "Nigeria": "nigeria", "Norway": "norway", "Oman": "oman", "Pakistan": "pakistan", "Palestinian Territory": "palestine", "Panama": "panama", "Papua New Guinea": "papua-new-guinea", "Paraguay": "paraguay", "Peru": "peru", "Philippines": "philippines", "Poland": "poland", "Portugal": "portugal", "Qatar": "qatar", "Republic of Kosovo": "kosovo", "Romania": "romania", "Russian Federation": "russia", "Rwanda": "rwanda", "Saint Kitts and Nevis": "saint-kitts-and-nevis", "Saint Lucia": "saint-lucia", "Saint Vincent and Grenadines": "saint-vincent-and-the-grenadines", "San Marino": "san-marino", "Sao Tome and Principe": "sao-tome-and-principe", "Saudi Arabia": "saudi-arabia", "Senegal": "senegal", "Serbia": "serbia", "Seychelles": "seychelles", "Sierra Leone": "sierra-leone", "Singapore": "singapore", "Slovakia": "slovakia", "Slovenia": "slovenia", "Somalia": "somalia", "South Africa": "south-africa", "South Sudan": "south-sudan", "Spain": "spain", "Sri Lanka": "sri-lanka", "Sudan": "sudan", "Suriname": "suriname", "Swaziland": "swaziland", "Sweden": "sweden", "Switzerland": "switzerland", "Syrian Arab Republic (Syria)": "syria", "Taiwan, Republic of China": "taiwan", "Tajikistan": "tajikistan", "Tanzania, United Republic of": "tanzania", "Thailand": "thailand", "Timor-Leste": "timor-leste", "Togo": "togo", "Trinidad and Tobago": "trinidad-and-tobago", "Tunisia": "tunisia", "Turkey": "turkey", "Uganda": "uganda", "Ukraine": "ukraine", "United Arab Emirates": "united-arab-emirates", "United Kingdom": "united-kingdom", "United States of America": "united-states", "Uruguay": "uruguay", "Uzbekistan": "uzbekistan", "Venezuela (Bolivarian Republic)": "venezuela", "Viet Nam": "vietnam", "Western Sahara": "western-sahara", "Yemen": "yemen", "Zambia": "zambia", "Zimbabwe": "zimbabwe" };
    return countrySlugObject[countryName];
}


// array, sortKey, 0/1 => 0 for decreasing and 1 for increasing order
export const sortObjArrayWithKeyAndDirection = (array, sortBy, sortDirection) => {
    if (sortDirection === 0) {
        return array.sort((a, b) => b[sortBy] > a[sortBy] ? 1 : -1)

    } else {
        return array.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1)
    }
}

export const countryAutocomplete = { "Afghanistan": null, "Albania": null, "Algeria": null, "Andorra": null, "Angola": null, "Antigua and Barbuda": null, "Argentina": null, "Armenia": null, "Australia": null, "Austria": null, "Azerbaijan": null, "Bahamas": null, "Bahrain": null, "Bangladesh": null, "Barbados": null, "Belarus": null, "Belgium": null, "Belize": null, "Benin": null, "Bhutan": null, "Bolivia": null, "Bosnia and Herzegovina": null, "Botswana": null, "Brazil": null, "Brunei Darussalam": null, "Bulgaria": null, "Burkina Faso": null, "Burundi": null, "Cambodia": null, "Cameroon": null, "Canada": null, "Cape Verde": null, "Central African Republic": null, "Chad": null, "Chile": null, "China": null, "Colombia": null, "Comoros": null, "Congo (Brazzaville)": null, "Congo (Kinshasa)": null, "Costa Rica": null, "Croatia": null, "Cuba": null, "Cyprus": null, "Czech Republic": null, "Côte d'Ivoire": null, "Denmark": null, "Djibouti": null, "Dominica": null, "Dominican Republic": null, "Ecuador": null, "Egypt": null, "El Salvador": null, "Equatorial Guinea": null, "Eritrea": null, "Estonia": null, "Ethiopia": null, "Fiji": null, "Finland": null, "France": null, "Gabon": null, "Gambia": null, "Georgia": null, "Germany": null, "Ghana": null, "Greece": null, "Grenada": null, "Guatemala": null, "Guinea": null, "Guinea-Bissau": null, "Guyana": null, "Haiti": null, "Holy See (Vatican City State)": null, "Honduras": null, "Hungary": null, "Iceland": null, "India": null, "Indonesia": null, "Iran, Islamic Republic of": null, "Iraq": null, "Ireland": null, "Israel": null, "Italy": null, "Jamaica": null, "Japan": null, "Jordan": null, "Kazakhstan": null, "Kenya": null, "Korea (South)": null, "Kuwait": null, "Kyrgyzstan": null, "Lao PDR": null, "Latvia": null, "Lebanon": null, "Lesotho": null, "Liberia": null, "Libya": null, "Liechtenstein": null, "Lithuania": null, "Luxembourg": null, "Macedonia, Republic of": null, "Madagascar": null, "Malawi": null, "Malaysia": null, "Maldives": null, "Mali": null, "Malta": null, "Mauritania": null, "Mauritius": null, "Mexico": null, "Moldova": null, "Monaco": null, "Mongolia": null, "Montenegro": null, "Morocco": null, "Mozambique": null, "Myanmar": null, "Namibia": null, "Nepal": null, "Netherlands": null, "New Zealand": null, "Nicaragua": null, "Niger": null, "Nigeria": null, "Norway": null, "Oman": null, "Pakistan": null, "Palestinian Territory": null, "Panama": null, "Papua New Guinea": null, "Paraguay": null, "Peru": null, "Philippines": null, "Poland": null, "Portugal": null, "Qatar": null, "Republic of Kosovo": null, "Romania": null, "Russian Federation": null, "Rwanda": null, "Saint Kitts and Nevis": null, "Saint Lucia": null, "Saint Vincent and Grenadines": null, "San Marino": null, "Sao Tome and Principe": null, "Saudi Arabia": null, "Senegal": null, "Serbia": null, "Seychelles": null, "Sierra Leone": null, "Singapore": null, "Slovakia": null, "Slovenia": null, "Somalia": null, "South Africa": null, "South Sudan": null, "Spain": null, "Sri Lanka": null, "Sudan": null, "Suriname": null, "Swaziland": null, "Sweden": null, "Switzerland": null, "Syrian Arab Republic (Syria)": null, "Taiwan, Republic of China": null, "Tajikistan": null, "Tanzania, United Republic of": null, "Thailand": null, "Timor-Leste": null, "Togo": null, "Trinidad and Tobago": null, "Tunisia": null, "Turkey": null, "Uganda": null, "Ukraine": null, "United Arab Emirates": null, "United Kingdom": null, "United States of America": null, "Uruguay": null, "Uzbekistan": null, "Venezuela (Bolivarian Republic)": null, "Viet Nam": null, "Western Sahara": null, "Yemen": null, "Zambia": null, "Zimbabwe": null };

export const indiaStateAndUTAutoComplete = { "Andaman and Nicobar Islands": null, "Andhra Pradesh": null, "Arunachal Pradesh": null, "Assam": null, "Bihar": null, "Chandigarh": null, "Chhattisgarh": null, "Dadar Nagar Haveli": null, "Delhi": null, "Goa": null, "Gujarat": null, "Haryana": null, "Himachal Pradesh": null, "Jammu and Kashmir": null, "Jharkhand": null, "Karnataka": null, "Kerala": null, "Ladakh": null, "Madhya Pradesh": null, "Maharashtra": null, "Manipur": null, "Meghalaya": null, "Mizoram": null, "Nagaland": null, "Odisha": null, "Puducherry": null, "Punjab": null, "Rajasthan": null, "Sikkim": null, "Tamil Nadu": null, "Telengana": null, "Tripura": null, "Uttarakhand": null, "Uttar Pradesh": null, "West Bengal": null };

export const commonConfigForLineGraph = {
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


export const createDynamicColorArray = (arraySize) => {

    let dynamicColorsArray = [];


    for (let i = 0; i < arraySize; i++) {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        dynamicColorsArray.push(`rgb(${r},${g},${b})`)
    }
    return dynamicColorsArray;
}

export const scaleHighDigits = value => {
    var ranges = [
        { divider: 1e6, suffix: 'M' },
        { divider: 1e3, suffix: 'k' }
    ];
    function formatNumber(n) {
        for (var i = 0; i < ranges.length; i++) {
            if (n >= ranges[i].divider) {
                return (n / ranges[i].divider).toString() + ranges[i].suffix;
            }
        }
        return n;
    }
    return formatNumber(value);
}