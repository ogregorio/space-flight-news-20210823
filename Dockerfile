# Pull node image from docker registry
FROM node:17-alpine3.12

# Copy all files
COPY ./space-flight-news /home/node/space-flight-news

# Set workdir to node user home
WORKDIR /home/node/space-flight-news

# As root install pnpm and hs2
RUN npm install -g pnpm
RUN pnpm add --global nest

# Change permissions of folder to permit node user to modifie temporary files
RUN chown -R node /home/node/space-flight-news

# Change user to node to run install as user
# (use git repositories as registry if neccessary when building)
USER node

# Install all dependencies and build
RUN pnpm i
RUN pnpm run build

# Expose 3000 port
EXPOSE 3000

# Run application
CMD pnpm run start:prod