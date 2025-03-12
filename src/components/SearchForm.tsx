"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { getDepartments, getTerms } from "../lib/data"
import type { Course } from "../types/course"

interface SearchFormProps {
  onSearch: (params: any) => void
  courses: Course[]
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, courses }) => {
  const [query, setQuery] = useState("")
  const [department, setDepartment] = useState("")
  const [term, setTerm] = useState("")
  const [departments, setDepartments] = useState<string[]>([])
  const [terms, setTerms] = useState<string[]>([])

  useEffect(() => {
    if (courses.length > 0) {
      setDepartments(getDepartments(courses))
      setTerms(getTerms(courses))
    }
  }, [courses])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({ query, department, term })
  }

  const handleReset = () => {
    setQuery("")
    setDepartment("")
    setTerm("")
    onSearch({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="query" className="block text-sm font-medium text-gray-700">
          キーワード検索
        </label>
        <input
          id="query"
          type="text"
          placeholder="講座名、教員名、コメントで検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            学部
          </label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">すべて</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="term" className="block text-sm font-medium text-gray-700">
            学期
          </label>
          <select
            id="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">すべて</option>
            {terms.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          検索
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          リセット
        </button>
      </div>
    </form>
  )
}

export default SearchForm

