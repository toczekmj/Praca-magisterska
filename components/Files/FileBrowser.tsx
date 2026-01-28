import {Card, Separator, Text} from "@radix-ui/themes";

interface FileBrowserProps {
    folderId: string | null;
}

export default function FileBrowser({folderId}: FileBrowserProps) {
    return (
        <Card>
            <div className={"flex flex-col min-w-100 gap-1"}>
                <Text size={"5"}>Files</Text>
                <Separator size={"4"}/>
                {
                    !folderId ? (
                        <Text size={"4"}>Select folder to show files</Text>
                    ) : (
                        <Text>{folderId}</Text>
                    )
                }
            </div>
        </Card>
    );
}