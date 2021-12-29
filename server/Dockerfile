FROM node:16

# Set working dir in the container to /
RUN mkdir -p /server
WORKDIR /server

# Copy application to / directory and install dependencies
COPY package.json ./server/
RUN yarn install
COPY . ./server
RUN yarn run build

# Expose port 8081 to the outside once the container has launched
EXPOSE 8081

# what should be executed when the Docker image is launching
CMD [ "node", "dist/main" ]