"use client";

import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import type { Course } from "@/types/course";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Star, Clock, Heart } from "lucide-react";
import { useFavorites } from "@/hooks/favorite";
import { Button } from "@/components/ui/button";

Chart.register(...registerables);

interface CourseChartProps {
  courses: Course[];
}

export default function CourseChart({ courses }: CourseChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!chartRef.current) return;

    // 既存のチャートを破棄
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // データポイントの準備
    const data = courses.map((course) => ({
      x: course.workload,
      y: course.rating,
      course: course, // 講座の全データを保持
    }));

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
              text: "Workload(0 is the best)",
              font: {
                size: 14,
                weight: "bold",
              },
            },
            min: 1,
            max: 100,
            ticks: {
              stepSize: 1,
            },
          },
          y: {
            title: {
              display: true,
              text: "Rating(100 is the best)",
              font: {
                size: 14,
                weight: "bold",
              },
            },
            min: 1,
            max: 100,
            ticks: {
              stepSize: 1,
            },
          },
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const dataIndex = elements[0].index;
            const courseData = data[dataIndex].course;
            setSelectedCourse(courseData);
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const point = context.raw as any;
                return [
                  `講座名: ${point.course.name}`,
                  `教員: ${point.course.instructor}`,
                  `評価: ${point.y}`,
                  `作業量: ${point.x}`,
                ];
              },
            },
          },
          legend: {
            display: false,
          },
        },
      },
    });

    // クリーンアップ関数
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [courses]);

  return (
    <>
      <div className="w-full h-80">
        <canvas ref={chartRef}></canvas>
      </div>

      <Dialog
        open={!!selectedCourse}
        onOpenChange={() => setSelectedCourse(null)}>
        {selectedCourse && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle>{selectedCourse.name}</DialogTitle>
                  <DialogDescription>
                    {selectedCourse.id} - {selectedCourse.department}
                  </DialogDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(selectedCourse.id)}>
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(selectedCourse.id)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-500"
                    }`}
                  />
                </Button>
              </div>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">教員</p>
                  <p className="text-sm">{selectedCourse.instructor}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">学期</p>
                  <p className="text-sm">{selectedCourse.term}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">曜日</p>
                  <p className="text-sm">{selectedCourse.days}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">時間</p>
                  <p className="text-sm">{selectedCourse.time}</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex-1 bg-gray-100 p-3 rounded-md text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="font-bold text-lg">
                      {selectedCourse.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">評価</p>
                </div>

                <div className="flex-1 bg-gray-100 p-3 rounded-md text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-5 h-5 text-blue-500 mr-1" />
                    <span className="font-bold text-lg">
                      {selectedCourse.workload.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">作業量</p>
                </div>
              </div>

              {selectedCourse.japaneseComments && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">コメント</p>
                  <div className="bg-gray-50 p-3 rounded-md text-sm">
                    {selectedCourse.japaneseComments}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
