const { Wallet, Client } = require("xrpl");

const ECDSA = require("xrpl/dist/npm/ECDSA");

 
function createWallet() {
    const newWallet = Wallet.generate(ECDSA.ed25519);

    console.log(newWallet);

    return newWallet.seed.toString();
}


 

async function fundWallet(seed) {
    const wallet = Wallet.fromSeed(seed);
    const client = new Client("wss://s.altnet.rippletest.net/");

    await client.connect();

    console.log("are we connected? " + client.isConnected());

    const result = await client.fundWallet(wallet);

    console.log(result);
}


 
//createWallet();
fundWallet(createWallet());
 