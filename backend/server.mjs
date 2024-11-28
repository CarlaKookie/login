import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import QRCode from 'qrcode';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Procesa cuerpos JSON

// Configuración de la URI de conexión
const url = "mongodb+srv://usuario:carla123@cluster0.2rdws.mongodb.net/registrapp?retryWrites=true&w=majority";
const dbName = "registrapp"; // Nombre de tu base de datos
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Conexión al servidor de MongoDB
let db;
client.connect()
  .then(() => {
    db = client.db(dbName);
    console.log('Conexión exitosa a MongoDB');
  })
  .catch(err => {
    console.error('Error conectando a MongoDB', err);
    process.exit(1);
  });

// **Endpoint para obtener asistencia**
app.get('/api/get-attendance', async (req, res) => {
  const { date, section } = req.query;

  // Verificar que se reciban los parámetros necesarios
  if (!date || !section) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos: date o section' });
  }

  try {
    // Convertir la fecha recibida en una instancia de Date (sin hora)
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);  // Establecer la hora en 00:00:00 para el inicio del día

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);  // Establecer la hora en 23:59:59 para el fin del día

    // Log para verificar las fechas calculadas
    console.log('Fecha de inicio:', startDate);
    console.log('Fecha de fin:', endDate);

    // Obtener la colección "attendance"
    const attendanceCollection = db.collection('attendance');

    // Realizar la búsqueda en la base de datos con el rango de fechas
    const query = { 
      date: { $gte: startDate, $lte: endDate },  // Rango de fechas
      section  // Filtrar por sección también
    };

    console.log('Consulta realizada:', query);  // Verificar la consulta

    const attendanceRecords = await attendanceCollection.find(query).project({
      _id: 0,
      user: 1,
      status: 1,
      date: 1,
      section: 1,
      subject: 1,
      sessionId: 1
    }).toArray();

    // Si no hay registros, devolver un mensaje adecuado
    if (attendanceRecords.length === 0) {
      console.log('No se encontraron registros de asistencia para los parámetros proporcionados.');
    }

    res.json(attendanceRecords);  // Devolver los resultados de la consulta
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
    // Obtener la colección "attendance"
    const attendanceCollection = db.collection('attendance');

    // Crear un nuevo documento de asistencia
    const newRecord = {
      user,
      date: new Date(date),
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
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
