import {clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {resolve} from "@bonfida/spl-name-service";


const suppliedAddress = process.argv[2];
if (!suppliedAddress) {
    throw new Error("Provide a public key to check the balance of!");
}

const connection = new Connection(clusterApiUrl("mainnet-beta"), "bonfida");

async function getPublicKey(address: string) {
    try {
        //Try to resolve as domain name;
        return await resolve(connection, address);
    } catch (error) {
        //If it fails, try to parse as public key;
        try {
            return new PublicKey(address);
        } catch (publicKeyError) {
            throw new Error("Invalid address or domain name provided. Please check the address and try again.");
        }

    }
}

async function getBalance(publicKey: PublicKey) {
    const balanceInLamports = await connection.getBalance(publicKey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
    return balanceInSOL;
}

(async () => {
    let publicKey;
    try {
        publicKey = await getPublicKey(suppliedAddress);
    } catch (error) {
        console.error(`❌ ${error.message}`);
        process.exit(1);

    }

    try {
        const balanceInSOL = await getBalance(publicKey);
        console.log(
            `✅ Finished! The balance for the wallet at address ${publicKey.toBase58()} is ${balanceInSOL}!`
        );
    } catch (error) {
        console.error(`❌ Failed to get balance for ${suppliedAddress} (${publicKey.toBase58()}).`);
    }
})();


