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

  // Additional data
  motionDetected: boolean = true; // True if motion is detected
  rainPercentage: number = 70; // Simulated rain percentage
  mood: string = 'smile'; // Can be 'smile', 'sad', or 'neutral'

  constructor() {}

  ngOnInit() {
    this.createTemperatureChart();
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
              type: 'category', // Fix the scale type issue
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
    // Return emoji based on mood
    switch (this.mood) {
      case 'smile': return '😊';
      case 'sad': return '😢';
      case 'neutral': return '😐';
      default: return '❓';
    }
  }
}
