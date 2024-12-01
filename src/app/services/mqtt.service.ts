import { Injectable } from '@angular/core';
import { connect, MqttClient } from 'mqtt';

@Injectable({
  providedIn: 'root',
})
export class MqttService {
  private client: MqttClient;
  private mqttUrl = 'ws://broker.hivemq.com:8000/mqtt'; // WebSocket URL for MQTT Broker
  private topics = {
    temperature: 'sensor/temp',
    humidity: 'sensor/humidity',
    rain: 'sensor/rain',
    motion: 'sensor/motion',
  };

  public sensorData: any = {
    temperature: [],
    humidity: [],
    rain: [],
    motion: [],
  };

  constructor() {
    this.client = connect(this.mqttUrl);

    this.client.on('connect', () => {
      console.log('Connected to MQTT Broker');
      Object.values(this.topics).forEach((topic) => {
        this.client.subscribe(topic, (err) => {
          if (err) {
            console.error(`Failed to subscribe to ${topic}`);
          }
        });
      });
    });

    this.client.on('message', (topic, message) => {
      const msg = message.toString();
      if (topic === this.topics.temperature) {
        this.sensorData.temperature.push({ value: msg, timestamp: new Date() });
      } else if (topic === this.topics.humidity) {
        this.sensorData.humidity.push({ value: msg, timestamp: new Date() });
      } else if (topic === this.topics.rain) {
        this.sensorData.rain.push({ value: msg, timestamp: new Date() });
      } else if (topic === this.topics.motion) {
        this.sensorData.motion.push({ value: msg, timestamp: new Date() });
      }
    });
  }

  getSensorData() {
    return this.sensorData;
  }
}
