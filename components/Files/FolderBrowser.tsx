'use client'

import FolderButton from "@/components/Files/FolderButton";
import {Models} from "appwrite";
import {CreateFolder, DeleteFolder, GenreColumns} from "@/lib/genresDb";
import {Button, Card, Separator, Text} from "@radix-ui/themes";
import {FolderUpdateEvent} from "@/app/Enums/FolderUpdateEvent";

interface FolderBrowserProps {
    folders: Models.DefaultRow[] | null;
    selectedFolder: string | null;
    onFolderSelect: (event: FolderUpdateEvent, folderId: string | null) => void;
}

export default function FolderBrowser({folders, selectedFolder, onFolderSelect} : FolderBrowserProps) {
    const isSelectedFolder = (id: string) => {
        return selectedFolder === id;
    }

    async function deleteFolder() {
        if (selectedFolder) {
            await DeleteFolder(selectedFolder);
            onFolderSelect(FolderUpdateEvent.Delete, null);
        }
    }

    async function createFolder(){
        const result = await CreateFolder("Test3");
        console.log(result);
        onFolderSelect(FolderUpdateEvent.Create, result[GenreColumns.ID]);
    }

    return (
        <Card>
            <div className={"flex flex-col justify-between gap-3"}>
                <div className={"flex flex-col min-w-50 min-h-120 text-nowrap gap-1.5"}>
                    <Text size={"4"}>Folders</Text>
                    <Separator size={"4"}/>
                    {
                        folders ? (
                            folders.map((genre, index) => (
                                <FolderButton key={index}
                                              label={genre[GenreColumns.ReadableName]}
                                              selected={isSelectedFolder(genre[GenreColumns.ID])}
                                              onFolderClick={() => onFolderSelect(FolderUpdateEvent.Select, genre[GenreColumns.ID])}

                                />
                            ))
                        ) : <></>
                    }
                </div>

                <Separator size={"4"}/>

                <div className={"flex flex-row justify-around gap-3"}>
                    <Button variant={"solid"}
                            onClick={createFolder}
                    >[+]</Button>

                    <Button variant={"solid"}
                            color={"blue"}
                            disabled={selectedFolder === null}
                    >[...]</Button>

                    <Button variant={"solid"}
                            color={"red"}
                            disabled={selectedFolder === null}
                            onClick={deleteFolder}
                    >[-]</Button>
                </div>
            </div>
        </Card>
    );
}