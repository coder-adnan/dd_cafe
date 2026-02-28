import { DirectionSetter } from "@/components/direction-setter";
import { LOCALES } from "@/i18n";

export async function generateStaticParams() {
    return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    return (
        <>
            <DirectionSetter lang={lang} />
            {children}
        </>
    );
}
