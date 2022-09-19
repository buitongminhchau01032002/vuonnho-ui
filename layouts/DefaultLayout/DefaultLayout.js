import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoToTopButton from '../components/GoToTopButton/GoToTopButton';

export default function DefaultLayout({
    children,
    head = {
        title: 'Vườn nhỏ',
        metas: [
            {
                name: 'description',
                content: 'Vườn nhỏ',
            },
        ],
    },
}) {
    const { title, metas } = head;
    return (
        <>
            <Head>
                <title>{title}</title>
                {metas?.map((meta) => (
                    <meta key={meta?.name} name={meta?.name} content={meta?.content} />
                ))}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="pt-h-header">{children}</main>
            <Footer />
            <GoToTopButton />
        </>
    );
}
