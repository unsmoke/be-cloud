Rename .env.example -> .env
Masukkan DATABASE_URL="postgresql://bangkit-capstone:root@localhost:5432/unsmoke"
Install Google CLoud SQL Proxy
1.wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
chmod +x cloud_sql_proxy

2.sudo mv cloud_sql_proxy /usr/local/bin/ (optinal)

3.run ./cloud_sql_proxy -instances=bangkit-capstone-424110:asia-southeast2:bangkit-capstone=tcp:5432
