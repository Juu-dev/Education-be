###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:18-slim
RUN apt-get update && apt-get install libssl-dev -y --no-install-recommends
# Create app directory in container
# WORKDIR /home/node/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
# RUN npm ci
RUN npm install
# RUN npm cache clean --force && npm install --force --legacy-peer-deps
# RUN npm cache clean --force && npm install

# Bundle app source
COPY --chown=node:node . .
RUN  npx prisma generate

# Expose port 9000
EXPOSE 9001

# Use the node user from the image (instead of the root user)
USER node

CMD [ "npm", "run", "start:dev" ]

# ENTRYPOINT [ "npm", "run", "start:dev" ]
