FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

# Clean and generate Prisma Client
RUN npx prisma generate

# Clean and build the application
RUN npm run build

# Add logging for debugging
ENV NODE_ENV=development
ENV LOG_LEVEL=debug

EXPOSE 3000

CMD ["npm", "run", "start:prod"] 