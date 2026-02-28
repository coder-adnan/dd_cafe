"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Coffee, Menu, ShoppingBag } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Navbar({ lang }: { lang: string }) {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Brand */}
                <Link href={`/${lang}`} className="flex items-center gap-2 group">
                    <Coffee className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    <span className="font-serif text-2xl font-bold text-secondary">DD Cafe</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 font-medium">
                    <Link href={`/${lang}`} className="text-secondary/80 hover:text-primary transition-colors">
                        {lang === "ar" ? "الرئيسية" : "Home"}
                    </Link>
                    <Link href={`/${lang}/menu`} className="text-secondary/80 hover:text-primary transition-colors">
                        {lang === "ar" ? "قائمة الطعام" : "Menu"}
                    </Link>
                    <Link href={`/${lang}/admin`} className="text-xs text-muted-foreground hover:text-primary transition-colors bg-accent px-2 py-1 rounded-full border border-border">
                        {lang === "ar" ? "لوحة الإدارة" : "Admin Demo"}
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <LanguageSwitcher lang={lang} />

                    <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                        <ShoppingBag className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    </Button>

                    <Button className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" asChild>
                        <Link href={`/${lang}/menu`}>
                            {lang === "ar" ? "اطلب الآن" : "Order Now"}
                        </Link>
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
