'use strict'
if (typeof module !== "undefined") {

  var xrpl = require('xrpl');
};


const cc = require('five-bells-condition');
const crypto = require('crypto');
const { isNumber } = require('util');

const seed = "sEd7jfWyNG6J71dEojB3W9YdHp2KCjy";

const main = async () => {
  try {
  
  
    const preimageData = crypto.randomBytes(32);
    const myFulfillment = new cc.PreimageSha256();
    myFulfillment.setPreimage(preimageData);
    const conditionHex = myFulfillment.getConditionBinary().toString('hex').toUpperCase();

    console.log('Condition:', conditionHex);
    console.log('Fulfillment:', myFulfillment.serializeBinary().toString('hex').toUpperCase());
    

    
    const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
    await client.connect();

    
    const wallet = xrpl.Wallet.fromSeed(seed);
    console.log("Wallet Address: ", wallet.address);
    console.log("Seed: ", seed);

    
    let finishAfter = new Date((new Date().getTime() / 1000) + 120); 
    finishAfter = new Date(finishAfter * 1000);
    console.log("This escrow will finish after: ", finishAfter);

    const escrowCreateTransaction = {
      "TransactionType": "EscrowCreate",
      "Account": wallet.address,
      "Destination": wallet.address,
      "Amount": "6000000", 
      "DestinationTag": 2023,
      "Condition": conditionHex,
      "Fee": "12",
      "FinishAfter": xrpl.isoTimeToRippleTime(finishAfter.toISOString()), 
  };

    xrpl.validate(escrowCreateTransaction);

    console.log('Signing and submitting the transaction:', JSON.stringify(escrowCreateTransaction, null,  "\t"), "\n");
    const response  = await client.submitAndWait(escrowCreateTransaction, { wallet });
    console.log(`Sequence number: ${response.result.Sequence}`);
    console.log(`Finished submitting! ${JSON.stringify(response.result, null, "\t")}`);

    await client.disconnect();
    
  } catch (error) {
    console.log(error);
  }
}

main()





