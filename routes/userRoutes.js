const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manage registered users
 * /api/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search users by name or email (case-insensitive)
 *     responses:
 *       200:
 *         description: List of user records with pagination
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
 *                         example: 301
 *                       name:
 *                         type: string
 *                         example: Jane Doe
 *                       email:
 *                         type: string
 *                         example: jane@example.com
 *                       profile_url:
 *                         type: string
 *                         example: https://example.com/avatar.jpg
 *                       role:
 *                         type: string
 *                         example: customer
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 100
 *                     page:
 *                       type: integer
 *                       example: 2
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *       403:
 *         description: Forbidden - only admins may access this route
 *       500:
 *         description: Server error
 */
router.get('/', authMiddleware, userController.getAll);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sandip Sevak"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "sandip@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *               role:
 *                 type: string
 *                 description: Role name, e.g. "admin", "super admin", "customer". Defaults to "customer" if omitted or invalid.
 *                 example: "admin"
 *               profile_url:
 *                 type: string
 *                 format: uri
 *                 description: Optional URL to user's profile picture
 *                 example: "https://example.com/profiles/sandip.jpg"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role_id:
 *                   type: integer
 *                 profile_url:
 *                   type: string
 *                   nullable: true
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Email already registered
 *       500:
 *         description: Internal server error
 */
router.post('/', userController.create);

module.exports = router;
