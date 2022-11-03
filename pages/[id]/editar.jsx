import Form from "../../components/Form";
import useSWR from "swr";
import { useRouter } from "next/router";


const fetcher = async url => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error("Ocurrió un error al buscar los datos de la película.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  const {data} = await res.json();
  return data;
}

export const EditarPelicula = () => {

    const router = useRouter();
    const {id} = router.query;
    const {data: movie, error} = useSWR(id ? `/api/pelicula/${id}` : null, fetcher);

    
    if (error)
      return <div>Error.</div>;
    
    if (!movie) {
      return (
        <div className="container mt-5 text-center">
            <h1>Cargando...</h1>
        </div>
      );
    }

    const formData = {
        title: movie.title,
        plot: movie.plot
    }

    return (
        <div className="container">
            <h1>Editar información de la película</h1>
            <Form
                formNuevaPelicula = {false}
                formData = {formData}
            ></Form>
        </div>
    )
}

export default EditarPelicula;
