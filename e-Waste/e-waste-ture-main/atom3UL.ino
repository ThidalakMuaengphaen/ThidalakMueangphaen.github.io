// #define TRIG_PIN D1  // GPIO5
// #define ECHO_PIN D2  // GPIO4

// void setup() {
//   Serial.begin(115200);
//   pinMode(TRIG_PIN, OUTPUT);
//   pinMode(ECHO_PIN, INPUT);
// }

// void loop() {
//   long duration, distance;

//   // Clear the TRIG_PIN
//   digitalWrite(TRIG_PIN, LOW);
//   delayMicroseconds(2);

//   // Trigger the sensor by setting TRIG_PIN high for 10 microseconds
//   digitalWrite(TRIG_PIN, HIGH);
//   delayMicroseconds(10);
//   digitalWrite(TRIG_PIN, LOW);

//   // Read the ECHO_PIN, the pulse duration corresponds to the distance
//   duration = pulseIn(ECHO_PIN, HIGH);

//   // Calculate the distance (duration / 2) * speed of sound (34300 cm/s) / 1000000 to get cm
//   distance = (duration / 2) * 0.0343;

//   // Print the distance to the Serial Monitor
//   Serial.print("Distance: ");
//   Serial.print(distance);
//   Serial.println(" cm");

//   delay(1000); // Wait a second before next measurement
// }


#define LED_PIN D4
void setup() {
  pinMode(LED_PIN,OUTPUT);    //กำหนด PIN D4 เป็น OUTPUT
}

void loop() {
  Serial.print("Distance: ");
  digitalWrite(LED_PIN,!digitalRead(LED_PIN));     //กำหนด OUTPUT ของ PIN D4
  delay(1000);           //หน่วงเวลา 500ms หรือเท่ากับ 0.5 วินาที
}