import conectarDB from "../../../lib/dbConnect";
import Pelicula from "../../../models/Pelicula";

export default async function handler(req, res) {
  await conectarDB();
  // POST Pelicula
  const {method} = req;

  switch (method) {
    case "POST":
      try {
        const movie = new Pelicula(req.body);
        await movie.save();
        return res.status(200).json({success: true, movie});
      } catch (error) {
        console.log("ERROR")
        return res.status(400).json({success: false, error});
      }
    default:
      return res.status(500).json({success: false, error: "Error del servidor."})
  }
}
