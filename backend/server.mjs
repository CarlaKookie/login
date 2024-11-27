import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import QRCode from 'qrcode';
import { Attendance } from './attendance.js'; // Importar el modelo de asistencia

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Procesa cuerpos JSON

const mongoUri = "mongodb+srv://usuario:carla123@cluster0.2rdws.mongodb.net/registrapp?retryWrites=true&w=majority";
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => {
    console.error('Error conectando a MongoDB', err);
    process.exit(1);
  });

// **Endpoint para obtener asistencia**
app.get('/api/get-attendance', async (req, res) => {
  const { date, section } = req.query;

  if (!date || !section) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos: date o section' });
  }

  try {
    const query = { date: new Date(date), section };
    const attendanceRecords = await Attendance.find(query, '-_id user status date section subject sessionId');
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
    const newRecord = new Attendance({
      user,
      date: new Date(date),
      section,
      status,
      subject,
      sessionId,
    });

    await newRecord.save();
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
