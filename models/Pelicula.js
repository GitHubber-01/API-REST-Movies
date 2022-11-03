import mongoose from "mongoose";

const peliculaSchema = new mongoose.Schema({
        title: {
            type: String,
            required: [true, "Por favor, ingrese el título."]
        },
        plot: {
            type: String,
            required: [true, "Por favor, ingrese la descripción."]
        }
    }, {collection: "Peliculas"}
);

export default mongoose.models.Pelicula || mongoose.model("Pelicula", peliculaSchema);