# Define from what image we want to build our own image from.
FROM node:latest

# Create the working directory that holds the application code inside our image.
WORKDIR /app

# Install app dependencies inside our image.
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

# Bind app to the specified port to be mapped by the Docker daemon.
EXPOSE 8080

# Define the command to run app.
CMD ["node", "src/server.js"]