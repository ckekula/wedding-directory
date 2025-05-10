FROM node:23-alpine AS development

# Define build arguments
ARG DATABASE_URL
ARG MONGODB_URI
ARG GOOGLE_MAPS_API_KEY
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_S3_REGION
ARG AWS_S3_BUCKET_NAME
ARG UPLOAD_RATE_TTL
ARG UPLOAD_RATE_LIMIT
ARG CORS_ORIGIN
ARG TYPEORM_SYNC
ARG COOKIE_SECURE
ARG COOKIE_SAMESITE
ARG COOKIE_DOMAIN
ARG STRIPE_SECRET_KEY
ARG JWT_SECRET
ARG OPENAI_API_KEY
ARG TEST_DATABASE_URL

# Set environment variables
ENV DATABASE_URL=${DATABASE_URL}
ENV MONGODB_URI=${MONGODB_URI}
ENV GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_S3_REGION=${AWS_S3_REGION}
ENV AWS_S3_BUCKET_NAME=${AWS_S3_BUCKET_NAME}
ENV UPLOAD_RATE_TTL=${UPLOAD_RATE_TTL}
ENV UPLOAD_RATE_LIMIT=${UPLOAD_RATE_LIMIT}
ENV CORS_ORIGIN=${CORS_ORIGIN}
ENV TYPEORM_SYNC=${TYPEORM_SYNC}
ENV COOKIE_SECURE=${COOKIE_SECURE}
ENV COOKIE_SAMESITE=${COOKIE_SAMESITE}
ENV COOKIE_DOMAIN=${COOKIE_DOMAIN}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV JWT_SECRET=${JWT_SECRET}
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV TEST_DATABASE_URL=${TEST_DATABASE_URL}

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Run tests after source files are copied
RUN npm test -- --passWithNoTests

# Use the node user from the image (instead of the root user)
USER node

FROM node:23-alpine AS build

# Define build arguments again for build stage
ARG DATABASE_URL
ARG MONGODB_URI
ARG GOOGLE_MAPS_API_KEY
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_S3_REGION
ARG AWS_S3_BUCKET_NAME
ARG UPLOAD_RATE_TTL
ARG UPLOAD_RATE_LIMIT
ARG CORS_ORIGIN
ARG TYPEORM_SYNC
ARG COOKIE_SECURE
ARG COOKIE_SAMESITE
ARG COOKIE_DOMAIN
ARG STRIPE_SECRET_KEY
ARG JWT_SECRET
ARG OPENAI_API_KEY
ARG TEST_DATABASE_URL
# Set environment variables for build stage
ENV DATABASE_URL=${DATABASE_URL}
ENV MONGODB_URI=${MONGODB_URI}
ENV GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_S3_REGION=${AWS_S3_REGION}
ENV AWS_S3_BUCKET_NAME=${AWS_S3_BUCKET_NAME}
ENV UPLOAD_RATE_TTL=${UPLOAD_RATE_TTL}
ENV UPLOAD_RATE_LIMIT=${UPLOAD_RATE_LIMIT}
ENV CORS_ORIGIN=${CORS_ORIGIN}
ENV TYPEORM_SYNC=${TYPEORM_SYNC}
ENV COOKIE_SECURE=${COOKIE_SECURE}
ENV COOKIE_SAMESITE=${COOKIE_SAMESITE}
ENV COOKIE_DOMAIN=${COOKIE_DOMAIN}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV JWT_SECRET=${JWT_SECRET}
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV TEST_DATABASE_URL=${TEST_DATABASE_URL}

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .


# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV=production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node

FROM node:23-alpine AS production

# Define build arguments again for production stage
ARG DATABASE_URL
ARG MONGODB_URI
ARG GOOGLE_MAPS_API_KEY
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_S3_REGION
ARG AWS_S3_BUCKET_NAME
ARG UPLOAD_RATE_TTL
ARG UPLOAD_RATE_LIMIT
ARG CORS_ORIGIN
ARG TYPEORM_SYNC
ARG COOKIE_SECURE
ARG COOKIE_SAMESITE
ARG COOKIE_DOMAIN
ARG STRIPE_SECRET_KEY
ARG JWT_SECRET
ARG OPENAI_API_KEY
ARG TEST_DATABASE_URL

# Set environment variables for production stage
ENV DATABASE_URL=${DATABASE_URL}
ENV MONGODB_URI=${MONGODB_URI}
ENV GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_S3_REGION=${AWS_S3_REGION}
ENV AWS_S3_BUCKET_NAME=${AWS_S3_BUCKET_NAME}
ENV UPLOAD_RATE_TTL=${UPLOAD_RATE_TTL}
ENV UPLOAD_RATE_LIMIT=${UPLOAD_RATE_LIMIT}
ENV CORS_ORIGIN=${CORS_ORIGIN}
ENV TYPEORM_SYNC=${TYPEORM_SYNC}
ENV COOKIE_SECURE=${COOKIE_SECURE}
ENV COOKIE_SAMESITE=${COOKIE_SAMESITE}
ENV COOKIE_DOMAIN=${COOKIE_DOMAIN}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV JWT_SECRET=${JWT_SECRET}
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV TEST_DATABASE_URL=${TEST_DATABASE_URL}

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist


# Expose the application port
EXPOSE 4000
ENV HOSTNAME="0.0.0.0"

# Start the server using the production build
CMD [ "node", "dist/main.js", "-H", "0.0.0.0" ]
