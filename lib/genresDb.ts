import {tablesDb} from "@/lib/appwrite";
import {ID, Query} from "appwrite";

export enum GenreColumns {
    "ID" = "$id",
    "CreatedAt" = "$createdAt",
    "UpdatedAt" = "$updatedAt",
    "ReadableName" = "ReadableName",
    "Slug" = "Slug",
    "Samples" = "samples",
}



export async function GetFolders(){
    const result = await tablesDb.listRows({
        databaseId: "697a22dd0016001f7e6b",
        tableId: "genres",
        queries: [
            Query.select([GenreColumns.ReadableName, GenreColumns.Slug]),
            Query.orderDesc(GenreColumns.UpdatedAt),
        ],
    });

    return result.rows;
}

export async function GetFiles(folderId: string)
{
    const result = await tablesDb.listRows({
        databaseId: "697a22dd0016001f7e6b",
        tableId: "files",
        queries: [
            Query.equal("genre", folderId),
        ]
    })

    return result.rows;
}

export async function DeleteFolder(folderId: string) {
    await tablesDb.deleteRow({
        databaseId: "697a22dd0016001f7e6b",
        tableId: "genres",
        rowId: folderId,
    })
}

export async function CreateFolder(folderName: string) {
    return await tablesDb.createRow({
        rowId: ID.unique(),
        databaseId: "697a22dd0016001f7e6b",
        tableId: "genres",
        data: {
            "ReadableName": folderName,
            "Slug": folderName + "-slug",
        }
    });
}