'use client'

import {Card} from "@radix-ui/themes";
import FolderBrowser from "@/components/Files/FolderBrowser";
import FileBrowser from "@/components/Files/FileBrowser";
import {Models} from "appwrite";
import React from "react";

interface FileBrowserWindowProps {
    folders: Models.DefaultRow[];
}

export default function FileBrowserWindow({folders}: FileBrowserWindowProps) {
    const [selectedFolder, setSelectedFolder] = React.useState<string | null>(null);

    return (
        <Card size="3">
                <div className={"flex flex-row gap-2"}>
                    <FolderBrowser
                        selectedFolder={selectedFolder}
                        onFolderSelect={setSelectedFolder}
                        folders={folders} />
                    <FileBrowser folderId={selectedFolder} />
                </div>
        </Card>
    );
}