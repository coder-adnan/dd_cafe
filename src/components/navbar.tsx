"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Coffee, Menu, X, ShoppingBag } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Navbar({ lang }: { lang: string }) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        aria-label="Menu"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-72 border-t" : "max-h-0"
                    }`}
            >
                <nav className="container mx-auto px-4 py-4 flex flex-col gap-3 bg-background/95 backdrop-blur-md">
                    <Link
                        href={`/${lang}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary/80 hover:text-primary hover:bg-accent transition-colors font-medium"
                    >
                        {lang === "ar" ? "الرئيسية" : "Home"}
                    </Link>
                    <Link
                        href={`/${lang}/menu`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary/80 hover:text-primary hover:bg-accent transition-colors font-medium"
                    >
                        {lang === "ar" ? "قائمة الطعام" : "Menu"}
                    </Link>
                    <Link
                        href={`/${lang}/admin`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent transition-colors text-sm"
                    >
                        {lang === "ar" ? "لوحة الإدارة" : "Admin Demo"}
                    </Link>
                    <Link
                        href={`/${lang}/menu`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="mt-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors sm:hidden"
                    >
                        {lang === "ar" ? "اطلب الآن" : "Order Now"}
                    </Link>
                </nav>
            </div>
        </header>
    );
}
