const express = require('express');
const router = express.Router();
const controller = require('../controllers/serviceController');
const auth = require('../middlewares/authMiddleware'); // Optional for admin-only access

/**
 * @swagger
 * tags:
 *   - name: Services
 *     description: Service-related endpoints
 */

/**
 * @swagger
 * /api/services/services-with-prices:
 *   get:
 *     tags:
 *       - Services
 *     summary: Get paginated list of services with country-wise prices
 *     description: Returns services along with their prices per country. Pagination supported.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page (default is 10)
 *     responses:
 *       200:
 *         description: Paginated services with prices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       key:
 *                         type: string
 *                         example: money-leakage
 *                       title:
 *                         type: string
 *                         example: '{"en":"Money Leakage Detection","hi":"पैसे का रिसाव"}'
 *                       content:
 *                         type: string
 *                       cta:
 *                         type: string
 *                       features:
 *                         type: string
 *                       delivery_days:
 *                         type: integer
 *                         example: 3
 *                       delivery_time:
 *                         type: string
 *                         example: 48 hours
 *                       format:
 *                         type: string
 *                         example: pdf
 *                       best_for:
 *                         type: string
 *                         example: Entrepreneurs
 *                       type:
 *                         type: string
 *                         example: analysis
 *                       is_active:
 *                         type: boolean
 *                         example: true
 *                       recommended:
 *                         type: boolean
 *                         example: false
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                       prices:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             price:
 *                               type: number
 *                               format: float
 *                               example: 9.99
 *                             actual_price:
 *                               type: number
 *                               format: float
 *                               example: 19.99
 *                             is_active:
 *                               type: boolean
 *                               example: true
 *                             country_id:
 *                               type: integer
 *                               example: 101
 *                             country_code:
 *                               type: string
 *                               example: US
 *                             country_name:
 *                               type: string
 *                               example: United States
 *                             currency_symbol:
 *                               type: string
 *                               example: $
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 150
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 15
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *       500:
 *         description: Internal server error
 *
 * tags:
 *   - name: Services
 *     description: Service-related endpoints
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.get('/services-with-prices', controller.getServicesWithPrices)

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all active services with country-wise pricing
 *     tags:
 *       - Services
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: "Page number (default: 1)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Number of items per page (default: 10)"
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: "ISO country code to fetch localized pricing (e.g., 'IN', 'US')"
 *     responses:
 *       200:
 *         description: Paginated list of services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       key:
 *                         type: string
 *                         example: "astrology-basic"
 *                       title:
 *                         type: object
 *                         description: JSON object with localized titles by language code
 *                         example: { "en": "Basic Astrology Report", "hi": "मूल ज्योतिष रिपोर्ट" }
 *                       content:
 *                         type: object
 *                         description: JSON object with localized content by language code
 *                         example: { "en": "Detailed astrological reading", "hi": "विस्तृत ज्योतिष पढ़ाई" }
 *                       cta:
 *                         type: object
 *                         description: JSON object with localized call-to-action texts
 *                         example: { "en": "Order Now", "hi": "अब आदेश दें" }
 *                       features:
 *                         type: object
 *                         description: JSON object with localized features arrays
 *                         example: { "en": ["Feature 1", "Feature 2"], "hi": ["फीचर 1", "फीचर 2"] }
 *                       price:
 *                         type: string
 *                         example: "999"
 *                       actual_price:
 *                         type: string
 *                         example: "1299"
 *                       currency:
 *                         type: string
 *                         example: "INR"
 *                       is_active:
 *                         type: boolean
 *                         example: true
 *                       recommended:
 *                         type: boolean
 *                         example: false
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 100
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Services]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Service object
 *       404:
 *         description: Not found
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [key, title]
 *             properties:
 *               key:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               price:
 *                 type: string
 *               actual_price:
 *                 type: string
 *               cta:
 *                 type: string
 *               delivery_days:
 *                 type: number
 *               delivery_time:
 *                 type: string
 *               format:
 *                 type: string
 *               best_for:
 *                 type: string
 *               type:
 *                 type: string
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Service created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth, controller.create);

/**
 * @swagger
 * /api/services/{id}:
 *   patch:
 *     summary: Update a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               price:
 *                 type: string
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Service updated
 *       404:
 *         description: Not found
 */
router.patch('/:id', auth, controller.update);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Service deleted
 *       404:
 *         description: Not found
 */
router.delete('/:id', auth, controller.remove);

module.exports = router;
