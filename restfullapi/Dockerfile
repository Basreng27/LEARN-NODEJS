# Base image yang lebih ringan
FROM node:16-alpine

# Set Work Directory di dalam container
WORKDIR /app

# Copy package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code ke dalam work directory
COPY . .

# Jalankan Prisma generate untuk menginisialisasi Prisma Client
RUN npx prisma generate

# Expose port 3000
EXPOSE 3000

# Command untuk menjalankan aplikasi (pastikan sesuai dengan path file)
CMD ["node", "src/main.js"]
