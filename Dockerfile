FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY dist /usr/src/app
COPY src/server /usr/src/app/src

EXPOSE 80
CMD [ "npm", "start" ]
