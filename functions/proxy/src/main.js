import {Client, TablesDB, ID} from 'node-appwrite';

// eslint-disable-next-line import/no-anonymous-default-export
export default async ({ req, res, log, error }) => {

  const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setJWT(req.headers['X-Appwrite-JWT'] ?? '')

  log(`JWT: ${req.headers['X-Appwrite-JWT'] ?? 'not-provided'}`)
  const tablesDb = new TablesDB(client);


  try {
    const dbId = process.env.APPWRITE_DATABASE_ID;
    log(`DB ID: ${dbId}`)
    log(`Body: ${JSON.stringify(req.body)}`)
    const fileId = req.body['fileId'];
    log(`File ID: ${fileId}`)
    const data = req.body['data'];
    log(`Data: ${data}`)
    const tx = await tablesDb.createTransaction();
    log(`Transaction ID: ${tx.$id}`)

    await tablesDb.createRow({
      databaseId: dbId,
      rowId: ID.unique(),
      tableId: "transform_data",
      transactionId: tx.$id,
      data: {
        "file": fileId,
        "data": data
      }
    })

    await tablesDb.updateRow({
      databaseId: dbId,
      rowId: fileId,
      tableId: "files",
      transactionId: tx.$id,
      data: {
        "is_transformed": true
      }
    })
    log(`Transaction updated`)
  } catch(err) {
    error("Proxy error: " + err.message);
    return res.json({error: err.message});
  }
  return res.text("ok", 200);
};
