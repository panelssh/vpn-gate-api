const request = require('request-promise');
const csv = require('csvtojson');

async function getCSV() {
    // get data from VPN Gate API
    try {
        const data = await request('https://www.vpngate.net/api/iphone/');
        return data.replace(/\*vpn_servers\r\n/gm, '')
            .replace('#HostName,', 'hostname,')
            .replace('IP,', 'ip_address,')
            .replace('Score,', 'score,')
            .replace('Ping,', 'ping,')
            .replace('Speed,', 'speed,')
            .replace('CountryLong,', 'country,')
            .replace('CountryShort,', 'country_code,')
            .replace('NumVpnSessions,', 'sessions,')
            .replace('Uptime,', 'uptime,')
            .replace('TotalUsers,', 'total_users,')
            .replace('TotalTraffic,', 'total_traffic,')
            .replace('LogType,', 'log_type,')
            .replace('Operator,', 'operator,')
            .replace('Message,', 'message,')
            .replace('OpenVPN_ConfigData_Base64', 'config')
            .replace(/\n\*/gm, '')
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = async function () {
    let data;

    // getCSV
    try {
        data = await getCSV();
    } catch (error) {
        console.error(error);
        throw error;
    }

    return csv()
        .fromString(data)
        .then(csvRow => csvRow, (error) => {
            console.error(error);
            throw error
        });
}