# Midterm CRUD API  - Express & TypeORM

## Project Description
A RESTful API built with Express, TypeORM, MySQL, and TypeScript that manages user records with full CRUD functionality.

## How to run the application
- npm run dev

## Setup Instructions
1. Clone the repository:
git clone https://github.com/cadosalesmichealaalyssa-dot/midterm-crud-api.git

## Reflection Question:
1. What was the most challenging part of building this API?
- The most challenging part was dealing with TypeScript compilation and decorator configuration—specifically resolving the ColumnTypeUndefinedError by explicitly defining column types (like { type: 'varchar' }) in the User entity to accommodate the tsx transpiler. We also had to carefully configure the .env database credentials to resolve initial local MySQL root access errors.
2. How does TypeORM make database operations easier compared to raw SQL?
- TypeORM bridges object-oriented code with relational databases by mapping classes (like our User entity) directly to database tables. Instead of writing raw SQL strings, it allows us to use built-in repository methods and automatically synchronizes our schema—as seen when TypeORM automatically created the users table in MySQL the moment the development server booted up.
3. Why is it important to exclude the password field from API responses? How did you implement this?
- Why it matters: Even if passwords are encrypted, leaving them exposed in JSON payloads creates a major security vulnerability if user records are intercepted or logged.
- How it was implemented: We configured the password column inside the User entity with { select: false }, which automatically hides the password field from standard query results.
4. Describe a scenario where you would need to use database transactions instead of individual operations.
- Transactions are necessary when multiple dependent database steps must execute as a single atomic unit. For example, if a user profile creation requires creating a user record and simultaneously generating an initial audit log entry, a transaction ensures that if logging fails, the user creation is rolled back to prevent partial or corrupted data states.
5. What is the difference between `synchronize: true` and migrations? When should you use each?
- synchronize: true: Automatically checks your entity definitions and updates your database schema on every server restart. It is ideal for rapid development and building prototypes quickly.
- Migrations: Use explicit, version-controlled code scripts to alter database structures step-by-step. They should be used in production environments to protect existing user data from accidental drops or alterations.
6. If you had to add a `Product` entity with a relationship to `User` (a user can have many products), how would you modify the code?
- To add a Product entity with a relationship to User, I would create a new Product entity file containing basic properties like id, name, and price, and use TypeORM relationship decorators to establish a One-to-Many connection. Specifically, I would add a @ManyToOne(() => User, (user) => user.products) decorator on a user property inside the Product entity, and an inverse @OneToMany(() => Product, (product) => product.user) decorator inside the User entity class. This allows TypeORM to automatically manage foreign keys in MySQL so that a single user can own multiple product entries.
7. What security improvements would you make before deploying this API to production? (Hint: password hashing, rate limiting, authentication, etc.)
- Before production deployment, you should implement:
- Password Hashing: Using a library like bcrypt before saving user passwords to the database.
- Authentication: Securing endpoints using JSON Web Tokens (JWT) or session middleware.
- Input Validation: Validating request payloads to reject malformed data.
- Rate Limiting: Protecting routes against brute-force or denial-of-service attacks.