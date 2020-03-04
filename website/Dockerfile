FROM keymetrics/pm2:latest-alpine
LABEL maintainer="marcoc@emanaged.co.uk"

WORKDIR /src
COPY . .

RUN npm install
#RUN npm install --production

EXPOSE 3000
CMD ["pm2-runtime", "pm2.json"]