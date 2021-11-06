# Build stage
FROM mhart/alpine-node:16 as build
COPY . /app
WORKDIR /app
RUN npm install

# Production stage
FROM mhart/alpine-node:16
RUN npm install --global serve
WORKDIR /
COPY --from=build /dist .
CMD ["serve", "-p", "3000", "-s", "."]
