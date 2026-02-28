import { MapPin, Clock, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer({ lang }: { lang: string }) {
    return (
        <footer className="bg-secondary text-secondary-foreground py-12 md:py-16">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand & Address */}
                <div className="space-y-4">
                    <h3 className="font-serif text-2xl font-bold text-accent">DD Cafe</h3>
                    <p className="text-secondary-foreground/80 max-w-xs">
                        {lang === "ar"
                            ? "وجهتك للقهوة الدافئة في الرياض. كوبك المثالي في بيئة فاخرة ودافئة."
                            : "Riyadh's cozy coffee destination. Your perfect cup in a premium, warm environment."}
                    </p>
                    <div className="flex items-start gap-3 mt-4 text-secondary-foreground/80">
                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p>
                            {lang === "ar"
                                ? "طريق الملك عبدالله، المرسلات، الرياض، السعودية"
                                : <>King Abdullah Rd, Al Mursalat,<br />Riyadh, Saudi Arabia</>}
                        </p>
                    </div>
                </div>

                {/* Opening Hours */}
                <div className="space-y-4">
                    <h4 className="font-serif text-xl font-semibold text-accent">
                        {lang === "ar" ? "ساعات العمل" : "Opening Hours"}
                    </h4>
                    <ul className="space-y-2 text-secondary-foreground/80">
                        <li className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{lang === "ar" ? "الأحد - الخميس: 7 ص - 11 م" : "Sun - Thu: 7:00 AM - 11:00 PM"}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{lang === "ar" ? "الجمعة - السبت: 8 ص - 12 ص" : "Fri - Sat: 8:00 AM - 12:00 AM"}</span>
                        </li>
                    </ul>
                </div>

                {/* Links & Socials */}
                <div className="space-y-4 md:text-right flex flex-col md:items-end">
                    <h4 className="font-serif text-xl font-semibold text-accent">
                        {lang === "ar" ? "تابعنا" : "Connect"}
                    </h4>
                    <a href="#" className="flex items-center gap-2 text-secondary-foreground/80 hover:text-primary transition-colors">
                        <Instagram className="h-5 w-5" />
                        <span>@ddcafe_sa</span>
                    </a>
                    <div className="flex gap-4 mt-4">
                        <Link href={`/${lang}/menu`} className="text-sm underline underline-offset-4 text-secondary-foreground/80 hover:text-primary transition-colors">
                            {lang === "ar" ? "القائمة" : "Menu"}
                        </Link>
                        <Link href={`/${lang}`} className="text-sm underline underline-offset-4 text-secondary-foreground/80 hover:text-primary transition-colors">
                            {lang === "ar" ? "الموقع" : "Location"}
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-secondary-foreground/10 text-center text-sm text-secondary-foreground/60">
                &copy; {new Date().getFullYear()} DD Cafe. {lang === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </div>
        </footer>
    );
}
