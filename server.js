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
const scheduleBlogPublishing = require('./cron/blogPublishCron');

const serviceRoutes = require('./routes/serviceRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes')

const whatsappWebhookRoutes = require('./routes/whatsappWebhookRoutes')

const app = express();

// ✅ Updated CORS configuration
const allowedOrigins = [
    'https://9000-firebase-studio-1747779066805.cluster-w5vd22whf5gmav2vgkomwtc4go.cloudworkstations.dev',
    'https://6000-firebase-studio-1747779066805.cluster-w5vd22whf5gmav2vgkomwtc4go.cloudworkstations.dev',
    'https://6000-firebase-studio-1747779066805.cluster-w5vd22whf5gmav2vgkomwtc4go.cloudworkstations.dev',
    'http://localhost:3000',
    'http://localhost:5000',
    'https://qg1rn60q-5000.inc1.devtunnels.ms',
    '*'// Optional: include for local development
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g., non-browser clients like Postman) or from allowed origins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow common headers
    credentials: true // Enable if your app uses cookies or auth tokens
}));

// Explicitly handle preflight requests for all routes
app.options('*', cors());

app.use(express.json());
app.use(helmet());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use('/api/contacts', contactRoutes);
app.use('/api/consultations', consultationRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/backup', backupRoutes);

app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/whatsapp-webhook', whatsappWebhookRoutes);
app.use('/api/salaries', require('./routes/salaryRoutes'));
app.use('/api/salary-settings', require('./routes/salarySettingsRoutes'));
app.use('/api/shareholders', require('./routes/shareholdersRoutes'));
app.use('/api/equity-shares', require('./routes/equitySharesRoutes'));
app.use('/api/roles', require('./routes/roleRoutes'));
app.use('/api/countries', require('./routes/countryRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/blogs/automation', require('./routes/blogAutomationRoutes'));

scheduleBlogPublishing(); // ✅ Auto-publish blogs
startBackupCron(); // Start the backup cron job

const PORT = process.env.PORT || 5000;
seedAdmin().catch(console.error);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
