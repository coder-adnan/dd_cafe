"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher({ lang }: { lang: string }) {
    const pathname = usePathname();

    // Replace the current lang prefix in the URL
    const switchTo = lang === "en" ? "ar" : "en";
    const newPathname = pathname.replace(`/${lang}`, `/${switchTo}`);

    return (
        <Button
            variant="ghost"
            size="sm"
            className="rounded-full gap-1.5 text-sm font-semibold hover:bg-secondary/10"
            asChild
        >
            <Link href={newPathname}>
                <Globe className="w-4 h-4" />
                {switchTo === "ar" ? "العربية" : "English"}
            </Link>
        </Button>
    );
}
