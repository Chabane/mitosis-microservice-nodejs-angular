FROM node:boron

# Install bluetooth
RUN apt-get update && apt-get install -y \
  bluetooth \
  bluez \
  usbutils

RUN apt-get update
RUN apt-get install gcc-4.8 g++-4.8
RUN update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.6 20
RUN update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 50
RUN update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.6 20
RUN update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.8 50

# Create app directory
RUN mkdir -p /usr/src/app/dist
RUN mkdir -p /usr/src/app/server

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn --ignore-optional
RUN yarn add bluetooth-hci-socket


# Bundle app source
ADD dist /usr/src/app/dist/
ADD server /usr/src/app/server/

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
