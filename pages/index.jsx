import Head from 'next/head'
import conectarDB from '../lib/dbConnect';
import Pelicula from '../models/Pelicula';
import Link from 'next/link';

export default function Home({movies}) {
  return (
    <div>
      <Head>
        <title>Películas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1>Películas</h1>
        <Link href="/new">
          <button className="btn btn-primary w-100 mb-2">Agregar película</button>
        </Link>
        {
          movies.map(({_id, title, plot}) => (
            <div className="card mb-2" key={_id}>
              <div className="card-body">
                <div className="h5 text-uppercase">{title}</div>
                  <p className="fw-light">{plot}</p>
                  <Link href={`/${_id}`}>
                    <button className="btn btn-success btn-sm">Más info</button>
                  </Link>
              </div>
            </div>
          ))
        }
      </main>
    </div>
  )
}

export async function getServerSideProps() {
    try {
        await conectarDB();
        const res = await Pelicula.find({});
        const movies = res.map(doc => {
          const movie = doc.toObject();
          movie._id = `${movie._id}`;
          return movie;
        });
        return {props: {movies}};
    } catch (error) {
        console.log(error);
    }
}
