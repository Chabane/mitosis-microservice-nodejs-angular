FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn

# Bundle app source
ADD dist /usr/src/app/dist/
ADD src/server /usr/src/app/server/

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
