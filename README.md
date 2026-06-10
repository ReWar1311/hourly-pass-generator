# Hourly Pass Generator

A secure Node.js application that generates a dynamic password that automatically changes every hour using HMAC-SHA256 cryptographic hashing. The project eliminates the need for storing passwords in a database while ensuring predictable and secure password generation for authorized systems.

---

## About The Project

Hourly Pass Generator is a lightweight password generation system that creates a unique password every hour based on a secret key and the current timestamp.

Instead of storing passwords in a database, the application generates them dynamically using cryptographic hashing. Any system with access to the same secret key can reproduce the same password for the current hour.

### Key Features

* Hourly rotating passwords
* No database required
* Stateless architecture
* Secure HMAC-SHA256 hashing
* Simple web interface
* Easy deployment
* Low hosting cost

### Use Cases

* Temporary access systems
* Internal team authentication
* Visitor access management
* Shared hourly credentials
* Time-based security experiments
* Educational cryptography projects

---

## Live Demo

### Is It Live?

Yes.

**Live URL**

[https://hourly-pass-generator.vercel.app](https://pass-gen.prashantrewar.app/password)

### How To Use

1. Open the website.
2. The application automatically generates the current hourly password.
3. Use the displayed password wherever access is required.
4. The password remains valid until the next hour.
5. A new password is generated automatically when the hour changes.

No registration or login is required.

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Security

* Crypto Module (HMAC-SHA256)

### Environment Management

* dotenv

### Deployment

* Vercel

---

## Project Structure

```bash
hourly-pass-generator/
│
├── index.js
├── package.json
├── .env
└── .gitignore
```

---

## Running The Project Locally

### Prerequisites

* Node.js 18+
* npm

### Clone Repository

```bash
git clone https://github.com/ReWar1311/hourly-pass-generator.git

cd hourly-pass-generator
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PASSWORD_SECRET=your_secret_key
PORT=4000
```

### Start Server

```bash
node index.js
```

### Access Application

```text
http://localhost:4000/password
```

---

## Deployment Guide

### Deploy On Vercel

#### Step 1

Fork or clone the repository.

#### Step 2

Push the code to your GitHub repository.

#### Step 3

Login to Vercel and import the repository.

#### Step 4

Configure Environment Variables:

```env
PASSWORD_SECRET=your_secret_key
```

#### Step 5

Click **Deploy**.

Vercel will automatically build and deploy the application.

---

## Detailed Logic Of The Application

### 1. Load Dependencies

The application initializes:

* Express for creating the web server
* Crypto for generating secure hashes
* Dotenv for environment variable management

### 2. Read Secret Key

The secret key is loaded from environment variables:

```text
PASSWORD_SECRET
```

This ensures sensitive data is not stored inside the source code.

### 3. Generate Time-Based Input

The application creates a string using:

* Current Year
* Current Month
* Current Day
* Current Hour

Example:

```text
2026-06-11-14
```

Since the hour changes every 60 minutes, the generated password also changes every hour.

### 4. Create Secure Hash

The application generates:

```text
HMAC-SHA256(secret, current_hour_key)
```

This guarantees:

* Same input produces same output
* Secret key is required
* Output is cryptographically secure

### 5. Generate Password

The SHA256 output is shortened to a readable password length.

Example:

```text
7e3a91d4b2f8
```

This makes the password easy to communicate while remaining secure.

### 6. Password Endpoint

The route:

```http
GET /password
```

Generates and displays:

* Current password
* Expiry timestamp
* User interface controls

### 7. Expiry Calculation

The system calculates the beginning of the next hour and displays when the password will expire.

### 8. HTML Rendering

The server dynamically renders a page containing:

* Password display
* Expiry information
* Copy functionality
* Refresh button

### 9. Server Startup

Express starts listening on the configured port and serves requests.

---

## Security Architecture

The project follows a stateless authentication model.

### Security Benefits

* No password storage
* No database dependency
* Secret-based generation
* Hourly rotation
* Cryptographically secure hashing

### Advantages

* Fast
* Lightweight
* Secure
* Easy to scale
* Easy to deploy

---

## API Reference

### Get Current Password

#### Request

```http
GET /password
```

#### Response

Returns an HTML page containing:

* Current generated password
* Expiry timestamp
* User actions

---

## Future Enhancements

Potential improvements include:

* JSON API support
* Custom expiry durations
* Password history verification
* QR code generation
* Multi-secret support
* Authentication middleware
* Rate limiting
* Audit logging

---

## Contributing

Contributions are welcome.

### Steps

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/my-feature
```

3. Commit your changes.

```bash
git commit -m "Added new feature"
```

4. Push changes.

```bash
git push origin feature/my-feature
```

5. Open a Pull Request.

---

## Contact

### Author

Prashant Rewar

GitHub: https://github.com/ReWar1311

Repository: https://github.com/ReWar1311/hourly-pass-generator

---

## License & Usage Permission

This project is completely open for:

* Personal Use
* Educational Use
* Commercial Use
* Production Use
* Modification
* Redistribution

You may use this project for any purpose without requiring permission.

### Credit (Optional)

If you would like to provide attribution, you may credit:

**@ReWar1311**

GitHub Profile:

https://github.com/ReWar1311

Providing credit is appreciated but not mandatory.

---

## Acknowledgements

Built with:

* Node.js
* Express.js
* Crypto API
* Vercel

Thank you for checking out this project.
