'use client'

import {useAuth} from "@/components/Auth/AuthContext";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
    const state = useAuth().current;
    const router = useRouter();
    useEffect(() => {
        if (!state) {
            router.push("/login");
        }
    }, [router, state])

  return (
    <main>
    </main>
  );
}
