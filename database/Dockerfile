# Dockerfile
FROM mysql

CMD ["--default-authentication-plugin=mysql_native_password"]

ENV MYSQL_ROOT_PASSWORD=root

ENV MYSQL_DATABASE=sword_health_tasks

COPY ./init.sql /docker-entrypoint-initdb.d/
