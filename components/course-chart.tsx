"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import type { Course } from "@/types/course"

Chart.register(...registerables)

interface CourseChartProps {
  courses: Course[]
}

export default function CourseChart({ courses }: CourseChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // 既存のチャートを破棄
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // データポイントの準備
    const data = courses.map((course) => ({
      x: course.workload,
      y: course.rating,
      id: course.id,
      name: course.name,
      instructor: course.instructor,
    }))

    // チャートの作成
    chartInstance.current = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "講座評価と作業量",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: "作業量 (低 → 高)",
              font: {
                size: 14,
                weight: "bold",
              },
            },
            min: 1,
            max: 5,
            ticks: {
              stepSize: 1,
            },
          },
          y: {
            title: {
              display: true,
              text: "評価 (低 → 高)",
              font: {
                size: 14,
                weight: "bold",
              },
            },
            min: 1,
            max: 5,
            ticks: {
              stepSize: 1,
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const point = context.raw as any
                return [
                  `ID: ${point.id}`,
                  `講座名: ${point.name}`,
                  `教員: ${point.instructor}`,
                  `評価: ${point.y}`,
                  `作業量: ${point.x}`,
                ]
              },
            },
          },
          legend: {
            display: false,
          },
          annotation: {
            annotations: {
              xLine: {
                type: "line",
                xMin: 3,
                xMax: 3,
                borderColor: "rgba(0, 0, 0, 0.3)",
                borderWidth: 1,
                borderDash: [5, 5],
              },
              yLine: {
                type: "line",
                yMin: 3,
                yMax: 3,
                borderColor: "rgba(0, 0, 0, 0.3)",
                borderWidth: 1,
                borderDash: [5, 5],
              },
            },
          },
        },
      },
    })

    // クリーンアップ関数
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [courses])

  return (
    <div className="w-full h-80">
      <canvas ref={chartRef}></canvas>
      <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
        <div className="bg-gray-100 p-2 rounded">
          <strong>右上:</strong> 高評価・高作業量
        </div>
        <div className="bg-gray-100 p-2 rounded">
          <strong>右下:</strong> 低評価・高作業量
        </div>
        <div className="bg-gray-100 p-2 rounded">
          <strong>左上:</strong> 高評価・低作業量
        </div>
        <div className="bg-gray-100 p-2 rounded">
          <strong>左下:</strong> 低評価・低作業量
        </div>
      </div>
    </div>
  )
}

