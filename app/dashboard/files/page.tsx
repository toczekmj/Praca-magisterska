import FileBrowserWindow from "@/components/Files/FileBrowserWindow";
import {GetFolders} from "@/lib/genresDb";


export default async function Files() {
    const folders = await GetFolders();

    return (
        <div className="browser">
            <FileBrowserWindow folders={folders} />
        </div>
    );
}