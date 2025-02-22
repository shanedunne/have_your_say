# ----- Stage 1: Build -----
FROM maven:3.9.3-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the Maven descriptor and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application, skipping tests for faster builds
COPY src ./src
RUN mvn clean package -DskipTests

# ----- Stage 2: Run -----
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the generated jar file from the build stage.
COPY --from=build /app/target/*.jar app.jar

# Expose the port (Render will provide the PORT env variable; ensure your application uses it)
EXPOSE 8080

# Start the Spring Boot application
CMD ["java", "-jar", "app.jar"]
