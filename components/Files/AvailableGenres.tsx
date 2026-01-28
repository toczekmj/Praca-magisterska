import {Button, Card, Text} from "@radix-ui/themes";
import {GetAllGenres} from "@/lib/genresDb";

export default async function AvailableGenres() {
    const availableGenres = await GetAllGenres();

    return (
        <Card size="3">
            <div className={"flex flex-col gap-5 text-center"}>
                <Text size={"7"}>Files</Text>
                <div className={"flex flex-row gap-2"}>
                    <Card>
                        <div className={"flex flex-col w-max min- text-nowrap"}>
                            Folder Structure
                            {
                                availableGenres.length > 0 ? (
                                    <Button>Test</Button>
                                ) : <></>
                            }
                        </div>
                    </Card>
                    <Card>
                        <div className={"flex flex-col min-w-[40%]"}>
                            Folder content
                        </div>
                    </Card>
                </div>
            </div>
        </Card>
    );
}