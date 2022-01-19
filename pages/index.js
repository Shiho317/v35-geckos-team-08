import Head from 'next/head';
import Hero from '../components/hero';
import Episodes from '../components/episodes';
import About from '../components/about';
import Contact from '../components/contact';
import Footer from '../components/footer';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Protest Tunes | General Strike</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/assets/SeattleDJ_fist.png" />
			</Head>
			<Hero />
			<Episodes />
			<About />
			<Contact />
			<Footer />
		</div>
	);
}
