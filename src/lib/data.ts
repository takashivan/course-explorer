import type { Course } from "../types/course"

// スプレッドシートからデータを取得する関数
// 実際の実装では、Google Sheets APIやCSVファイルの読み込みなどを使用します
export async function fetchCourseData(): Promise<Course[]> {
  // この例では、モックデータを返します
  // 実際の実装では、以下のようなAPIリクエストを行います
  // const response = await fetch('https://your-api-endpoint/courses')
  // const data = await response.json()
  // return data

  // モックデータ
  return [
    {
      id: "CS101",
      name: "プログラミング入門",
      instructor: "山田太郎",
      term: "春学期",
      department: "情報科学",
      rating: 4.5,
      workload: 3.2,
      days: "月水",
      time: "10:30-12:00",
      japaneseComments: "初心者にもわかりやすい講義です。課題は多めですが、丁寧に指導してくれます。",
    },
    {
      id: "MATH201",
      name: "線形代数学",
      instructor: "佐藤花子",
      term: "秋学期",
      department: "数学",
      rating: 3.8,
      workload: 4.5,
      days: "火木",
      time: "13:00-14:30",
      japaneseComments: "難しいですが、数学の基礎をしっかり学べます。予習が必須です。",
    },
    {
      id: "ECON101",
      name: "マクロ経済学",
      instructor: "鈴木一郎",
      term: "春学期",
      department: "経済学",
      rating: 4.2,
      workload: 2.8,
      days: "水金",
      time: "15:00-16:30",
      japaneseComments: "実例を交えた説明で理解しやすいです。テスト対策もしっかりしてくれます。",
    },
    {
      id: "HIST301",
      name: "日本近代史",
      instructor: "田中次郎",
      term: "秋学期",
      department: "歴史学",
      rating: 4.7,
      workload: 3.5,
      days: "月水金",
      time: "9:00-10:30",
      japaneseComments: "資料が豊富で、講義も面白いです。レポートの評価は厳しめです。",
    },
    {
      id: "PHYS201",
      name: "力学",
      instructor: "伊藤三郎",
      term: "春学期",
      department: "物理学",
      rating: 3.5,
      workload: 4.8,
      days: "火木",
      time: "10:30-12:00",
      japaneseComments: "内容が難しく、課題も多いですが、物理の基礎を固めるには良い講義です。",
    },
    {
      id: "LIT101",
      name: "日本文学概論",
      instructor: "高橋四郎",
      term: "秋学期",
      department: "文学",
      rating: 4.3,
      workload: 2.5,
      days: "月水",
      time: "13:00-14:30",
      japaneseComments: "古典から現代文学まで幅広く学べます。読書量は多めです。",
    },
    {
      id: "CS301",
      name: "データベース設計",
      instructor: "中村五郎",
      term: "春学期",
      department: "情報科学",
      rating: 4.0,
      workload: 4.0,
      days: "火木",
      time: "15:00-16:30",
      japaneseComments: "実践的な内容で、就職にも役立ちます。グループプロジェクトがあります。",
    },
    {
      id: "BIO101",
      name: "生物学入門",
      instructor: "小林六郎",
      term: "秋学期",
      department: "生物学",
      rating: 3.9,
      workload: 3.0,
      days: "水金",
      time: "9:00-10:30",
      japaneseComments: "実験が多く、楽しく学べます。レポート提出が毎週あります。",
    },
    {
      id: "ART201",
      name: "現代美術論",
      instructor: "松本七子",
      term: "春学期",
      department: "芸術学",
      rating: 4.8,
      workload: 2.2,
      days: "月金",
      time: "16:00-17:30",
      japaneseComments: "美術館見学などがあり、実際の作品に触れる機会が多いです。",
    },
    {
      id: "PSYCH101",
      name: "心理学概論",
      instructor: "渡辺八郎",
      term: "秋学期",
      department: "心理学",
      rating: 4.4,
      workload: 3.3,
      days: "火木",
      time: "10:30-12:00",
      japaneseComments: "身近な例を用いた説明で、初心者でも理解しやすいです。",
    },
    {
      id: "CHEM201",
      name: "有機化学",
      instructor: "斎藤九郎",
      term: "春学期",
      department: "化学",
      rating: 3.2,
      workload: 4.7,
      days: "月水金",
      time: "13:00-14:30",
      japaneseComments: "内容が難しく、予習復習が必須です。実験レポートが大変です。",
    },
    {
      id: "SOC101",
      name: "社会学入門",
      instructor: "加藤十子",
      term: "秋学期",
      department: "社会学",
      rating: 4.1,
      workload: 2.9,
      days: "火木",
      time: "15:00-16:30",
      japaneseComments: "ディスカッションが多く、考える力が身につきます。",
    },
    {
      id: "LANG101",
      name: "英語コミュニケーション",
      instructor: "ジョン・スミス",
      term: "春学期",
      department: "言語学",
      rating: 4.6,
      workload: 3.1,
      days: "月水",
      time: "9:00-10:30",
      japaneseComments: "ネイティブの先生で、実践的な英語が学べます。スピーキングの機会が多いです。",
    },
    {
      id: "PHIL201",
      name: "倫理学",
      instructor: "木村十一郎",
      term: "秋学期",
      department: "哲学",
      rating: 3.7,
      workload: 3.8,
      days: "火木",
      time: "16:00-17:30",
      japaneseComments: "深い内容ですが、現代社会との関連付けがあり興味深いです。",
    },
    {
      id: "CS401",
      name: "人工知能",
      instructor: "山本十二子",
      term: "春学期",
      department: "情報科学",
      rating: 4.9,
      workload: 4.2,
      days: "水金",
      time: "13:00-14:30",
      japaneseComments: "最新の研究内容も含まれており、とても刺激的な講義です。プログラミングの課題が多いです。",
    },
  ]
}

// 学部のリストを取得する関数
export function getDepartments(courses: Course[]): string[] {
  const departments = new Set(courses.map((course) => course.department))
  return Array.from(departments).sort()
}

// 学期のリストを取得する関数
export function getTerms(courses: Course[]): string[] {
  const terms = new Set(courses.map((course) => course.term))
  return Array.from(terms).sort()
}

