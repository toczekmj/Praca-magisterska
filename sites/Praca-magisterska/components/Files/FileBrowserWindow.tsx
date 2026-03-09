'use client'

import {Card} from "@radix-ui/themes";
import FolderBrowser from "@/components/Files/FolderBrowser/FolderBrowser";
import FileBrowser from "@/components/Files/FileBrowser/FileBrowser";
import React from "react";
import { Genres } from "@/Generated/appwrite/types";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/TanStack/queryKeys";

interface FileBrowserWindowProps {
    folders: Genres[] | null;
}

export default function FileBrowserWindow({folders}: FileBrowserWindowProps) {
    const [selectedFolder, setSelectedFolder] = React.useState<string | null>(null);
    const queryClient = useQueryClient();

    const handleFolderInvalidate = () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.folders });
    }


    return (
        <Card size="3">
            <div className={"flex flex-row gap-2"}>
                <div className={"min-w-[22%]"}>
                    <FolderBrowser
                        onFolderInvalidate={handleFolderInvalidate}
                        onFolderSelect={(id) => setSelectedFolder(id)}
                        selectedFolder={selectedFolder}
                        folders={folders}/>
                </div>
                <div className={"min-w-[78%]"}>
                    <FileBrowser folderId={selectedFolder}/>
                </div>
            </div>
        </Card>
    );
}