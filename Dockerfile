FROM node:lits-alpine as clientstage
RUN npm install
RUN npm run build
COPY dist ./service/src/main/resources/static

FROM openjdk:17 as servicestage
WORKDIR /app
COPY service/mvnw .
COPY service/.mvn .mvn
COPY service/pom.xml .
COPY service/src src
RUN ./mvnw package
COPY service/target/*.jar app.jar

FROM openjdk:17
COPY --from=servicestage /app/app.jar .
ENTRYPOINT ["java","-jar","/app.jar"]