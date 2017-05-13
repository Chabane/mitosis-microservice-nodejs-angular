FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app/server

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn

# Bundle app source
ADD server /usr/src/app/server/

EXPOSE 4000
CMD [ "npm", "run", "start:prod" ]
