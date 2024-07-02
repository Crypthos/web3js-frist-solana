import {clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
let publicKey;

if (!suppliedPublicKey) {
    throw new Error("Provide a public key to check the balance of!");
}

const connection = new Connection(clusterApiUrl("mainnet-beta"),"confirmed");

try {
    publicKey = new PublicKey(suppliedPublicKey);
} catch (error) {
    throw new Error("❌ Invalid public key provided. Please check the address and try again.");
}


const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
    `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
);