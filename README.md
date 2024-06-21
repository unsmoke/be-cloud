# Unsmoke Backend Cloud

Welcome to the Unsmoke Backend Cloud! This project leverages Node.js for real-time data processing and scalable architecture, with Google Cloud Platform (GCP) providing a secure and reliable infrastructure for data storage and server hosting.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**
    ```bash
    git clone https://github.com/unsmoke/be-cloud.git
    cd be-cloud
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

## Configuration

Before running the project, you need to set up your environment variables. Follow these steps:

1. **Rename `.env.example` to `.env`**
    ```bash
    mv .env.example .env
    ```

2. **Fill in the environment variables in the `.env` file**
    ```
    PORT=your_port_number
    JWT_SECRET=your_jwt_secret
    JWT_REFRESH_SECRET=your_jwt_refresh_secret
    DATABASE_URL=your_database_url
    MODEL_URL=your_model_url
    GOOGLE_CLOUD_STORAGE_KEY_PATH=your_google_cloud_storage_key_path
    ```

## Running the Project

To run the project in a development or local environment, use the following command:

```bash
npm run dev
