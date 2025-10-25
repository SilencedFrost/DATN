plugins {
    id("java")
    id("org.springframework.boot") version "4.0.0-M3"
    id("io.spring.dependency-management") version "1.1.7"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    // Spring boot
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-mail")

    // Spring dev tools
    developmentOnly("org.springframework.boot:spring-boot-devtools")

    // Postgres driver
    implementation("org.postgresql:postgresql:42.7.8")

    // Lombok - compileOnly AND annotationProcessor
    compileOnly("org.projectlombok:lombok:1.18.38")
    annotationProcessor("org.projectlombok:lombok:1.18.38")

    // MapStruct
    implementation("org.mapstruct:mapstruct:1.6.3")
    annotationProcessor("org.mapstruct:mapstruct-processor:1.6.3")

    // CRITICAL: Binding must be AFTER both Lombok and MapStruct processors
    annotationProcessor("org.projectlombok:lombok-mapstruct-binding:0.2.0")

    // Spring configuration processor - can be last
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")

    // Testing
    testImplementation("org.springframework.boot:spring-boot-starter-test")

    // Commons codec (for SHA256)
    implementation("commons-codec:commons-codec:1.19.0")

    //BCrypt
    implementation("at.favre.lib:bcrypt:0.10.2")
}

tasks.test {
    useJUnitPlatform()
}

// Enable annotation processing
tasks.withType<JavaCompile> {
    options.compilerArgs.add("-parameters")
}

tasks.bootRun {
    sourceResources(sourceSets["main"])
}