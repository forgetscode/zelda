import { PublicKey, clusterApiUrl, Connection } from "@solana/web3.js";
import * as anchor from '@project-serum/anchor';
import  idl from '../../target/idl/sms2.json';
import { Sms2 } from '../../target/types/sms2';
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";

type Workspace =  {
    wallet: WalletContextState;
    programID: PublicKey;
    network: string;
    connection: Connection;
    provider: anchor.Provider;
    program: anchor.Program<Sms2>;
}

export const CreateWorkspace = () => {
    const wallet = useWallet();
    const programID = new PublicKey("3Zh7L3EgBgiH3zvebFmUKCxBXZkYRhrG14WAPKXLemzU");              
    const network = clusterApiUrl('devnet');
    const connection = new Connection(network, "processed");
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const program = new anchor.Program<Sms2>(idl as any, programID, provider);
    const WorkspaceObject = {wallet, programID, network, connection, provider, program}
    return WorkspaceObject;
}