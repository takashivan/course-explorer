"use client"

import { useState, useEffect } from "react"
import { fetchCourseData } from "./lib/data"
import CourseChart from "./components/CourseChart"
import SearchForm from "./components/SearchForm"
import CourseList from "./components/CourseList"
import type { Course } from "./types/course"

function App() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchCourseData()
        setCourses(data)
        setFilteredCourses(data)
      } catch (err) {
        setError("データの読み込みに失敗しました。")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const handleSearch = (searchParams: any) => {
    let results = [...courses]

    if (searchParams.query) {
      const query = searchParams.query.toLowerCase()
      results = results.filter(
        (course) =>
          course.name.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          (course.japaneseComments && course.japaneseComments.toLowerCase().includes(query)),
      )
    }

    if (searchParams.department && searchParams.department !== "all") {
      results = results.filter((course) => course.department === searchParams.department)
    }

    if (searchParams.term && searchParams.term !== "all") {
      results = results.filter((course) => course.term === searchParams.term)
    }

    setFilteredCourses(results)
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">大学講座情報</h1>

        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">講座検索</h2>
                <SearchForm onSearch={handleSearch} courses={courses} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">評価と作業量の分布</h2>
                <CourseChart courses={filteredCourses} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">講座一覧 ({filteredCourses.length}件)</h2>
              <CourseList courses={filteredCourses} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App

