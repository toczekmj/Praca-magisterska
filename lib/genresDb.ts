import {tablesDb} from "@/lib/appwrite";
import {Query} from "appwrite";

export enum GenreColumns {
    "ReadableName" = "ReadableName",
    "Slug" = "slug"
}

export async function GetAllGenres(){
    const result = await tablesDb.listRows({
        databaseId: "697a22dd0016001f7e6b",
        tableId: "availablegenres",
        queries: [
            Query.limit(10)
        ],
    });

    return result.rows;
}