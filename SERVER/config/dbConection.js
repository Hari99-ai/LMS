import mysql from "mysql2/promise";

let pool;

const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY,
    fullName VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar_public_id VARCHAR(255) DEFAULT NULL,
    avatar_secure_url TEXT DEFAULT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    subscription_id VARCHAR(255) DEFAULT NULL,
    subscription_status VARCHAR(50) DEFAULT NULL,
    forgotPasswordToken VARCHAR(255) DEFAULT NULL,
    forgotPasswordExpiry BIGINT DEFAULT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS courses (
    id CHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    thumbnail_public_id VARCHAR(255) NOT NULL,
    thumbnail_secure_url TEXT NOT NULL,
    lectures JSON NOT NULL,
    numbersOfLecture INT NOT NULL DEFAULT 0,
    createdBy VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS quizzes (
    id CHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    questions JSON NOT NULL,
    courseId CHAR(36) NOT NULL,
    createdBy VARCHAR(255) DEFAULT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS submitted_quizzes (
    id CHAR(36) PRIMARY KEY,
    userId CHAR(36) NOT NULL,
    quizId CHAR(36) NOT NULL,
    selectedOptions JSON NOT NULL,
    score INT DEFAULT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS chats (
    id CHAR(36) PRIMARY KEY,
    senderName VARCHAR(255) NOT NULL,
    senderId CHAR(36) DEFAULT NULL,
    message TEXT NOT NULL,
    time VARCHAR(50) NOT NULL,
    image TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS payments (
    id CHAR(36) PRIMARY KEY,
    razorpay_payment_id VARCHAR(255) NOT NULL,
    razorpay_subscription_id VARCHAR(255) NOT NULL,
    razorpay_signature VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS contact_us (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS top_educators (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    imageKey VARCHAR(100) DEFAULT NULL,
    imageUrl LONGTEXT DEFAULT NULL,
    twitterUrl VARCHAR(255) DEFAULT NULL,
    githubUrl VARCHAR(255) DEFAULT NULL,
    slackUrl VARCHAR(255) DEFAULT NULL,
    sortOrder INT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS subscribes (
    id CHAR(36) PRIMARY KEY,
    userId CHAR(36) NOT NULL,
    courseId JSON NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
];

async function ensureSchema(connection) {
  for (const statement of schemaStatements) {
    await connection.execute(statement);
  }
}

export const connectDB = async () => {
  if (pool) {
    return pool;
  }

  const useUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

  pool = useUrl
    ? mysql.createPool(useUrl)
    : mysql.createPool({
        host: process.env.MYSQL_HOST || "localhost",
        port: Number(process.env.MYSQL_PORT || 3306),
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "lms_project",
        waitForConnections: true,
        connectionLimit: 10,
        namedPlaceholders: false,
      });

  const connection = await pool.getConnection();
  try {
    await connection.ping();
    await ensureSchema(connection);
    console.log("database is successfully connected to MySQL");
  } finally {
    connection.release();
  }

  return pool;
};

export const getPool = () => {
  if (!pool) {
    throw new Error("Database has not been initialized yet");
  }
  return pool;
};

export const sqlQuery = async (statement, params = []) => {
  const [rows] = await getPool().query(statement, params);
  return rows;
};

export const sqlExecute = async (statement, params = []) => {
  const [result] = await getPool().execute(statement, params);
  return result;
};

export default connectDB;
