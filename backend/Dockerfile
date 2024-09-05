# Use a more complete base image that includes common Unix tools
#FROM node:20 AS build

#linux build
FROM --platform=linux/amd64 node:20 AS build

ENV PORT=8000
ENV MONGO_CONNECTION_STRING=mongodb+srv://gcalin:MJHtySMqllvVMpCL@sharemylink-cluster.rgrzr.mongodb.net


# Create and change to the app directory
WORKDIR /app

# Install pnpm and procps
RUN npm install -g pnpm && \
    apt-get update && \
    apt-get install -y procps && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json files to the container
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

# Build the application

RUN pnpm run build

# Expose the port the app runs on
EXPOSE 8000

# Production stage
# FROM node:20-slim

# # Install pnpm
# RUN npm install -g pnpm

# WORKDIR /app

# COPY --from=build /app/dist ./dist
# COPY --from=build /app/node_modules ./node_modules
# COPY package.json pnpm-lock.yaml ./

# EXPOSE 3000

CMD ["pnpm", "start:prod"]


# CMD ["pnpm", "start:prod"]

