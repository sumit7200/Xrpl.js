const bitcoin = require('bitcoinjs-lib');

// Generate private keys for each signer (In a real scenario, these should be securely generated and stored)
const privateKeys = [
  'privateKey1',
  'privateKey2',
  // ... add more private keys as needed
];

// Convert private keys to key pairs
const keyPairs = privateKeys.map(privateKey => bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex')));

// Create a redeem script that enforces the multisignature requirement (2 of 3 signatures)
const multisigScript = bitcoin.script.compile([
  bitcoin.opcodes.OP_2,
  keyPairs[0].publicKey,
  keyPairs[1].publicKey,
  keyPairs[2].publicKey,
  bitcoin.opcodes.OP_3,
  bitcoin.opcodes.OP_CHECKMULTISIG,
]);

// Generate a P2SH address from the multisig script
const multisigAddress = bitcoin.payments.p2sh({ redeem: { output: multisigScript, network: bitcoin.networks.bitcoin } }).address;

console.log('Multisig Address:', multisigAddress);
