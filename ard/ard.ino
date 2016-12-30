#include <SPI.h>
#include <Ethernet.h>

byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
 
// Enter the IP address for Arduino, as mentioned we will use 192.168.0.16
// Be careful to use , insetead of . when you enter the address here
IPAddress ip(127,0,0,1);


String data;

char server[] = "127.0.0.1"; // IMPORTANT: If you are using XAMPP you will have to find out the IP address of your computer and put it here (it is explained in previous article). If you have a web page, enter its address (ie. "www.yourwebpage.com")

// Initialize the Ethernet server library
EthernetClient client;

void setup()
{ 

 
 // Ethernet.begin(mac, ip);
  // Serial.begin starts the serial connection between computer and Arduino
  Serial.begin(9600); 
  sei();// Enable interrupts
  // start the Ethernet connection
  if (Ethernet.begin(mac) == 0)
  {
    Serial.println("Failed to configure Ethernet using DHCP"); 
  } 
    
}

void loop()
{ 
  int s1,s2,s3;
  s1=20;
  s2=39;
  s3=40;
  // Connect to the server (your computer or web page)  
  if (client.connect(server,3001)) 
  {  
      Serial.println("--> connected\n");
      client.print("GET http://localhost:3001/sensor?s1="); // This
      client.print(s1);
      client.print("&s2=");
      client.print(s2); // And this is what we did in the testing section above. We are making a GET request just like we would from our browser but now with live data from the sensor
      client.print("&s3=");
      client.print(s3);
    client.println(" HTTP/1.1"); // Part of the GET request
    client.println("Host: 192.168.137.1:82"); // IMPORTANT: If you are using XAMPP you will have to find out the IP address of your computer and put it here (it is explained in previous article). If you have a web page, enter its address (ie.Host: "www.yourwebpage.com")
    client.println("Connection: close"); // Part of the GET request telling the server that we are over transmitting the message
    client.println(); // Empty line
    client.println(); // Empty line
    client.stop();    // Closing connection to server
  }
  else
  {
     // If Arduino can't connect to the server (your computer or web page)
    Serial.println("--> connection failed\n");
  }
  // Give the server some time to recieve the data and store it. I used 10 seconds here. Be advised when delaying. If u use a short delay, the server might not capture data because of Arduino transmitting new data too soon.
  delay(2000);
  
 }
