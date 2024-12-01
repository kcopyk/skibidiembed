import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Simulated sensor data for demo purposes
  sensorData = {
    temperature: [22, 23, 25, 26, 27],
    humidity: [55, 60, 62, 58, 56],
    timestamps: ['10:00', '11:00', '12:00', '13:00', '14:00']
  };

  motionDetected: boolean = true;
  rainPercentage: number = 70;
  mood: string = 'smile';
  isDarkMode: boolean = false;

  constructor() {}

  ngOnInit() {
    this.createTemperatureChart();
  }

  toggleDarkMode() {
    // Toggle the dark mode class on the body element
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode'); // Apply dark mode
    } else {
      document.body.classList.remove('dark-mode'); // Remove dark mode
    }
  }
  

  createTemperatureChart() {
    const ctx = document.getElementById('temperatureChart') as HTMLCanvasElement;
    
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.sensorData.timestamps, // X-axis labels (time)
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
            legend: {
              display: true,
              position: 'top'
            }
          },
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Time'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Values'
              }
            }
          }
        }
      });
    } else {
      console.error('Canvas element not found');
    }
  }    

  getMoodEmoji(): string {
    switch (this.mood) {
      case 'smile': return '😊';
      case 'sad': return '😢';
      case 'neutral': return '😐';
      default: return '😊';
    }
  }
}
