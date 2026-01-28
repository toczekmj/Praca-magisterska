'use client'

import FolderButton from "@/components/Files/FolderButton";
import {Models} from "appwrite";
import {GenreColumns} from "@/lib/genresDb";
import {Card, Separator, Text} from "@radix-ui/themes";

interface FolderBrowserProps {
    folders: Models.DefaultRow[];
    selectedFolder: string | null;
    onFolderSelect: (folderId: string) => void;
}

export default function FolderBrowser({folders, selectedFolder, onFolderSelect} : FolderBrowserProps) {
    const isSelectedFolder = (folderSlug: string) => {
        return selectedFolder === folderSlug;
    }

    return (
        <Card>
            <div className={"flex flex-col min-w-50 min-h-120 text-nowrap gap-1.5"}>
                <Text size={"4"}>Folders</Text>
                <Separator size={"4"}/>
                {
                    folders ? (
                        folders.map((genre, index) => (
                            <FolderButton key={index}
                                          label={genre[GenreColumns.ReadableName]}
                                          selected={isSelectedFolder(genre[GenreColumns.Slug])}
                                          onFolderClick={() => onFolderSelect(genre[GenreColumns.Slug])}

                            />
                        ))
                    ) : <></>
                }
            </div>
        </Card>
    );
}