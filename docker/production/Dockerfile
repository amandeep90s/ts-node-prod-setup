# Using Lightwight docker image for node
FROM node:20-alpine AS base

# Setting up working directory
WORKDIR /usr/src/backend-app

# Copying package.json and package-lock.json
COPY package*.json ./

# Installing dependencies - clean install
RUN npm ci --only=production

# Copying source code
COPY . .

# Build Typescript Project
RUN npm run build

# Exposing port 3000
EXPOSE 3000

# Starting the application
CMD ["npm", "start"]