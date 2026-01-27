import { Client, Account, /*TablesDB*/ } from "appwrite"

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setDevKey(process.env.NEXT_PUBLIC_DEV_KEY!);

export const account = new Account(client);
// export const tablesDb = new TablesDB(client);

export { ID } from "appwrite"; 