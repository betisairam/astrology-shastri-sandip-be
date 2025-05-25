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

const serviceRoutes = require('./routes/serviceRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes')

const app = express();

// ✅ Updated CORS configuration
const allowedOrigins = [
    'https://9000-firebase-studio-1747779066805.cluster-w5vd22whf5gmav2vgkomwtc4go.cloudworkstations.dev',
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
startBackupCron();

const PORT = process.env.PORT || 5000;
seedAdmin().catch(console.error);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


/**
 * imac@iMacs-iMac shastri-sandip-be % npm run dev

> shastri-sandip-be@1.0.0 dev
> nodemon server.js

[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
✅ Backup Cron scheduled (Daily backup at 12 AM, Cleanup every 15 days)
Server running on port 5000
✅ Admin already exists.
ValidationError: The 'X-Forwarded-For' header is set but the Express 'trust proxy' setting is false (default). This could indicate a misconfiguration which would prevent express-rate-limit from accurately identifying users. See https://express-rate-limit.github.io/ERR_ERL_UNEXPECTED_X_FORWARDED_FOR/ for more information.
    at Object.xForwardedForHeader (/Users/imac/Documents/shastri-sandip-be/node_modules/express-rate-limit/dist/index.cjs:187:13)
    at wrappedValidations.<computed> [as xForwardedForHeader] (/Users/imac/Documents/shastri-sandip-be/node_modules/express-rate-limit/dist/index.cjs:398:22)
    at Object.keyGenerator (/Users/imac/Documents/shastri-sandip-be/node_modules/express-rate-limit/dist/index.cjs:671:20)
    at /Users/imac/Documents/shastri-sandip-be/node_modules/express-rate-limit/dist/index.cjs:724:32
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async /Users/imac/Documents/shastri-sandip-be/node_modules/express-rate-limit/dist/index.cjs:704:5 {
  code: 'ERR_ERL_UNEXPECTED_X_FORWARDED_FOR',
  help: 'https://express-rate-limit.github.io/ERR_ERL_UNEXPECTED_X_FORWARDED_FOR/'
}
Error fetching testimonials: RangeError: Invalid string length
    at JSON.stringify (<anonymous>)
    at stringify (/Users/imac/Documents/shastri-sandip-be/node_modules/express/lib/response.js:1160:12)
    at ServerResponse.json (/Users/imac/Documents/shastri-sandip-be/node_modules/express/lib/response.js:271:14)
    at exports.getAllByLang (/Users/imac/Documents/shastri-sandip-be/controllers/testimonialController.js:62:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
error: ❌ Failed to fetch consultations select count("id") from "consultations" where "deleted_at" is null and ("name" ilike $1 or "email" ilike $2 or "subject" ilike $3 or "notes" ilike $4 or "status" ilike $5) - column "name" does not exist {"code":"42703","file":"parse_relation.c","length":104,"line":"3675","name":"error","position":"73","routine":"errorMissingColumn","severity":"ERROR","stack":"error: select count(\"id\") from \"consultations\" where \"deleted_at\" is null and (\"name\" ilike $1 or \"email\" ilike $2 or \"subject\" ilike $3 or \"notes\" ilike $4 or \"status\" ilike $5) - column \"name\" does not exist\n    at Parser.parseErrorMessage (/Users/imac/Documents/shastri-sandip-be/node_modules/pg-protocol/dist/parser.js:285:98)\n    at Parser.handlePacket (/Users/imac/Documents/shastri-sandip-be/node_modules/pg-protocol/dist/parser.js:122:29)\n    at Parser.parse (/Users/imac/Documents/shastri-sandip-be/node_modules/pg-protocol/dist/parser.js:35:38)\n    at Socket.<anonymous> (/Users/imac/Documents/shastri-sandip-be/node_modules/pg-protocol/dist/index.js:11:42)\n    at Socket.emit (node:events:518:28)\n    at addChunk (node:internal/streams/readable:561:12)\n    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)\n    at Readable.push (node:internal/streams/readable:392:5)\n    at TCP.onStreamRead (node:internal/stream_base_commons:189:23)","timestamp":"2025-05-22T06:35:18.595Z"}
Error fetching testimonials: RangeError: Invalid string length
    at JSON.stringify (<anonymous>)
    at stringify (/Users/imac/Documents/shastri-sandip-be/node_modules/express/lib/response.js:1160:12)
    at ServerResponse.json (/Users/imac/Documents/shastri-sandip-be/node_modules/express/lib/response.js:271:14)
    at exports.getAllByLang (/Users/imac/Documents/shastri-sandip-be/controllers/testimonialController.js:62:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
Error fetching testimonials: RangeError: Invalid string length
    at JSON.stringify (<anonymous>)
    at stringify (/Users/imac/Documents/shastri-sandip-be/node_modules/express/lib/response.js:1160:12)
    at ServerResponse.json (/Users/imac/Documents/shastri-sandip-be/node_modules/express/lib/response.js:271:14)
    at exports.getAllByLang (/Users/imac/Documents/shastri-sandip-be/controllers/testimonialController.js:62:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
Error fetching testimonials: RangeError: Invalid string length
    at JSON.stringify (<anonymous>)
    at stringify (/Users/imac/Documents/shastri-sandip-be/node_modules/express/lib/response.js:1160:12)
    at ServerResponse.json (/Users/imac/Documents/shastri-sandip-be/node_modules/express/lib/response.js:271:14)
    at exports.getAllByLang (/Users/imac/Documents/shastri-sandip-be/controllers/testimonialController.js:62:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)

<--- Last few GCs --->

[20011:0x7fe43f800000] 23844099 ms: Scavenge (reduce) (interleaved) 2046.0 (2082.1) -> 2046.0 (2083.4) MB, pooled: 0 MB, 12.57 / 0.00 ms  (average mu = 0.783, current mu = 0.102) allocation failure; 
[20011:0x7fe43f800000] 23844448 ms: Mark-Compact (reduce) 2047.2 (2083.4) -> 2047.2 (2084.4) MB, pooled: 0 MB, 174.59 / 0.00 ms  (+ 1011.2 ms in 0 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 1501 ms) (average mu = 0.

<--- JS stacktrace --->

FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
----- Native stack trace -----

 1: 0x100701c84 node::OOMErrorHandler(char const*, v8::OOMDetails const&) [/Users/imac/.nvm/versions/node/v22.14.0/bin/node]
 2: 0x10092e9d8 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, v8::OOMDetails const&) [/Users/imac/.nvm/versions/node/v22.14.0/bin/node]
 3: 0x100b52987 v8::internal::Heap::FatalProcessOutOfMemory(char const*) [/Users/imac/.nvm/versions/node/v22.14.0/bin/node]
 4: 0x100b50adf v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [/Users/imac/.nvm/versions/node/v22.14.0/bin/node]
 5: 0x100b43705 v8::internal::HeapAllocator::AllocateRawWithLightRetrySlowPath(int, v8::internal::AllocationType, v8::internal::AllocationOrigin, v8::internal::AllocationAlignment) [/Users/imac/.nvm/versions/node/v22.14.0/bin/node]
 6: 0x100b44014 v8::internal::HeapAllocator::AllocateRawWithRetryOrFailSlowPath(int, v8::internal::AllocationType, v8::internal::AllocationOrigin, v8::internal::AllocationAlignment) [/Users/imac/.nvm/versions/node/v22.14.0/bin/node]
 7: 0x100b255a3 v8::internal::Factory::NewFillerObject(int, v8::internal::AllocationAlignment, v8::internal::AllocationType, v8::internal::AllocationOrigin) [/Users/imac/.nvm/versions/node/v22.14.0/bin/node]
 8: 0x100fc3d0b v8::internal::Runtime_AllocateInYoungGeneration(int, unsigned long*, v8::internal::Isolate*) [/Users/imac/.nvm/versions/node/v22.14.0/bin/node]
 9: 0x1014ceff6 Builtins_CEntry_Return1_ArgvOnStack_NoBuiltinExit [/Users/imac/.nvm/versions/node/v22.14.0/bin/node]
[nodemon] app crashed - waiting for file changes before starting...
^C
imac@iMacs-iMac shastri-sandip-be % 
 */