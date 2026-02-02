import React, {useEffect} from "react";
import {useAuth} from "@/components/Auth/AuthContext";
import {useRouter} from "next/navigation";

export default function Protected({children}: { children: React.ReactNode }) {
    const {currentUserInfo} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!currentUserInfo) {
            router.push('/login');
        }
    }, [currentUserInfo, router]);

    return (
        <div>
            {children}
        </div>
    );
}