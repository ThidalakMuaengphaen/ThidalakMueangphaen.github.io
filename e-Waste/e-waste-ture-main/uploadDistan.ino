#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "xGxy";
const char* password = "12345678";

const char* serverUrl = "http://demo.thingsboard.io/api/v1/OUKSzwxWnrXaWaSKm2XX/telemetry"; // Replace with your server URL
// "curl -v -X POST http://demo.thingsboard.io/api/v1/OUKSzwxWnrXaWaSKm2XX/telemetry --header Content-Type:application/json --data "{temperature:25}""
const int trigPin = D1;
const int echoPin = D2;

float duration, distance;

void ultralsonicRead() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = (duration*.0343)/2;
  Serial.print("Distance: ");
  Serial.println(distance);
  delay(100);
}

void setup() {
  Serial.begin(115200);
  
  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");

  // Wait until the connection is established
  delay(2000);

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    ultralsonicRead();

    HTTPClient http;

    // Start connection and send HTTP header
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    // Create JSON object
    StaticJsonDocument<200> doc;
    doc["distance"] = distance;
    doc["latitude"] = 16.473270;
    doc["longitude"] = 102.819920;

    String requestBody;
    serializeJson(doc, requestBody);

    // Send HTTP POST request
    int httpResponseCode = http.POST(requestBody);

    // Check the response code
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("HTTP Response code: " + String(httpResponseCode));
      Serial.println("Response: " + response);
    } else {
      Serial.println("Error in sending POST: " + String(httpResponseCode));
    }

    // Free resources
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }

  // Send a POST request every 10 seconds
  delay(1000);
}
