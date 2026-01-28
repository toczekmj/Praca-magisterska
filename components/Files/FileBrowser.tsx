import {Card, Separator, Text} from "@radix-ui/themes";
import {Models} from "appwrite";
import {useEffect, useState} from "react";
import {GetFiles} from "@/lib/genresDb";


interface FileBrowserProps {
    folderId: string | null;
}

export default function FileBrowser({folderId}: FileBrowserProps) {
    const [files, setFiles] = useState<Models.DefaultRow[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!folderId) {
            setFiles([]);
        }

        const fetchFiles = async () => {
            setLoading(true);
            try {
                if (folderId){
                    const result = await GetFiles(folderId)
                    setFiles(result);
                }
            }
            catch (error){
                console.log(error);
                setFiles([]);
            }
            finally {
                setLoading(false);
            }
        };

        fetchFiles();

    }, [folderId]);

    return (
        <Card>
            <div className={"flex flex-col min-w-100 gap-1"}>
                <Text size={"5"}>Files</Text>
                <Separator size={"4"}/>
                {
                    !folderId ? (
                        <Text size={"4"}>Select folder to show files</Text>
                    ) : loading ? (
                        <Text>Loading...</Text>
                    ) : (
                        <div>
                            <div className="flex flex-col gap-1">
                                {
                                    files.map((file, index) => {
                                        return (
                                            <Text key={index} size={"3"}>{file["Name"]}</Text>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </Card>
    );
}