import conectarDB from "../../../lib/dbConnect";
import Pelicula from "../../../models/Pelicula";

export default async function handler(req, res) {
    await conectarDB();

    // GET api/movie/:id (obtener una película por su id y listarla).
    // DELETE api/movie/:id (obtener una película por su id y eliminarla de la base de datos).
    // PUT api/movie/:id (obtener una película por su id y editar su información).
    const {method, query: {id}} = req;

    switch (method) {
        case "PUT":
            try {
                const movie = await Pelicula.findByIdAndUpdate(
                    id, 
                    req.body,
                    {new: true, runValidators: true}
                );
                if (!movie)
                    return res.status(404).json({success: false, error});
                return res.json({success: true, data: movie});
            } catch (error) {
                return res.status(404).json({success: false, error});
            }
        case "DELETE":
            try {
                const movie = await Pelicula.findByIdAndDelete(id);
                if (!movie)
                    return res.status(404).json({success: false, error});
                return res.json({success: true, data: movie});
            } catch (error) {
                return res.status(404).json({success: false, error});
            }
        case "GET":
            try {
                const movie = await Pelicula.findById(id).lean();
                if (!movie)
                    return res.status(404).json({success: false, error});
                return res.json({success: true, data: movie});
            } catch (error) {
                return res.status(404).json({success: false, error});
            }
        default:
            return res.status(500).json({success: false, error: "Error del servidor."})
    }
}