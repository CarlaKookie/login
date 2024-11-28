import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import QRCode from 'qrcode';
import mongoose from 'mongoose';
import { Attendance } from './attendance.js';
const app = express();
const port = 3000;

// Configuración de CORS

app.use(cors());
app.use(express.json()); // Middleware para procesar cuerpos JSON

// Configuración de MongoDB
// Configuración de MongoDB

const mongoUri = "mongodb+srv://usuario:carla123@cluster0.2rdws.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(mongoUri, { useUnifiedTopology: true }); // Agregamos `useUnifiedTopology`

async function connectDB() {
  try {
    await client.connect();
    console.log('Conexión exitosa a MongoDB');
  } catch (err) {
    console.error('Error conectando a MongoDB:', err);
    process.exit(1); // Salir si hay un error al conectar
  }
}

export { client, connectDB };

// **Endpoint para obtener asistencia**
app.get('/api/get-attendance', async (req, res) => {
  const { date, section } = req.query;

  if (!date || !section) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos: date o section' });
  }

  try {
    const database = client.db("login");
    const attendance = database.collection("estudiantes");

    const query = { date, section };
    const options = {
      projection: { _id: 0, user: 1, date: 1, section: 1, status: 1, subject:1, sessionId:1 },
    };

    const attendanceRecords = await attendance.find(query, options).toArray();
    res.json(attendanceRecords);
  } catch (err) {
    console.error('Error al consultar la base de datos', err);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});


// **Endpoint para marcar asistencia**
app.post('/api/mark-attendance', async (req, res) => {
  const { user, date, section, status, subject, sessionId } = req.body;

  if (!user || !date || !section || !status || !subject || !sessionId) {
    return res.status(400).json({ error: 'Faltan datos requeridos en el cuerpo de la solicitud' });
  }

  try {
    const attendanceCollection = db.collection('attendance');

    // Formatear la fecha al tipo Date
    const formattedDate = new Date(date);  // Convertir la fecha a un objeto Date

    // Crear un nuevo documento de asistencia
    const newRecord = {
      user,
      date: formattedDate,  // Guardar la fecha como Date
      section,
      status,
      subject,
      sessionId,
    };

    await attendanceCollection.insertOne(newRecord);
    res.status(200).send('Asistencia registrada correctamente');
  } catch (err) {
    console.error('Error al registrar asistencia', err);
    res.status(500).send('Error al registrar la asistencia');
  }
});

// **Endpoint para generar QR**
app.get('/generate-qrcode', (req, res) => {
  const { sessionId, subject } = req.query;

  if (!sessionId || !subject) {
    return res.status(400).send('Faltan parámetros requeridos: sessionId o subject');
  }

  const data = { sessionId, subject };

  QRCode.toDataURL(JSON.stringify(data), function (err, url) {
    if (err) {
      console.error('Error generando el código QR', err);
      res.status(500).send('Error generando el código QR');
    } else {
      res.send(url);
    }
  });
});

// **Iniciar Servidor**
app.listen(port, async () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});