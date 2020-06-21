# SSL/TLS Mongo DB connection


1. Generate first ssl certificates with `generate.sh` from `certs` folder

   ```bash
   cd certs 
   bash generate.sh
   ```

2. Run docker-compose 

   ```bash
    docker-compose up myNode
   ```