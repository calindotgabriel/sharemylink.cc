# Use an official Node runtime as the base image
FROM node:20

# Install pnpm
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if you have one) to the working directory
COPY package.json pnpm-lock.yaml* ./
COPY webpack.config.js ./
COPY postcss.config.js ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the frontend code, excluding node_modules
COPY . .

# Expose port 4000 for the development server
EXPOSE 3000

# Set environment variable for instant reload
ENV CHOKIDAR_USEPOLLING=true

# Start the React development server
CMD ["pnpm", "start"]
