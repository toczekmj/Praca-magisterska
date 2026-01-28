import {TabNav, Text} from "@radix-ui/themes";
import Link from "next/link";

import {Responsive} from "@radix-ui/themes/props";
import {Pages} from "@/app/Enums/Pages";

interface MainNavProps {
    isActive: (p: Pages) => boolean;
    size?: Responsive<"4" | "1" | "2" | "3" | "5" | "6" | "7" | "8" | "9"> | undefined
}

export default function MainNav({isActive, size}: MainNavProps) {
    return (
        <TabNav.Root>
            <TabNav.Link asChild active={isActive(Pages.dashboard)}>
                <Link href="/dashboard">
                    <Text size={size ?? "1"}>Dashboard</Text>
                </Link>
            </TabNav.Link>
            <TabNav.Link asChild active={isActive(Pages.settings)}>
                <Link href={Pages.settings}>
                    <Text size={size ?? "1"}>Settings</Text>
                </Link>
            </TabNav.Link>
        </TabNav.Root>
    );
}