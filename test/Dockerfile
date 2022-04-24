FROM node:12.2.0-alpine

# set working directory
USER root
WORKDIR /app

# `/app/node_modules/.bin`을 $PATH 에 추가
ENV PATH /app/node_modules/.bin:$PATH

# app dependencies, install 및 caching
COPY package.json /app/package.json
# COPY package-lock.json /app/package-lock.json
# COPY public /app/public
# COPY src /app/src
# RUN whoami
RUN npm install
RUN npm install react-scripts@4.0.3

# 앱 실행
CMD ["npm", "start"]