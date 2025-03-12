"use client"

import { useState } from "react"
import type { Course } from "@/types/course"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Clock } from "lucide-react"

interface CourseListProps {
  courses: Course[]
}

export default function CourseList({ courses }: CourseListProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>講座名</TableHead>
              <TableHead>教員</TableHead>
              <TableHead>学部</TableHead>
              <TableHead className="text-center">評価</TableHead>
              <TableHead className="text-center">作業量</TableHead>
              <TableHead>詳細</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  該当する講座がありません
                </TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.id}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>{course.department}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {course.rating.toFixed(1)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-500 mr-1" />
                      {course.workload.toFixed(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleCourseClick(course)}>
                      詳細
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedCourse && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedCourse.name}</DialogTitle>
              <DialogDescription>
                {selectedCourse.id} - {selectedCourse.department}
              </DialogDescription>
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
                    <span className="font-bold text-lg">{selectedCourse.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-gray-500">評価</p>
                </div>
                <div className="flex-1 bg-gray-100 p-3 rounded-md text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-5 h-5 text-blue-500 mr-1" />
                    <span className="font-bold text-lg">{selectedCourse.workload.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-gray-500">作業量</p>
                </div>
              </div>

              {selectedCourse.japaneseComments && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">コメント</p>
                  <div className="bg-gray-50 p-3 rounded-md text-sm">{selectedCourse.japaneseComments}</div>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

