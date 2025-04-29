'use client'
import { useEffect } from 'react'

export default function ActivityCalendar() {
    useEffect(() => {
        const calendar = document.getElementById('activity-calendar')
        if (!calendar) return

        // Clear any existing content
        calendar.innerHTML = ''

        // Sample data - Activity levels for each day (0-3)
        const activityData = []

        // Generate 7 weeks of sample data (49 days)
        for (let i = 0; i < 49; i++) {
            const rand = Math.random()
            if (rand < 0.4) {
                activityData.push(0) // 40% chance of no activity
            } else if (rand < 0.7) {
                activityData.push(1) // 30% chance of low activity
            } else if (rand < 0.9) {
                activityData.push(2) // 20% chance of medium activity
            } else {
                activityData.push(3) // 10% chance of high activity
            }
        }

        // Offset for starting day (to align with the grid)
        let offset = 2 // e.g., if the month starts on Wednesday

        // Add empty cells for offset
        for (let i = 0; i < offset; i++) {
            const emptyDay = document.createElement('div')
            calendar.appendChild(emptyDay)
        }

        // Add activity days
        activityData.forEach((level, index) => {
            const day = document.createElement('div')
            day.className = 'activity-day tooltip'

            // Set color based on activity level
            if (level === 0) {
                day.style.backgroundColor = 'rgba(127, 127, 127, 0.2)'
            } else if (level === 1) {
                day.style.backgroundColor = 'rgba(93, 92, 222, 0.4)'
            } else if (level === 2) {
                day.style.backgroundColor = 'rgba(93, 92, 222, 0.7)'
            } else {
                day.style.backgroundColor = 'rgba(93, 92, 222, 1)'
            }

            // Add tooltip
            const dayNumber = index + 1
            const tooltipText = document.createElement('span')
            tooltipText.className = 'tooltip-text p-2'
            day.appendChild(tooltipText)

            calendar.appendChild(day)
        })
    }, [])

    return (
        <>
            <h3 className="text-lg font-semibold mb-6">NFT Minting Activity</h3>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">October 2023</span>
                    <div className="flex space-x-2">
                        <button className="text-sm dark:text-gray-300 text-gray-500">
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button className="text-sm dark:text-gray-300 text-gray-500">
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs dark:text-gray-400 text-gray-500 mb-2">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                </div>

                <div id="activity-calendar" className="grid grid-cols-7 gap-1"></div>
            </div>

            <div className="flex items-center justify-center space-x-3 text-xs">
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-500 opacity-30 rounded-sm mr-1"></div>
                    <span>0</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary opacity-40 rounded-sm mr-1"></div>
                    <span>1-5</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary opacity-70 rounded-sm mr-1"></div>
                    <span>6-10</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary rounded-sm mr-1"></div>
                    <span>10+</span>
                </div>
            </div>
        </>
    )
}