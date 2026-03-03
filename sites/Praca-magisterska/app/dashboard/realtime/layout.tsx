'use client'

import Protected from "@/components/Auth/Protected"

export default function RealtimeLayout({children}: {children: React.ReactNode}) {
    return (
        <Protected>
            <div className="flex flex-col gap-4">
                {children}
            </div>
        </Protected>
    )
}