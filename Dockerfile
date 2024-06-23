FROM dr-dev.ampr.network:443/devops/nginx22alpine:1.1.1

USER root

COPY ./dist/apps/dashboard /static

USER 1000
