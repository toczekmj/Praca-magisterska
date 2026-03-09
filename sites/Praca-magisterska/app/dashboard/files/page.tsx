'use client'

import FileBrowserWindow from "@/components/Files/FileBrowserWindow";
import { useFoldersQuery } from "@/CodeBehind/Components/Files/useFoldersQuery";

export default function Files() {

    const { data: folders, isLoading, isError, errorMessage } = useFoldersQuery();

    return (
        <div className="flex grow flex-col">
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error: {errorMessage}</div>}
            {folders && <FileBrowserWindow folders={folders} />}
        </div>
    );
}