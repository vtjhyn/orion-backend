# Orion v2

Point of Sales project

## Table of Contents

- [Requirements](#requirements)
- [Using Docker](#using-docker)
- [API Documentation](#api-documentation)
- [Areas for Improvement](#areas-for-improvement)
  - [1. Table Relations](#1-table-relations)
  - [2. Master User Configuration](#2-master-user-configuration)
  - [3. Database Backup](#3-database-backup)
  - [4. API Security](#4-api-security)

## Requirements

Ensure that you have Docker installed. Follow the official Docker installation guide [here](https://docs.docker.com/desktop/).

## Using Docker

1. Build the Docker images:

    ```bash
    docker-compose build
    ```

2. Start the Docker containers in detached mode:

    ```bash
    docker-compose up -d
    ```

## API Documentation

Access the API documentation at the following URL:

- URL: [localhost:3000/api-docs](http://localhost:3000/api-docs)

## Areas for Improvement

### 1. Table Relations

Ensure proper documentation of table relationships within the database. Provide clear diagrams or descriptions to help users understand how different tables are connected.

### 2. Master User Configuration

Include detailed instructions on setting up and configuring the master user. This should cover the creation process, required permissions, and any additional steps needed for a secure and efficient master user setup.

### 3. Database Backup

Document the process for backing up the database. Include step-by-step instructions on how users can perform regular backups, and provide guidance on restoring from backups if necessary.

### 4. API Security

Enhance the documentation regarding API security. Discuss authentication methods, authorization mechanisms, and any additional security measures implemented in the API. Encourage users to follow best practices for securing their applications.

