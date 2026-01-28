'use client'

import FileBrowserWindow from "@/components/Files/FileBrowserWindow";
import {useEffect, useState} from "react";
import {Models} from "appwrite";
import {GetFolders} from "@/lib/genresDb";
import {FolderUpdateEvent} from "@/app/Enums/FolderUpdateEvent";

export default function Files() {

    const [folders, setFolders] = useState<Models.DefaultRow[] | null>(null);
    const [event, setEvent] = useState<FolderUpdateEvent | null>(null);

    useEffect(() => {
        if (event != FolderUpdateEvent.Select){
            GetFolders().then(v => setFolders(v));
        }
    }, [event])

    return (
        <div className="browser">
            <FileBrowserWindow
                folders={folders}
                onFolderModify={setEvent}
            />
        </div>
    );
}