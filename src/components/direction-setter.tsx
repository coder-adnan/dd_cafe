"use client";

import { useEffect } from "react";

export function DirectionSetter({ lang }: { lang: string }) {
    useEffect(() => {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }, [lang]);

    return null;
}
