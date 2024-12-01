import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

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
              tension: 0.4 // Smoothing effect on the line
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
}
