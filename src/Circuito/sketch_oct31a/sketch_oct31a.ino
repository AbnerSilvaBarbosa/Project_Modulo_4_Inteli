#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>
#include <ESPmDNS.h>

int NOISE_PIN = 18;
int BUTTON_PIN = 15;
int LED_YELLOW_PIN = 21;
int LED_RED_PIN = 20;

WebServer server(80);

const char* ssid = "Galaxy A720361";
const char* password = "vmuo9697";

void handleRoot() {
  tone(NOISE_PIN, 2456);
  server.send(200, "text/plain", "Som ativado");
}
void cancelNoiseRoot() {
  noTone(NOISE_PIN);
  server.send(200, "text/plain", "Som desativado");
}
void handleNotFound() {
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
}
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(NOISE_PIN, OUTPUT);
  pinMode(LED_YELLOW_PIN, OUTPUT);
  pinMode(LED_RED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  WiFi.mode(WIFI_STA);  //Optional
  WiFi.begin(ssid, password);
  Serial.println("\nConnecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    digitalWrite(LED_RED_PIN, HIGH);
    delay(500);
    digitalWrite(LED_RED_PIN, LOW);
    delay(500);
    digitalWrite(LED_RED_PIN, HIGH);
    delay(500);
    digitalWrite(LED_RED_PIN, LOW);
    delay(500);
  }
  digitalWrite(LED_RED_PIN, LOW);
  digitalWrite(LED_YELLOW_PIN, HIGH);
  Serial.println("\nConnected to the WiFi network");
  Serial.print("Local ESP32 IP: ");
  Serial.println(WiFi.localIP());
  server.on("/forgot", handleRoot);
  server.on("/cancelForgot", cancelNoiseRoot);
  server.on("/inline", []() {
    server.send(200, "text/plain", "this works as well");
  });
  server.onNotFound(handleNotFound);
  server.begin();
  Serial.println("HTTP server started");
}
void loop() {
  server.handleClient();
  // read the state of the pushbutton value:
  if (WiFi.status() != WL_CONNECTED) {
    digitalWrite(LED_YELLOW_PIN, LOW);
    digitalWrite(LED_RED_PIN, HIGH);
    WiFi.begin(ssid, password);
    Serial.println("\nConnecting");
    delay(1000);
  } else {
    digitalWrite(LED_YELLOW_PIN, HIGH);
    digitalWrite(LED_RED_PIN, LOW);
    if (digitalRead(15) == 0) {
      while (digitalRead(15) == 0) {}
      noTone(BUTTON_PIN);
    }
  }
  //
  delay(100);
  //   // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  //   if (buttonState == HIGH) {
  //     // turn tone on:
  //     tone(NOISE_PIN, 1500, 500);
  //   } else {
  //     // turn tone off:
  //     delay(10000);
  //   }
}