"use client"
import { DATABASE } from "@/Generated/appwrite/constants"
import { realtime } from "@/lib/appwrite"
import { Table } from "@/lib/Database/Enums/Table";
import { Button } from "@radix-ui/themes";
import { Channel, RealtimeSubscription } from "appwrite"

export default function Realtime() {

    const dbid = DATABASE;
    let sub: RealtimeSubscription | null = null;
    const subscription = async function () {
        sub = await realtime.subscribe(Channel.tablesdb(dbid).table(Table.Folders).row('69a71c57002b33aed57d'), response => {
            console.log(response);
        })
    }

    function unsubscribe(): void {
        sub?.close();
    }

    return (
        <div>
            <Button variant="solid" onClick={subscription}>Subscribe</Button>
            <Button variant="solid" onClick={unsubscribe}>Unsubscribe</Button>
            <Button variant="solid" onClick={() => {console.log(sub)}}>Log</Button>
        </div>
    )
}