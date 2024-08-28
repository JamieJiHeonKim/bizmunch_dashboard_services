/**
 * @swagger
 * /users/dashboard/companyNames:
 *   get:
 *     summary: Retrieve all company names for registering
 *     tags:
 *       - noAuth
 *     responses:
 *       200:
 *         description: A list of all companies.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /users/dashboard/companies:
 *   get:
 *     summary: Retrieve all companies.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: A list of all companies.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/dashboard/companies:
 *   post:
 *     summary: Create a new company.
 *     tags:
 *       - Admin
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Example Company
 *               email:
 *                 type: string
 *                 example: company@example.com
 *     responses:
 *       201:
 *         description: The newly created company.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /users/dashboard/companies/{id}:
 *   get:
 *     summary: Retrieve a single company by ID.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Company ID
 *     responses:
 *       200:
 *         description: The requested company.
 *       404:
 *         description: Company not found.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /users/dashboard/companies/{id}:
 *   put:
 *     summary: Update an existing company by ID.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Company ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Company Name
 *               email:
 *                 type: string
 *                 example: updated@example.com
 *     responses:
 *       200:
 *         description: The updated company.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Company not found.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /users/dashboard/companies/{id}:
 *   delete:
 *     summary: Delete a company by ID.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Company ID
 *     responses:
 *       200:
 *         description: Company deleted successfully.
 *       404:
 *         description: Company not found.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /users/dashboard/companies/{id}/transaction:
 *   get:
 *     summary: Retrieve a single company transactions.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Company ID
 *     responses:
 *       200:
 *         description: The requested company transactions.
 *       404:
 *         description: Company not found.
 *       500:
 *         description: Internal server error.
 */



/**
 * @swagger
 * /users/dashboard/companies/{id}/getCompanyPopularProduct:
 *   get:
 *     summary: Retrieve a single company popular product.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Company ID
 *     responses:
 *       200:
 *         description: The requested company popular product.
 *       404:
 *         description: Company not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/dashboard/transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: The transaction object.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Transaction not found.
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */



/**
 * @swagger
 * /users/dashboard/users:
 *   get:
 *     summary: Retrieve all users.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: A list of all users.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /users/dashboard/user/search:
 *   get:
 *     summary: Search users based on status.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter users by status (e.g., "manager", "employee").
 *     responses:
 *       200:
 *         description: Successful operation. Returns an array of users matching the specified criteria.
 *       404:
 *         description: No users found matching the specified criteria.
 *       500:
 *         description: Internal server error.
 */



/**
 * @swagger
 * /users/dashboard/managers:
 *   post:
 *     summary: Create a new manager.
 *     tags:
 *       - Admin
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - companyId
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: MyPassword123
 *               name:
 *                 type: string
 *                 example: John Doe
 *               companyId:
 *                 type: string
 *                 example: 241515152151
 *     responses:
 *       201:
 *         description: The newly created manager.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /users/dashboard/user/{id}:
 *   get:
 *     summary: Retrieve a single user by ID.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: user ID
 *     responses:
 *       200:
 *         description: The requested user.
 *       404:
 *         description: user not found.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /users/dashboard/user/{id}:
 *   put:
 *     summary: Update an existing user by ID.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: user ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: NewPassword123
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: The updated user.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: user not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/dashboard/user/{id}:
 *   delete:
 *     summary: Delete a user by ID.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: user ID
 *     responses:
 *       200:
 *         description: user deleted successfully.
 *       404:
 *         description: user not found.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /users/dashboard/notifications:
 *   get:
 *     summary: Retrieve all notifications.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: List of notifications.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /users/dashboard/notifications:
 *   post:
 *     summary: Create a new notification.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company
 *               - text
 *             properties:
 *               company:
 *                 type: string
 *                 description: ID of the company associated with the notification.
 *               text:
 *                 type: string
 *                 description: Text of the notification.
 *     responses:
 *       201:
 *         description: New notification created successfully.
 *       400:
 *         description: Bad request. Missing required fields or invalid data.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /users/dashboard/notifications/{id}:
 *   get:
 *     summary: Retrieve a notification by ID.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the notification to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retrieved notification.
 *       404:
 *         description: Notification not found.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /users/dashboard/notifications/{id}:
 *   put:
 *     summary: Update a notification by ID.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the notification to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Text of the notification.
 *     responses:
 *       200:
 *         description: Updated notification.
 *       400:
 *         description: Bad request. Missing required fields or invalid data.
 *       404:
 *         description: Notification not found.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /users/dashboard/notifications/{id}:
 *   delete:
 *     summary: Delete a notification by ID.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the notification to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification deleted successfully.
 *       404:
 *         description: Notification not found.
 *       500:
 *         description: Internal server error.
 */





