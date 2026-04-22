import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geist = localFont({
	src: "../../../public/fonts/Geist-Variable.woff2",
	variable: "--font-geist",
	display: "swap",
	weight: "100 900",
});

const geistMono = localFont({
	src: "../../../public/fonts/GeistMono-Variable.woff2",
	variable: "--font-geist-mono",
	display: "swap",
	weight: "100 900",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://tanguypauvret.me"),
	title: "Tanguy Pauvret — Software Engineer & Architect",
	description:
		"Software engineer and system architect based in Lausanne, CH. Building distributed systems and developer tooling.",
};

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;

	if (!routing.locales.includes(locale as "en" | "fr")) {
		notFound();
	}

	const messages = await getMessages();
	const cookieStore = await cookies();
	const theme = (cookieStore.get("theme")?.value ?? "light") as "light" | "dark";

	return (
		<html lang={locale} data-theme={theme} className={`${geist.variable} ${geistMono.variable}`}>
			<body>
				<NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
			</body>
		</html>
	);
}
