import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

const Form = ({formData, formNuevaPelicula = true}) => {

    const router = useRouter();

    // Datos del formulario:
    const [form, setForm] = useState({
        title: formData.title,
        plot: formData.plot
    });

    const [message, setMensaje] = useState([]);

    // Maneja los cambios del formulario:
    const handleChange = e => {
        const {value, name} = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    // Maneja la acción del "submit":
    const handleSubmit = e => {
        e.preventDefault();
        if (formNuevaPelicula) {
            // Meter datos
            postData(form);
        } else {
            // Editar datos
            putData(form);
        }
    }

    // Actualiza los datos del formulario:
    const putData = async (form) => {
        const {id} = router.query;
        try {
            const res = await fetch(`/api/pelicula/${id}`, {
                method:"PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })
            const data = await res.json();
            
            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key];
                    setMensaje(mensajeOld => [
                        ...mensajeOld,
                        {message: error.message}
                    ])
                }
            } else {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Agrega los datos del formulario:
    const postData = async (form) => {
        try {
            const res = await fetch("/api/pelicula", {
                method:"POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })
            const data = await res.json();
            
            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key];
                    setMensaje(mensajeOld => [
                        ...mensajeOld,
                        {message: error.message}
                    ])
                }
            } else {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                className="form-control my-2" 
                placeholder="Título"
                autoComplete="off"
                name="title"
                value={form.title}
                onChange={handleChange}
            />
            <input 
                type="text" 
                className="form-control my-2" 
                placeholder="Descripción"
                autoComplete="off"
                name="plot"
                value={form.plot}
                onChange={handleChange}
            />
            <button className="btn btn-primary w-100 my-2" type="submit">
                {formNuevaPelicula ? "Agregar" : "Editar"}
            </button>
            <Link href="/" className="btn btn-warning w-100">
                Volver...
            </Link>
            {
                message.map(({message}) => (
                    <p key={message}>{message}</p>
                ))
            }
        </form>
  )
}

export default Form