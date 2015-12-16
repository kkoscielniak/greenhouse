// biblioteki
#include "DHT.h"
#include "etherShield.h"
#include "ETHER_28J60.h"
#include "Timers.h"

#define DHTPIN A0   // pin do którego podłączyliśmy dane z czujnika DHT11
#define DHTTYPE DHT11

ETHER_28J60 e;
//Timers<1> timer;

//deklaracje związane z komunikacją
static uint8_t mac[6] = {0x54, 0x55, 0x58, 0x10, 0x00, 0x24};
static uint8_t ip[4] = {192, 168, 1, 141};
static uint16_t port = 80;


// deklaracja wyjść
int heat = 4; //ogrzewania
int light [] = {5, 6}; //oświetlenia
int pump = 7; //pompa wody
int fan [] = {2, 3, 8, 9, 18, 19}; //wentylatory


// parametry regulowane
int light_power = 50; //moc oświetlenia
int m_light = 50; //zmienna pomocnicza oświetlenia
int p_delay = 3000; //czas pompowania wody
int p = 2.55;  // mnożnik procentowy dla wyjść PWM

int T_hist = 4; //histereza temperatury - ustawiana programowo
int T_set = 40; //temeratura nastawiona
int T_max = 45; // temperatura maksymalna - ustawiana programowo


// zmienne pomocnicze
bool H = 1; //ogrzewanie
bool L = 0; //oświetlenia
bool F = 0; //wentylacja


// czujniki
float photores = 0;
DHT dht(DHTPIN, DHTTYPE);

/*
void pump_on()
{
  digitalWrite(pump, HIGH);
}

*/

void setup()
{
  e.setup(mac, ip, port);

  Serial.begin(57600); // inicjacja połączenia szeregowego
  Serial.println("");
  Serial.println("");
  Serial.println("GREENHOUSE REMOTE");
  Serial.println("");
  delay(3000);


  pinMode(heat, OUTPUT);
  pinMode(pump, OUTPUT);
  for (int j = 0; j < 6; j++)
    pinMode(fan[j], OUTPUT);
  for (int i = 0; i < 2; i++)
    pinMode(light[i], OUTPUT);

  dht.begin();
}


void loop()
{

  float hum = dht.readHumidity(); // odczyt wilgotności
  float temp = dht.readTemperature(); // odczyt temperatury

  photores = analogRead(1);
  float light_measure = map(photores, 0, 1023, 0, 100);

  int X = 0; // zmienna dla switch
  int PT;

  char* params;


  if (params = e.serviceRequest())
  {
//    e.print("<H1>GREENHOUSE REMOTE<br/></H1>");

    if (strcmp(params, "heat") == 0)
      X = 1;

    if (strcmp(params, "heat_up") == 0)
      X= 11;

    if (strcmp(params, "heat_down") == 0)
      X= 12;

    if (strcmp(params, "p_heat") == 0)
    {
      e.print("<body>");
      e.print(T_set);
      e.print("</body>");
    }

    if (strcmp(params, "pump") == 0)
      X = 2;

    if (strcmp(params, "pump_up") == 0)
      X = 21;

    if (strcmp(params, "pump_down") == 0)
      X = 22;

    if (strcmp(params, "p_pump") == 0)
    {
      PT=p_delay/1000;
      e.print("<body>");
      e.print(PT);
      e.print("</body>");
    }

    if (strcmp(params, "light") == 0)
      X = 3;

    if (strcmp(params, "light_up") == 0)
      X = 31;

    if (strcmp(params, "light_down") == 0)
      X = 32;

    if (strcmp(params, "p_light") == 0)
    {
      e.print("<html>");
      e.print("<body>");
      e.print(light_power);
      e.print("</body>");
      e.print("</html>");
    }

    if (strcmp(params, "p2_light") == 0)
    {
      e.print("<body>");
      e.print(L);
      e.print("</body>");
    }

    if (strcmp(params, "temp") == 0)
    {
      e.print("<body>");
      e.print(temp);
      e.print("</body>");
    }

    if (strcmp(params, "hum") == 0)
    {
      e.print("<body>");
      e.print(hum);
      e.print("</body>");
    }

    if (strcmp(params, "light_measure") == 0)
    {
      e.print("<body>");
      e.print(light_measure);
      e.print("</body>");
    }

    e.respond();
  }

  long p_time = millis() + p_delay;

  switch (X)
  {
    case 1:
      if (H == 1)
        digitalWrite(heat, HIGH);

      if (H == 0)
        digitalWrite(heat, LOW);

      H = !H;

      break;

    case 11:
      T_set=T_set+1;

      if(T_set>=T_max)
        T_set=T_max;

      break;

    case 12:
      T_set=T_set-1;

      if(T_set<=0)
        T_set=0;

      break;

    case 2:
      //timer.process();
      while (millis() <= p_time)
      digitalWrite(pump, HIGH);

      digitalWrite(pump, LOW);
      break;

    case 21:
      p_delay = p_delay + 1000;
      break;

    case 22:
      p_delay = p_delay - 1000;
      break;

    case 3:
      if (L == 1)
        light_power = m_light;
      if (L == 0)
        light_power = 0;

      for (int i = 0; i < 2; i++)
        analogWrite(light[i], light_power * p);

      L = !L;

      break;

    case 31:
      light_power = light_power + 25;
      m_light = light_power;

      if (light_power >= 100)
        light_power = 100;

      break;

    case 32:
      light_power = light_power - 25;
      m_light = light_power;

      if (light_power <= 0)
        light_power = 0;

      break;

    default:
      break;
  }

      for (int j = 0; j < 6; j++)
        digitalWrite(fan[j], HIGH);

      for (int i = 0; i < 2; i++)
        analogWrite(light[i], light_power * p);


  if (temp >= T_set || temp >= T_max)
    digitalWrite(heat, LOW);

  if (temp <= (T_set-T_hist))
    digitalWrite(heat, HIGH);

  if(temp <= (T_set-T_hist))
  {
    for (int j = 0; j < 6; j++)
      digitalWrite(fan[j], LOW);
  }

    if(temp >= (T_set+T_hist) || temp >= (T_max))
  {
    for (int j = 0; j < 6; j++)
      digitalWrite(fan[j], HIGH);
  }

  // pomiar czasu pracy mikrokontrolera
  long work_time = millis() - 5000;

  if (work_time % 1000 == 0)
  {
    if (isnan(hum) || isnan(temp))
    {
      digitalWrite(heat, LOW);
      Serial.println("BLAD CZUJNIKA TEMPERATURY!!!");
      Serial.println("");
      Serial.println("Ogrzewanie zostalo wylaczone!");
      Serial.println("");
      Serial.println("Prosze skontaktowac sie z serwisem");
      Serial.println("");
      Serial.println("");
    }

    else
    {
      Serial.print(work_time / 1000);
      Serial.println(" sekunda pomiaru");

      // DHT11
      Serial.print("Temperatura: ");
      Serial.print(temp);
      Serial.print(" *C     ");
      Serial.print("Wilgotnosc: ");
      Serial.print(hum);
      Serial.print(" %     ");

      // pomiar swiatla
      Serial.print("Natezenie swiatla: ");
      Serial.print(light_measure);
      Serial.println(" %");
      Serial.println("");

    }
  }
}
