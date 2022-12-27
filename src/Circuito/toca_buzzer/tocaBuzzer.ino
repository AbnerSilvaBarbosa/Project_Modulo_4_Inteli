#include <WiFi.h>
#include <Arduino.h>
#include <WebServer.h>
#include <stdlib.h>
#include <ESPmDNS.h>
#define USE_SERIAL Serial

WebServer server(80);

int buzzer = 48;

void setup_routing() {	 
  server.on("/buzzerOn", buzzerOn);	 
  server.on("/buzzerOff", buzzerOff);	 
  server.begin();	 	 
}

void buzzerOn(){
  tone(buzzer, 2400);
  server.send(200, "text/plain", "buzzer ligado");
}
void buzzerOff(){
  noTone(buzzer);
  server.send(200, "text/plain", "buzzer desligado");
}

void setup(){

  WiFi.mode(WIFI_STA);
  WiFi.begin("Paulo", "pauleradixzz");
  delay(2000);

  while (WiFi.status() != WL_CONNECTED) {
    neopixelWrite(RGB_BUILTIN,RGB_BRIGHTNESS,0,0);
    WiFi.begin("Paulo", "pauleradixzz");
    delay(5000);
  }

  setup_routing();
  Serial.begin(115200);
  Serial.println("OIOIOI");
}


void loop(){
  while (WiFi.status() != WL_CONNECTED) {
    neopixelWrite(RGB_BUILTIN,RGB_BRIGHTNESS,0,0);
    WiFi.begin("Paulo", "pauleradixzz");
    delay(2000);
  }

  while (WiFi.status() == WL_CONNECTED) {
  neopixelWrite(RGB_BUILTIN,0,RGB_BRIGHTNESS,0);
    server.handleClient();
    delay(50);
  }
  
}