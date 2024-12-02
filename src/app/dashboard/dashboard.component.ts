import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';

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
    motionDetected: [] as boolean[], // Array to store motion detection status over time
    rainPercentage: [] as number[],  // Array to store rain percentage over time
    //mood: [] as string[],           // Array to store mood status over time
    timestamps: [] as string[]
  };

  isDarkMode: boolean = false;

  // private blynkUrl = 'https://sgp1.blynk.cloud/external/api/get';  // Blynk API URL
  // private authToken = 'iARcsUUbGFqPttq42S21ntVZGuqmJ3Us';  // Replace with your Blynk Auth Token
  // private blynkPins = {
  //   temperature: 'V0',  // Virtual Pin for temperature
  //   humidity: 'V1',     // Virtual Pin for humidity
  //   rain: 'V2',         // Virtual Pin for rain percentage
  //   motion: 'V3'        // Virtual Pin for motion detection
  // };

  private chart: Chart | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.checkInitialTheme();
    this.fetchBlynkData();  // Fetch data from Blynk API
    //this.createTemperatureChart();  // Create initial chart
  }

  // Check and apply the initial theme (dark/light mode)
  checkInitialTheme() {
    const storedTheme = localStorage.getItem('theme');
    this.isDarkMode = storedTheme === 'dark';
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    console.log(`Initial theme set to ${this.isDarkMode ? 'dark' : 'light'}.`);
  }

  // Toggle between dark and light mode
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    console.log(`Theme toggled to ${this.isDarkMode ? 'dark' : 'light'}.`);
  }

  // Fetch data from Blynk API
  fetchBlynkData() {
  
    // Fetch temperature data from Blynk (Virtual Pin V0)
    this.http.get(`https://sgp1.blynk.cloud/external/api/get?token=iARcsUUbGFqPttq42S21ntVZGuqmJ3Us&V0`).subscribe((response: any) => {
      const value = response;
      const timestamp = new Date().toLocaleTimeString();
      this.sensorData.temperature.push(value);
      this.sensorData.timestamps.push(timestamp);
      // this.trimData();
      console.log(`Fetched temperature: ${value}°C at ${timestamp}`);
      // this.updateTemperatureChart();  // Update chart with new data
    });

    // Fetch humidity data from Blynk (Virtual Pin V1)
    this.http.get(`https://sgp1.blynk.cloud/external/api/get?token=iARcsUUbGFqPttq42S21ntVZGuqmJ3Us&V1`).subscribe((response: any) => {
      const value = response;      
      const timestamp = new Date().toLocaleTimeString(); 
      this.sensorData.humidity.push(value);
      this.sensorData.timestamps.push(timestamp);
      // this.trimData();
      console.log(`Fetched humidity: ${value}% at ${timestamp}`);
      // this.updateTemperatureChart();  // Update chart with new data
    });

    // Fetch rain data from Blynk (Virtual Pin V2)
    this.http.get(`https://sgp1.blynk.cloud/external/api/get?token=iARcsUUbGFqPttq42S21ntVZGuqmJ3Us&V2`).subscribe((response: any) => {
      const value = response;
      const timestamp = new Date().toLocaleTimeString();
      this.sensorData.rainPercentage.push(value);
      this.sensorData.timestamps.push(timestamp);
      // this.trimData();
      console.log(`Fetched rain percentage: ${value}% at ${timestamp}`);
    });

    // Fetch motion detection data from Blynk (Virtual Pin V3)
    this.http.get(`https://sgp1.blynk.cloud/external/api/get?token=iARcsUUbGFqPttq42S21ntVZGuqmJ3Us&V3`, { responseType: 'text' }).subscribe((response: any) => {
      const value = response.trim();  // Remove extra spaces
      const timestamp = new Date().toLocaleTimeString();
      this.sensorData.motionDetected.push(value === 'Motion Detected');
      this.sensorData.timestamps.push(timestamp);
      // this.trimData();
      console.log(`Fetched motion detection: ${value === 'Motion Detected' ? 'Yes' : 'No'} at ${timestamp}`);
    });
  }

  // trimData() {
  //   const now = new Date();
  //   const fiveMinutesAgo = now.getTime() - (1 * 60 * 1000); // 5 minutes ago in milliseconds
  
  //   // Filter out timestamps older than 5 minutes
  //   const validDataIndices = this.sensorData.timestamps
  //     .map((timestamp, index) => {
  //       const timestampDate = new Date(timestamp).getTime();
  //       return timestampDate > fiveMinutesAgo ? index : -1;
  //     })
  //     .filter(index => index !== -1);
  
  //   // Filter all sensor data arrays to keep only valid data
  //   this.sensorData.timestamps = validDataIndices.map(index => this.sensorData.timestamps[index]);
  //   this.sensorData.temperature = validDataIndices.map(index => this.sensorData.temperature[index]);
  //   this.sensorData.humidity = validDataIndices.map(index => this.sensorData.humidity[index]);
  //   this.sensorData.rainPercentage = validDataIndices.map(index => this.sensorData.rainPercentage[index]);
  //   this.sensorData.motionDetected = validDataIndices.map(index => this.sensorData.motionDetected[index]);
  // }
  

  // Create the initial temperature and humidity chart using Chart.js
  // createTemperatureChart() {
  //   const ctx = document.getElementById('temperatureChart') as HTMLCanvasElement;
  //   if (ctx) {
  //     this.chart = new Chart(ctx, {
  //       type: 'line',
  //       data: {
  //         labels: this.sensorData.timestamps,
  //         datasets: [
  //           {
  //             label: 'Temperature (°C)',
  //             data: this.sensorData.temperature,
  //             borderColor: 'rgba(75, 192, 192, 1)',
  //             backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //             fill: true,
  //             tension: 0.4
  //           },
  //           {
  //             label: 'Humidity (%)',
  //             data: this.sensorData.humidity,
  //             borderColor: 'rgba(153, 102, 255, 1)',
  //             backgroundColor: 'rgba(153, 102, 255, 0.2)',
  //             fill: true,
  //             tension: 0.4
  //           }
  //         ]
  //       },
  //       options: {
  //         responsive: true,
  //         plugins: {
  //           legend: { display: true, position: 'top' }
  //         },
  //         scales: {
  //           x: { title: { display: true, text: 'Time' } },
  //           y: { title: { display: true, text: 'Values' } }
  //         }
  //       }
  //     });
  //   } else {
  //     console.error('Canvas element not found. Chart cannot be created.');
  //   }
  // }

  // Update the temperature and humidity chart with new data
  // updateTemperatureChart() {
  //   if (this.chart) {
  //     this.chart.data.labels = this.sensorData.timestamps;
  //     this.chart.data.datasets[0].data = this.sensorData.temperature;
  //     this.chart.data.datasets[1].data = this.sensorData.humidity;
  //     this.chart.update();
  //   }
  // }

  // Get the most recent mood emoji
  // getMoodEmoji(): string {
  //   const currentMood = this.sensorData.mood[this.sensorData.mood.length - 1]; // Get the latest mood
  //   switch (currentMood) {
  //     case 'smile': return '😊';
  //     case 'sad': return '😢';
  //     case 'neutral': return '😐';
  //     default: return '-';
  //   }
  // }
}
