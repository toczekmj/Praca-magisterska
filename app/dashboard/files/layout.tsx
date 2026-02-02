'use client'
import React from "react";
import {Container} from "@radix-ui/themes";
import Protected from "@/components/Auth/Protected";

export default function FilesLayout({children}: { children: React.ReactNode }) {
    return (
        <Protected>
            <main className="drop-shadow-2xl drop-shadow-amber-50/10">
                <Container>
                    {children}
                </Container>
            </main>
        </Protected>
    );
}