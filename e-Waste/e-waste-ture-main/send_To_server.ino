#include <WiFiClientSecure.h>
#include <WiFi.h>

const char* ssid     = "your-ssid";     // your network SSID (name of wifi network)
const char* password = "your-password"; // your network password

// Root certificate authority to verify the server (replace with your server's CA)
// const char* root_ca = 
// "-----BEGIN CERTIFICATE-----\n" 
// "MIIDSjCCAjKgAwIBAgIQRK+wgNajJ7qJMDmGLvhAazANBgkqhkiG9w0BAQUFADA/\n" 
// "MSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMT\n" 
// "DkRTVCBSb290IENBIFgzMB4XDTAwMDkzMDIxMTIxOVoXDTIxMDkzMDE0MDExNVow\n" 
// "PzEkMCIGA1UEChMbRGlnaXRhbCBTaWduYXR1cmUgVHJ1c3QgQ28uMRcwFQYDVQQD\n" 
// "Ew5EU1QgUm9vdCBDQSBYMzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB\n" 
// "AN+v6ZdQCINXtMxiZfaQguzH0yxrMMpb7NnDfcdAwRgUi+DoM3ZJKuM/IUmTrE4O\n" 
// "rz5Iy2Xu/NMhD2XSKtkyj4zl93ewEnu1lcCJo6m67XMuegwGMoOifooUMM0RoOEq\n" 
// "OLl5CjH9UL2AZd+3UWODyOKIYepLYYHsUmu5ouJLGiifSKOeDNoJjj4XLh7dIN9b\n" 
// "xiqKqy69cK3FCxolkHRyxXtqqzTWMIn/5WgTe1QLyNau7Fqckh49ZLOMxt+/yUFw\n" 
// "7BZy1SbsOFU5Q9D8/RhcQPGX69Wam40dutolucbY38EVAjqr2m7xPi71XAicPNaD\n" 
// "aeQQmxkqtilX4+U9m5/wAl0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNV\n" 
// "HQ8BAf8EBAMCAQYwHQYDVR0OBBYEFMSnsaR7LHH62+FLkHX/xBVghYkQMA0GCSqG\n" 
// "SIb3DQEBBQUAA4IBAQCjGiybFwBcqR7uKGY3Or+Dxz9LwwmglSBd49lZRNI+DT69\n" 
// "ikugdB/OEIKcdBodfpga3csTS7MgROSR6cz8faXbauX+5v3gTt23ADq1cEmv8uXr\n" 
// "AvHRAosZy5Q6XkjEGB5YGV8eAlrwDPGxrancWYaLbumR9YbK+rlmM6pZW87ipxZz\n" 
// "R8srzJmwN0jP41ZL9c8PDHIyh8bwRLtTcm1D9SZImlJnt1ir/md2cXjbDaJWFBM5\n" 
// "TheQuickBrownFrogJumpOverTheLazyDogpTheBoyIsOnTheGirlXyxV3bqxbYo\n" 
// "JDGFoqgCWjBH4d1QB7wCCZAA62RjYJsWvIjJEubSfZGL+T0yjWW06XyxV3bqxbYo\n" 
// "Ob8VZRzI9neWagqNdwvYkQsEjgfbKbYK7p2CNTUQ\n" 
// "-----END CERTIFICATE-----\n";

// WiFiClientSecure object to establish TLS connection
WiFiClientSecure client;

String host = "demo.thingsboard.io";
String path = "/api/v1/s6njYMwg35Nue85vI1Vg/telemetry";
String userID = "Tester";
String apiKey = "AIzaSyDoEx2kaGz3PxwbI9T7ccTSg5xjdw8Nw8Q";
String postdata = "";

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(115200);
  delay(100);

  Serial.print("Attempting to connect to SSID: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  // attempt to connect to Wifi network:
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    // wait 1 second for re-trying
    delay(1000);
  }

  Serial.print("\nConnected to ");
  Serial.println(ssid);

  // client.setCACert(root_ca);

  Serial.println("\nStarting connection to server...");
  String sjson = "{\"distance\":\"31.49\",\"latitude\":\"16\",\"longitude\":\"102.819685\"}";
  postdata = "id=" + userID + "&api_key=" + apiKey + "&sensor=" + sjson;
    
  if (client.connect(host.c_str(), 443)) {
      client.println("POST " + path + " HTTP/1.1");
      client.println("Host: " + host);
      client.println("User-Agent: ESP");
      client.println("Connection: close");
      client.println("Content-Type: application/x-www-form-urlencoded");
      client.print("Content-Length: ");
      client.println(postdata.length());
      client.println();
      client.println(postdata);

      // Waiting for server response
      unsigned long timeout = millis();
      while (client.available() == 0) {
        if (millis() - timeout > 5000) {
          client.stop();
          Serial.println(">>> Client Timeout !");
          return;
        }
      }         

      String header = "";
      while (client.connected()) {
          String line = client.readStringUntil('\n'); // HTTP headers
          if (line != "\r") {
              header += line;
          } else {
              break;
          }
      }

      String payload = "No payload"; // Payload first row
      while (client.available() > 0) {
          payload = client.readStringUntil('\n');
      }
      if (payload.indexOf("OK") > -1) { 
         Serial.println("Data were sent successfully");
      } 
      Serial.println(payload);
  } else {
      Serial.println("Cannot connect to server");
  }
  
  client.stop();
}

void loop() {
   // Do nothing
}
