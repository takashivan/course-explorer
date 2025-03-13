"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { getDepartments, getTerms } from "@/lib/data";
import type { Course } from "@/types/course";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SearchFormProps {
  onSearch: (params: any) => void;
  courses: Course[];
}

export default function SearchForm({ onSearch, courses }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [term, setTerm] = useState("");
  const [departments, setDepartments] = useState<string[]>([]);
  const [terms, setTerms] = useState<string[]>([]);

  useEffect(() => {
    if (courses.length > 0) {
      setDepartments(getDepartments(courses));
      setTerms(getTerms(courses));
    }
  }, [courses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // "all"が選択された場合は、そのフィルターを無視
    const searchParams = {
      query,
      department: department === "all" ? "" : department,
      term: term === "all" ? "" : term,
    };

    onSearch(searchParams);
  };

  const handleReset = () => {
    setQuery("");
    setDepartment("");
    setTerm("");
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="query">キーワード検索</Label>
        <Input
          id="query"
          type="text"
          placeholder="講座名、教員名、コメントで検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="department">学部</Label>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger id="department">
              <SelectValue placeholder="学部を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="term">学期</Label>
          <Select value={term} onValueChange={setTerm}>
            <SelectTrigger id="term">
              <SelectValue placeholder="学期を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              {terms.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          検索
        </Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          リセット
        </Button>
      </div>
    </form>
  );
}
