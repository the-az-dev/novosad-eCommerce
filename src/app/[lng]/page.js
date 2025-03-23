import Image from "next/image";
import Head from "next/head";


export async function generateMetadata({ params }) {
    const title = `Головна - Магазин "Novosad"`
    const description = `Якісні саджанці з Європи. Саджанці полуниці 'Фриго' прямо з місця їх росту, розсадники різноманітних плодових дерев та ягідних культур. Доставка по всій території України.`
    const keywords = description.split(" ")

    return {
        title: title,
        description: description,
        keywords: keywords,
        openGraph: {
            title: title,
            description: description,
            siteName: "Магазин \"Novosad\"",
            images: [
                {
                    url: 'http://novosad.pp.ua/img/og-image.png',
                    width: 800,
                    height: 600,
                    alt: 'Main Page Image',
                },
            ],
            locale: 'uk_UA',
        },
        twitter: {
            title: title,
            description: description
        },
        robots: ['index', 'follow'],
    }
}


export default function Page({ params }) {
  return (
    <div>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="og:type" content="website" />
            <meta name='keywords' content="Novosad, фріго, купити саджанці" />
            <meta name='robots' content="index, follow" />
            <meta httpEquiv='content-type' content='text/html; charset=utf-8' />
        </Head>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Image
                    className=""
                    src="/img/og-image.png"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
            </main>
        </div>
    </div>
  );
}
