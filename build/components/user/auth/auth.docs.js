"use strict";
/**
 * @swagger
 * /users/auth/register:
 *   post:
 *     summary: App is required for the user to register.
 *     tags:
 *       - userAuth
 *     requestBody:
 *       content:
 *         application/json:
 *          schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *             - name
 *             - companyId
 *             - status
 *           properties:
 *             email:
 *               type: string
 *               example: john.doe@example.com
 *             password:
 *               type: string
 *               example: MyPassword123
 *             name:
 *               type: string
 *               example: JohnDoe123
 *             companyId:
 *               type: string
 *               example: 664ce355d830709549e82b56
 *             status:
 *               type: string
 *               example: employee
 *     responses:
 *       200:
 *        description: App user register.
 *       404:
 *        description: user not created
 *
 */
/**
 * @swagger
 * /users/auth/login:
 *   put:
 *     summary: User signing in
 *     tags:
 *       - userAuth
 *     requestBody:
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               example: john.doe@example.com
 *             password:
 *               type : string
 *               example : MyPassword123
 *     responses:
 *       200:
 *         description: User signing in.
 *
 *
 */
/**
 * @swagger
 * /users/auth/profile/update:
 *   put:
 *     summary: User changing password
 *     tags:
 *       - userAuth
 *     requestBody:
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - phone
 *             - email
 *           properties:
 *             name:
 *               type: string
 *               example: john
 *             phone:
 *               type: string
 *               example: 123141
 *             email:
 *               type: string
 *               example: malix@gmail.com
 *     responses:
 *       200:
 *         description: User signing in.
 *
 *
 */
/**
 * @swagger
 * /users/auth/password/change:
 *   put:
 *     summary: User changing password
 *     tags:
 *       - userAuth
 *     requestBody:
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           required:
 *             - newPassword
 *           properties:
 *             newPassword:
 *               type: string
 *               example: MyNewPassword123
 *     responses:
 *       200:
 *         description: User signing in.
 *
 *
 */ 
//# sourceMappingURL=auth.docs.js.map