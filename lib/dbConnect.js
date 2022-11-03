import mongoose from "mongoose";
const URI_MONGO = process.env.URI_MONGO;
const conectarDB = async() => {
    try {
        await mongoose.connect(URI_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false
        });
        console.log("Conectado a la base de datos.");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default conectarDB;