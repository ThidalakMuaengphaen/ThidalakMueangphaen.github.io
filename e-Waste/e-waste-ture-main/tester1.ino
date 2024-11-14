#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Replace with your network credentials
const char* ssid = "Ruangrit_5G";
const char* password = "";

// Server URL to send JSON data
const char* serverName = "http://demo.thingsboard.io/api/v1/Ys6oTLiDUy75m6bABJbu/telemetry";

const int trigPin = 5;
const int echoPin = 18;

long duration;
int distance;

void setup() {
  Serial.begin(115200);

  // Initialize the HC-SR04 sensor
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  // Measure distance using the HC-SR04 sensor
  distance = measureDistance();
  Serial.println("Distance: " + String(distance) + " cm");

  // Send the distance data as JSON
  sendJsonData(distance);

  delay(5000);  // Wait for 5 seconds before next reading
}

int measureDistance() {
  // Clear the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  // Set the trigPin HIGH for 10 microseconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Read the echoPin, and calculate the distance
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;  // Calculate the distance in cm

  return distance;
}

void sendJsonData(int distance) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName);                              // Specify the URL
    http.addHeader("Content-Type", "application/json");  // Set content type to JSON

    // Create JSON object
    StaticJsonDocument<200> doc;
    doc["sensor"] = "HC-SR04";
    doc["distance"] = distance;

    String jsonString;
    serializeJson(doc, jsonString);

    int httpResponseCode = http.POST(jsonString);  // Send the JSON data via HTTP POST

    if (httpResponseCode > 0) {
      String response = http.getString();  // Get the response to the request
      Serial.println("HTTP Response code: " + String(httpResponseCode));
      Serial.println("Response: " + response);
    } else {
      Serial.println("Error on sending POST: " + String(httpResponseCode));
    }

    http.end();  // Free resources
  } else {
    Serial.println("WiFi Disconnected");
  }
}
