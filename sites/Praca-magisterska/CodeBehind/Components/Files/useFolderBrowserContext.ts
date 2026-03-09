import {useAuth} from "@/components/Auth/AuthContext";
import {CreateFolder, DeleteFolder, UpdateFolder} from "@/lib/Database/Services/FolderService";
import { Genres } from "@/Generated/appwrite/types";

export interface FolderBrowserProps {
    folders: Genres[] | null;
    selectedFolder: string | null;
    onFolderInvalidate: () => void;
    onFolderSelect: (id: string | null) => void;
}

function useFolderBrowserContext({selectedFolder, folders, onFolderInvalidate, onFolderSelect} : FolderBrowserProps) {
    const {currentUserInfo} = useAuth();

    const isSelectedFolder = (id: string) => {
        return selectedFolder === id;
    }

    async function deleteFolder() {
        if (selectedFolder) {
            await DeleteFolder(selectedFolder);
            onFolderInvalidate();
            onFolderSelect(null);
        }
    }

    function onFolderClick(folderId: string) {
        onFolderSelect(folderId)
    }

    function OnFolderInvalidate() {
        onFolderInvalidate();
    }

    async function createFolder(name: string | null){
        if (name == null || name == "") {
            console.error("Name is required");
            return;
        }

        const result = await CreateFolder(name, currentUserInfo?.$id ?? "");
        onFolderInvalidate();
        onFolderSelect(result.$id);
    }

    async function editFolder(name: string){
        if (name == "" || selectedFolder == null) {
            console.error("Name is required when editing folder");
            return;
        }

        const result = await UpdateFolder(selectedFolder, name);
        onFolderInvalidate();
    }

    function getSelectedFolderName() {
        const res = folders?.find(row => row.$id == selectedFolder);
        return res ? res.ReadableName : "";
    }

    return {
        isSelectedFolder,
        createFolder,
        editFolder,
        getSelectedFolderName,
        deleteFolder,
        onFolderClick,
        OnFolderInvalidate,
        folders,
        selectedFolder,
    }
}

export default useFolderBrowserContext;