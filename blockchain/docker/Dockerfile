FROM node:21-bullseye

RUN apt update && apt -y upgrade

WORKDIR /hardhat

RUN npm install -g npm
RUN npm install --save-dev hardhat
RUN npm install --save-dev typescript ts-node
