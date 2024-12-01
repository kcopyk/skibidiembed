import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as mqtt from 'mqtt'; // Corrected import


Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sensorData = {
    temperature: [] as number[],
    humidity: [] as number[],
    timestamps: [] as string[]
  };

  motionDetected: boolean = false;
  rainPercentage: number = 0;
  mood: string = 'sad';
  isDarkMode: boolean = false;

  private mqttClient!: mqtt.MqttClient; // Use mqtt.MqttClient
  private mqttUrl = 'ws://broker.hivemq.com:8000/mqtt';
  private topics = {
    temperature: 'sensor/temp',
    humidity: 'sensor/humidity',
    motion: 'sensor/motion',
    rain: 'sensor/rain'
  };

  private chart: Chart | null = null;

  constructor() {}

  ngOnInit() {
    this.checkInitialTheme();
    // this.initMqtt(); // Uncomment after fixing
    // Simulate some mock sensor data for testing the frontend
    this.sensorData = {
      temperature: [22, 23, 24, 25, 26],
      humidity: [45, 50, 55, 60, 65],
      timestamps: ['10:00', '10:05', '10:10', '10:15', '10:20']
    };

    this.motionDetected = true;
    this.rainPercentage = 30;
    this.mood = 'smile';
    this.createTemperatureChart();
  }

  checkInitialTheme() {
    const storedTheme = localStorage.getItem('theme');
    this.isDarkMode = storedTheme === 'dark';
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  initMqtt() {
    this.mqttClient = mqtt.connect(this.mqttUrl); // Correct usage

    this.mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      
      // Subscribe to topics and log if there's an issue
      Object.values(this.topics).forEach((topic) => {
        this.mqttClient.subscribe(topic, (err) => {
          if (err) {
            console.error(`Failed to subscribe to topic: ${topic}`);
          } else {
            console.log(`Successfully subscribed to topic: ${topic}`);
          }
        });
      });
    });

    this.mqttClient.on('message', (topic, message) => {
      const value = message.toString();
      const timestamp = new Date().toLocaleTimeString();
      console.log(`Received message: ${value} from topic: ${topic}`);

      if (topic === this.topics.temperature) {
        console.log(`New Temperature Data: ${value}`);
        this.sensorData.temperature.push(+value);
        this.sensorData.timestamps.push(timestamp);
        this.updateTemperatureChart();
      } else if (topic === this.topics.humidity) {
        console.log(`New Humidity Data: ${value}`);
        this.sensorData.humidity.push(+value);
        this.sensorData.timestamps.push(timestamp);
        this.updateTemperatureChart();
      } else if (topic === this.topics.motion) {
        console.log(`Motion Detected: ${value}`);
        this.motionDetected = value === 'Motion Detected';
      } else if (topic === this.topics.rain) {
        console.log(`Rain Percentage: ${value}`);
        this.rainPercentage = +value;
      }
    });
  }

  createTemperatureChart() {
    const ctx = document.getElementById('temperatureChart') as HTMLCanvasElement;

    if (ctx) {
      console.log('Chart canvas found. Initializing chart...');
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.sensorData.timestamps,
          datasets: [
            {
              label: 'Temperature (°C)',
              data: this.sensorData.temperature,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'Humidity (%)',
              data: this.sensorData.humidity,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              fill: true,
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true, position: 'top' }
          },
          scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Values' } }
          }
        }
      });
    } else {
      console.error('Canvas element not found. Chart cannot be created.');
    }
  }

  updateTemperatureChart() {
    if (this.chart) {
      this.chart.data.labels = this.sensorData.timestamps;
      this.chart.data.datasets[0].data = this.sensorData.temperature;
      this.chart.data.datasets[1].data = this.sensorData.humidity;
      this.chart.update();
    }
  }

  getMoodEmoji(): string {
    switch (this.mood) {
      case 'smile': return '😊';
      case 'sad': return '😢';
      case 'neutral': return '😐';
      default: return '-';
    }
  }
}