/**
 * @swagger
 * /users/dashboard/employees:
 *   get:
 *     summary: Get all employees of the company.
 *     tags:
 *       - Manager
 *     responses:
 *       200:
 *         description: Successful operation. Returns an array of employees.
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /users/dashboard/employees/{id}:
 *   get:
 *     summary: Get details of a specific employee by ID.
 *     tags:
 *       - Manager
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee to get.
 *     responses:
 *       200:
 *         description: Successful operation. Returns the employee details.
 *       404:
 *         description: Employee not found.
 *       500:
 *         description: Internal server error.
 *
 *   put:
 *     summary: Update details of a specific employee by ID.
 *     tags:
 *       - Manager
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee to update.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: name.
 *               email:
 *                 type: string
 *                 description: email.
 *     responses:
 *       200:
 *         description: Employee updated successfully. Returns the updated employee details.
 *       400:
 *         description: Bad request. Missing or invalid parameters.
 *       404:
 *         description: Employee not found.
 *       500:
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete a specific employee by ID.
 *     tags:
 *       - Manager
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee to delete.
 *     responses:
 *       200:
 *         description: Employee deleted successfully.
 *       404:
 *         description: Employee not found.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /users/dashboard/companyNotifications:
 *   get:
 *     summary: Get all notifications for the authenticated user's company.
 *     tags:
 *       - Manager
 *     responses:
 *       200:
 *         description: Successful operation. Returns an array of notifications.
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       400:
 *         description: Bad request. User does not belong to any company.
 *       404:
 *         description: No notifications found for the company.
 *       500:
 *         description: Internal server error.
 */



/**
 * @swagger
 * /users/dashboard/transactions:
 *   get:
 *     summary: Get all transactions for the user's company.
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: An array of transactions.
 */


/**
 * @swagger
 * /users/dashboard/transactions:
 *   post:
 *     summary: Create a new transaction.
 *     tags:
 *       - ManagerTransactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - quantity
 *               - profit
 *               - productCost
 *               - discount
 *               - date
 *             properties:
 *               productName:
 *                 type: string
 *                 description: The name of the product.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product.
 *               profit:
 *                 type: number
 *                 description: The profit generated from the transaction.
 *               productCost:
 *                 type: number
 *                 description: The product cost.
 *               discount:
 *                 type: number
 *                 description: The discount applied to the transaction.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the transaction.
 *     responses:
 *       201:
 *         description: A new transaction created successfully.
 *       403:
 *         description: Only manager users can access this endpoint.
 */


/**
 * @swagger
 * /users/dashboard/transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID.
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: The transaction object.
 *       404:
 *         description: Transaction not found.
 */



/**
 * @swagger
 * /users/dashboard/popularProducts:
 *   get:
 *     summary: Get the table of 5 popular products.
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: A list of 5 popular products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the product.
 *                   totalQuantitySold:
 *                     type: number
 *                     description: The total quantity sold of the product.
 *       500:
 *         description: Internal Server Error.
 */


/**
 * @swagger
 * /users/dashboard/dashboardCompanyDetails/{companyId}:
 *   get:
 *     summary: Get a dashboard details by companyid.
 *     tags:
 *       - dashboard
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *         description: companyId
 *     responses:
 *       200:
 *         description: The dashboard details object.
 *       404:
 *         description: company not found.
 */
