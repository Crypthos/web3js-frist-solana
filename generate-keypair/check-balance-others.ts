import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

// Get the public key from the command line arguments
const suppliedPublicKey = process.argv[2];
// Check if the public key was provided
if (!suppliedPublicKey) {
    throw new Error("Provide a public key to check the balance of!");
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const publicKey = new PublicKey(suppliedPublicKey);

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
    `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
);