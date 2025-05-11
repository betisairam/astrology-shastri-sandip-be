const seedAdmin = require('./db/seedAdmin');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');

const contactRoutes = require('./routes/contactRoutes');
const consultationRoutes = require('./routes/consultationRoutes');

const dashboardRoutes = require('./routes/dashboardRoutes');

const startBackupCron = require('./cron/backupCron');
const backupRoutes = require('./routes/backupRoutes');

const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

// ✅ Enable CORS before any routes
app.use(cors({
    origin: '*', // or restrict to your frontend: 'http://localhost:3000'
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(helmet());


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use('/api/contacts', contactRoutes);
app.use('/api/consultations', consultationRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/backup', backupRoutes);

app.use('/api/payment', paymentRoutes);

startBackupCron();

const PORT = process.env.PORT || 5000;
seedAdmin().catch(console.error);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
