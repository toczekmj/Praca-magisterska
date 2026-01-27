import type {Metadata} from 'next';
import './globals.css';
import {AuthProvider} from '@/components/Auth/AuthContext';
import {Theme} from "@radix-ui/themes";
import {Navbar} from "@/components/Navbar";
import React from "react";

export const metadata: Metadata = {
    title: 'Ideas Tracker',
    description: 'Track your side project ideas',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Theme accentColor="jade"
                       appearance="dark"
                       grayColor="slate"
                       radius="medium"
                       scaling="95%">
                    <AuthProvider>
                        <Navbar />
                        {children}
                    </AuthProvider>
                    <script>0</script>
                </Theme>
            </body>
        </html>
    );
}
