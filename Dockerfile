FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Install the Cloud SQL Auth Proxy
RUN wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
RUN chmod +x cloud_sql_proxy

EXPOSE ${PORT:-8080}

CMD ["sh", "-c", "./cloud_sql_proxy -instances=bangkit-capstone-424110:asia-southeast2:bangkit-capstone=tcp:5432 & npm start"]
