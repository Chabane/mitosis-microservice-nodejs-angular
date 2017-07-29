FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app/client
RUN mkdir -p /usr/src/app/server

WORKDIR /usr/src/app/client

# Install client dependencies
COPY client/package.json .
COPY client/yarn.lock .
RUN yarn

# Bundle client source
ADD client /usr/src/app/client/

WORKDIR /usr/src/app/server

# Install server dependencies
COPY server/package.json .
COPY server/yarn.lock .
RUN yarn

# Bundle server source
ADD server /usr/src/app/server/

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
RUN yarn

EXPOSE 4000
CMD [ "npm", "run", "start:prod" ]
