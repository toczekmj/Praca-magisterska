import {tablesDb} from "@/lib/appwrite";
import {Query} from "appwrite";

export enum GenreColumns {
    "ID" = "$id",
    "CreatedAt" = "$createdAt",
    "UpdatedAt" = "$updatedAt",
    "ReadableName" = "ReadableName",
    "Slug" = "slug"
}

const dbId = process.env.APPWRITE_DB_ID!;
const tableId = process.env.APPWRITE_GENRES_TABLE!;

export async function GetFolders(){
    const result = await tablesDb.listRows({
        databaseId: dbId,
        tableId: tableId,
        queries: [
            Query.select([GenreColumns.ReadableName, GenreColumns.Slug]),
            Query.orderDesc(GenreColumns.UpdatedAt),
        ],
    });

    return result.rows;
}