'use client'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

export default function CertificateChart() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Certificates Issued',
            data: [42, 55, 49, 65, 57, 60, 70, 91, 82, 85, 90, 100],
            backgroundColor: 'rgba(93, 92, 222, 0.2)',
            borderColor: 'rgba(93, 92, 222, 1)',
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: 'rgba(93, 92, 222, 1)',
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(200, 200, 200, 0.1)',
                },
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(30, 30, 30, 0.8)',
                titleColor: 'rgba(255, 255, 255, 1)',
                bodyColor: 'rgba(255, 255, 255, 0.8)',
                displayColors: false,
                padding: 10,
                cornerRadius: 6
            }
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Certificate Issuance</h3>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm rounded-lg dark:bg-dark-lighter bg-gray-100 dark:text-white">Week</button>
                    <button className="px-3 py-1 text-sm rounded-lg bg-primary text-white">Month</button>
                    <button className="px-3 py-1 text-sm rounded-lg dark:bg-dark-lighter bg-gray-100 dark:text-white">Year</button>
                </div>
            </div>
            <div className="h-[250px]">
                <Line data={data} options={options} />
            </div>
        </div>
    )
}