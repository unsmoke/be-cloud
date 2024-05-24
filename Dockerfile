FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Install the Cloud SQL Auth Proxy
RUN wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
RUN chmod +x cloud_sql_proxy

ENV PORT=8080
ENV DATABASE_URL=postgresql://bangkit-capstone:root@localhost:5432/unsmoke
ENV INSTANCE_CONNECTION_NAME=bangkit-capstone-424110:asia-southeast2:bangkit-capstone

EXPOSE ${PORT:-8080}

CMD ["sh", "-c", "./cloud_sql_proxy -instances=bangkit-capstone-424110:asia-southeast2:bangkit-capstone=tcp:5432 & npm start"]
