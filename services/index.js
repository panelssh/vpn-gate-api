const admin = require('firebase-admin');
const chunk = require('lodash.chunk');

// helpers
const convertCSVtoJSON = require('../helpers')

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(Buffer.from(process.env.FIREBASE, 'base64').toString())),
});

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

// start count
async function countConfig() {
    // count document size on configs collection
    try {
        const data = await db.collection('configs').get();
        return data.size;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

async function countServer() {
    // count document size on servers collection
    try {
        const data = await db.collection('servers').get();
        return data.size;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

module.exports.countData = async function () {
    const data = {};

    // countConfig
    try {
        data.configs = await countConfig();
    } catch (error) {
        console.error(error)
        throw error;
    }

    // countServer
    try {
        data.servers = await countServer();
    } catch (error) {
        console.error(error)
        throw error;
    }

    return data;
}
// end count

// start save
async function saveConfig(servers) {
    // insert batch to configs collection
    try {
        const batches = chunk(servers, 500).map((data) => {
            const writeBatch = db.batch();
            data.forEach((value) => {
                const docRef = db.doc(`configs/${value.ip_address}`);
                writeBatch.set(docRef, {
                    ovpn: Buffer.from(value.config, 'base64').toString(),
                    username: 'vpn',
                    password: 'vpn',
                }, { merge: true });
            });

            return writeBatch.commit();
        });

        await Promise.all(batches);
    } catch (error) {
        console.error(error)
        throw error;
    }

    return true;
}

async function saveServer(servers) {
    // insert batch to servers collection
    try {
        const batches = chunk(servers, 500).map((data) => {
            const writeBatch = db.batch();
            data.forEach((value) => {
                const docRef = db.doc(`servers/${value.ip_address}`);
                writeBatch.set(docRef, {
                    country: value.country,
                    ipadd: value.ip_address,
                    ping: value.ping,
                    users: value.total_users,
                    flag: `https://www.countryflags.io/${value.country_code}/shiny/64.png`,
                    config: `configs/${value.ip_address}`,
                }, { merge: true });
            });

            return writeBatch.commit();
        });

        await Promise.all(batches);
    } catch (error) {
        console.error(error)
        throw error;
    }

    return true;
}

module.exports.saveData = async function () {
    let servers;

    // convertCSVtoJSON
    try {
        servers = await convertCSVtoJSON();
    } catch (error) {
        console.error(error);
        throw error;
    }

    // saveConfig
    try {
        await saveConfig(servers);
    } catch (error) {
        console.error(error)
        throw error;
    }

    // saveServer
    try {
        await saveServer(servers);
    } catch (error) {
        console.error(error)
        throw error;
    }

    // sendNotification
    try {
        await this.sendNotification({
            title: 'New Servers Available',
            body: 'Hello my dear, i has update servers.',
        });
    } catch (error) {
        console.error(error)
        throw error;
    }

    return true;
}
// end save

// start remove
async function removeConfig() {
    let data;

    // get list document on configs collection
    try {
        data = await db.collection('configs').listDocuments();
    } catch (error) {
        console.error(error)
        throw error;
    }

    // remove all document on configs collection with batch method
    try {
        const batches = chunk(data, 500).map((snapshot) => {
            const writeBatch = db.batch();
            snapshot.forEach((docsId) => {
                writeBatch.delete(docsId);
            });
            return writeBatch.commit();
        });

        await Promise.all(batches);
    } catch (error) {
        console.error(error)
        throw error;
    }

    return true;
}

async function removeServer() {
    let data;

    // get list document on servers collection
    try {
        data = await db.collection('servers').listDocuments();
    } catch (error) {
        console.error(error)
        throw error;
    }

    // remove all document on servers collection with batch method
    try {
        const batches = chunk(data, 500).map((snapshot) => {
            const writeBatch = db.batch();
            snapshot.forEach((docsId) => {
                writeBatch.delete(docsId);
            });
            return writeBatch.commit();
        });

        await Promise.all(batches);
    } catch (error) {
        console.error(error)
        throw error;
    }

    return true;
}

module.exports.removeData = async function () {
    // removeConfig
    try {
        await removeConfig();
    } catch (error) {
        console.error(error)
        throw error;
    }

    // removeServer
    try {
        await removeServer();
    } catch (error) {
        console.error(error)
        throw error;
    }

    return true;
}
// end remove

module.exports.sendNotification = async function (notification) {
    // send notification with topic newServers
    try {
        await admin.messaging().send({
            notification,
            android: {
                notification: {
                    clickAction: 'OPEN_SERVERS_ACTIVITY',
                }
            },
            topic: 'newServers'
        });
    } catch (error) {
        console.error(error)
        throw error;
    }

    return true;
}
