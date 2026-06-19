# Use the official Playwright image matching the project version
FROM mcr.microsoft.com/playwright:v1.60.0-jammy

# Set working directory inside the container
WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Set CI environment variable so playwright.config.js picks it up
ENV CI=true

# Run all Playwright tests by default
CMD ["npx", "playwright", "test"]
