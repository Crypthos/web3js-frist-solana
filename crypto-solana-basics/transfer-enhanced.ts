import {Connection, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey, clusterApiUrl} from "@solana/web3.js";
import "dotenv/config"
import {getKeypairFromEnvironment} from "@solana-developers/helpers";


const suppliedToPubkey = process.argv[2] || null;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");


if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);

}

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);

console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

const transaction = new Transaction();

const LAMPORTS_TO_SEND = 5000;

// Transfer lamports to the destination account
const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
});

// Add the transfer instruction to the transaction
transaction.add(sendSolInstruction);

// Sign the transaction with the sender's keypair
const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
]);

console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
);
console.log(`Transaction signature is ${signature}!`);