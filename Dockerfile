FROM node:lts-alpine as clientstage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM openjdk:17 as servicestage
WORKDIR /service

COPY service/mvnw .
COPY service/.mvn .mvn
COPY service/pom.xml .
COPY service/src src
COPY --from=clientstage /app/dist src/main/resources/static

RUN ./mvnw package

FROM openjdk:17
COPY --from=servicestage /service/target/client-service-0.0.1-SNAPSHOT.jar /app.jar
CMD java -Dserver.port=$PORT -jar /app.jar
