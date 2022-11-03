import Link from "next/link";
import { useRouter } from "next/router";
import conectarDB from "../../lib/dbConnect";
import Pelicula from "../../models/Pelicula";

const PeliculaPagina = ({success, error, movie}) => {
    const router = useRouter();

    if (!success) {
        return (
            <div className="container text-center my-5">
                <h1>{error}</h1>
                <Link href="/">
                    <button className="btn btn-success">Volver...</button>
                </Link>
            </div>
        )
    }

    const deleteData = async(id) => {
        try {
            await fetch(`/api/pelicula/${id}`, {method: "DELETE"});
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <h1>Detalle de la película</h1>
            <div className="card">
                <div className = "card-body">
                    <div className="card-title">
                        <h5 className="text-uppercase">{movie.title}</h5>
                    </div>
                    <p className="fw-light">{movie.plot}</p>
                    <Link href="/">
                        <button className="btn btn-success btn-sm me-2">Volver...</button>
                    </Link>
                    <Link href={`/${movie._id}/editar`}>
                        <button className="btn btn-warning btn-sm me-2">Editar</button>
                    </Link>
                    <button className="btn btn-danger btn-sm" 
                        onClick={() => deleteData(movie._id)}>
                            Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PeliculaPagina;

export async function getServerSideProps({params}) {
    try {
        await conectarDB();
        const movie = await Pelicula.findById(params.id).lean();
        console.log(movie)
        if (!movie) {
            return {props: {success: false, error: "Película no encontrada."}};
        }
        movie._id = `${movie._id}`;
        return {props: {success: true, movie}};
    } catch (error) {
        return {props: {success: false, 
            error: error.kind === "ObjectId" ? "Id no válido" : "Error del servidor"
        }};
    }
  }