const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Shastri Sandip API',
            version: '1.0.0',
            description: 'Secure Admin CRUD API built with Node.js, Express, PostgreSQL, and Knex',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Local dev server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Contact: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        email: { type: 'string' },
                        mobileNumber: { type: 'string' },
                        description: { type: 'string' }
                    }
                },
                Consultation: {
                    type: 'object',
                    properties: {
                        fullName: { type: 'string' },
                        email: { type: 'string' },
                        mobileNumber: { type: 'string' },
                        dateOfBirth: { type: 'string', format: 'date' },
                        timeOfBirth: { type: 'string' },
                        placeOfBirth: { type: 'string' }
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string', writeOnly: true },
                        role: { type: 'string', enum: ['admin', 'customer', 'user'] },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' }
                    },
                    required: ['name', 'email', 'password']
                }
            }
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
