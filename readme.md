# Orion Backend Documentation

## Technology Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express
- **ORM (Object-Relational Mapping):** Prisma

## Database

- **Type:** PostgreSQL

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- PostgreSQL

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/orion-backend.git
cd orion-backend
```

2. Install Depedencies
```bash
npm install
```

3. Generate Model
```bash
npx prisma generate
```

4. Start Server
```bash
node src/index.ts
```