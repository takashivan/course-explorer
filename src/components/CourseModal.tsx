"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import type { Course } from "../types/course"

interface CourseModalProps {
  course: Course
  isOpen: boolean
  onClose: () => void
}

const CourseModal: React.FC<CourseModalProps> = ({ course, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{course.name}</h3>
              <p className="text-sm text-gray-500">
                {course.id} - {course.department}
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">教員</p>
              <p className="text-sm">{course.instructor}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">学期</p>
              <p className="text-sm">{course.term}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">曜日</p>
              <p className="text-sm">{course.days}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">時間</p>
              <p className="text-sm">{course.time}</p>
            </div>
          </div>

          <div className="mt-4 flex space-x-4">
            <div className="flex-1 bg-gray-100 p-3 rounded-md text-center">
              <div className="flex items-center justify-center mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-500 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-bold text-lg">{course.rating.toFixed(1)}</span>
              </div>
              <p className="text-xs text-gray-500">評価</p>
            </div>
            <div className="flex-1 bg-gray-100 p-3 rounded-md text-center">
              <div className="flex items-center justify-center mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bold text-lg">{course.workload.toFixed(1)}</span>
              </div>
              <p className="text-xs text-gray-500">作業量</p>
            </div>
          </div>

          {course.japaneseComments && (
            <div className="mt-4 space-y-1">
              <p className="text-sm font-medium">コメント</p>
              <div className="bg-gray-50 p-3 rounded-md text-sm">{course.japaneseComments}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseModal

