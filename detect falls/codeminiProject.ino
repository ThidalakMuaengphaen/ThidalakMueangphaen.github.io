#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <TridentTD_LineNotify.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <Time.h>
#include <Wire.h>
#include <MPU9250_asukiaaa.h>
#include <Adafruit_BMP280.h>

#define MPU9250_ADDRESS 0x68  // I2C address of MPU-9250
#define BMP280_ADDRESS 0x76   // Updated I2C address of BMP280

MPU9250_asukiaaa mpu;
Adafruit_BMP280 bmp;  // I2C communication

// ตัวแปรสำหรับเก็บค่าสูงสุด
float maxAccelX, maxAccelY, maxAccelZ;
float maxGyroX, maxGyroY, maxGyroZ;

// ตัวนับรอบ
int counter = 0;

// Wi-Fi และ Line Notify
const char* ssid = "nuinui";
const char* password = "kku98765";

#define LINE_TOKEN "GFSZEzHFKvLBoURg0RhZtbyOiX64iI5DJLwbH0Ghvqg"

// การตั้งค่าการส่ง Line Notify เมื่อกดปุ่ม
const int touchPin = 14;
int touchState = 0;
int touch_count = 0;

int timezone = 7 * 3600;
int dst = 0;

// พินสำหรับ LED
const int ledPin = 12; // ใช้ GPIO 2 สำหรับควบคุม LED บน ESP32

// ตัวแปรสำหรับการรีเซ็ต touch_count
unsigned long lastTouchTime = 0;  // เก็บเวลาที่กดปุ่มครั้งล่าสุด
const unsigned long touchResetDelay = 10000;  // หน่วงเวลา 3 วินาที

void setup() {
  Serial.begin(115200);
  while (!Serial)
    ;

  Wire.begin();

  // Initialize MPU9250
  mpu.setWire(&Wire);
  mpu.beginAccel();
  mpu.beginGyro();

  // ตรวจสอบการเริ่มต้น MPU9250
  mpu.accelUpdate();
  if (mpu.accelX() == 0 && mpu.accelY() == 0 && mpu.accelZ() == 0) {
    Serial.println("MPU9250 initialization failed or no data!");
    while (1) {}  // หยุดการทำงานหากการเริ่มต้นล้มเหลว
  } else {
    Serial.println("MPU9250 initialized successfully");
  }

  // ตั้งค่า WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");

  // ตั้งค่า Line Token
  LINE.setToken(LINE_TOKEN);

  configTime(timezone, dst, "pool.ntp.org", "time.nist.gov");
  while (!time(nullptr)) {
    delay(1000);
  }

  pinMode(touchPin, INPUT);  // ตั้งค่า GPIO สำหรับ Touch Switch

  // ตั้งค่า LED เป็น OUTPUT
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);  // ปิด LED เริ่มต้น

  // ตั้งค่าค่ามากสุดเริ่มต้น
  resetMaxValues();
}

void loop() {
  // อัปเดตค่าจากเซ็นเซอร์
  mpu.accelUpdate();
  mpu.gyroUpdate();

  float accelX = mpu.accelX();
  float accelY = mpu.accelY();
  float accelZ = mpu.accelZ();

  float gyroX = mpu.gyroX();
  float gyroY = mpu.gyroY();
  float gyroZ = mpu.gyroZ();

  // ตรวจจับการล้ม
  if (abs(accelX) > 2.4 || abs(accelY) > 2.4 || abs(accelZ) > 2.4 || abs(gyroX) > 250 || abs(gyroY) > 250 || abs(gyroZ) > 250) {
    Serial.println("Fall Detected by Accelerometer!");
    sendLineNotification("\nFall Detected by Accelerometer! or Gyroscope!");
  }

  // ตรวจสอบการกดปุ่ม
  touchState = digitalRead(touchPin);
  if (touchState == HIGH) {
    touch_count++;
    lastTouchTime = millis();  // บันทึกเวลาเมื่อกดปุ่ม
    Serial.print("Touch Count: ");
    Serial.println(touch_count);

    if (touch_count >= 3) {
      touch_count = 0;
      sendLineNotification("\nปุ่มฉุกเฉินถูกใช้งาน!");
    }
    delay(1000);  // หน่วงเวลา 1 วินาทีหลังการกดปุ่ม
  }

  // รีเซ็ต touch_count ถ้าผ่านไปเกิน 3 วินาทีหลังจากการกดปุ่มล่าสุด
  if (millis() - lastTouchTime >= touchResetDelay && touch_count > 0) {
    touch_count = 0;
    Serial.println("Touch count reset after 10 seconds.");
  }

  delay(100);  // หน่วงเวลา 100 มิลลิวินาที
}

// ฟังก์ชันรีเซ็ตค่าสูงสุด
void resetMaxValues() {
  maxAccelX = maxAccelY = maxAccelZ = -9999.0;
  maxGyroX = maxGyroY = maxGyroZ = -9999.0;
}

// ฟังก์ชันสำหรับส่งแจ้งเตือนไปยัง Line
void sendLineNotification(String message) {
  time_t now = time(nullptr);
  struct tm* p_tm = localtime(&now);

  // ตรวจสอบและเพิ่มเลข 0 ด้านหน้าหากมีค่าน้อยกว่า 10
  String hour = p_tm->tm_hour < 10 ? "0" + String(p_tm->tm_hour) : String(p_tm->tm_hour);
  String minute = p_tm->tm_min < 10 ? "0" + String(p_tm->tm_min) : String(p_tm->tm_min);
  String TimeNOW = hour + ":" + minute;

  String day = p_tm->tm_mday < 10 ? "0" + String(p_tm->tm_mday) : String(p_tm->tm_mday);
  String month = (p_tm->tm_mon + 1) < 10 ? "0" + String(p_tm->tm_mon + 1) : String(p_tm->tm_mon + 1);
  String DateNOW = day + "/" + month + "/" + String(p_tm->tm_year + 1900);

  // กระพริบ LED เมื่อมีการส่ง Line Notify
  digitalWrite(ledPin, HIGH);   // เปิด LED 
  LINE.notifyPicture("https://www.pngall.com/wp-content/uploads/5/Help-PNG-Free-Download.png");
  LINE.notify(message + "\nDate: " + DateNOW + "\nTime: " + TimeNOW);
  delay(10000);                   // หน่วงเวลา 10000 มิลลิวินาที
  digitalWrite(ledPin, LOW);   // ปิด LED
}
