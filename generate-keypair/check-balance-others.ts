import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {getHashedNameSync, getNameAccountKeySync, NameRegistryState} from "@bonfida/spl-name-service"



const suppliedPublicKeyOrDomain  = process.argv[2];
if (!suppliedPublicKeyOrDomain ) {
    throw new Error("Provide a public key or SNS domain to check the balance of!");
}

const isValidBase58 = (str: string) => {
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
    return base58Regex.test(str);
}

// Function to resolve SNS domain to a public key
const resolveDomain = async (domain: string): Promise<PublicKey> => {
    const hashedName = await getHashedNameSync(domain);
    const nameAccountKey = await getNameAccountKeySync(hashedName, new PublicKey("SNS111111111111111111111111111111111111111"));
    const registry = await NameRegistryState.retrieve(connection, nameAccountKey);
    return registry.owner;
};

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

const publicKey = new PublicKey(suppliedPublicKeyOrDomain );

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
    `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
);