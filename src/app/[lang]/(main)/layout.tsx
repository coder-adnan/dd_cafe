import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default async function MainLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    return (
        <>
            <Navbar lang={lang} />
            <main className="flex-1 flex flex-col">
                {children}
            </main>
            <Footer lang={lang} />
        </>
    );
}
