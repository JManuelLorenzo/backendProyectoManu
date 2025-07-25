// swagger.js
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Define Swagger options
const options = {
    definition: {
        openapi: '3.0.0', // Define the OpenAPI version
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Define the server URL (port 3000 in this case)
            },
        ],
    },
    apis: ['./routes/*.js'], // Specify your API route files here for documentation
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerUi, swaggerSpec };

