import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, GripVertical, Plus, Sparkles, Trash2 } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { skills } from '@/data/seed'

/**
 * Create a quiz.
 *
 * Teachers build quizzes between lessons, so the fastest route is pulling
 * questions that already exist rather than writing new ones. The bank is the
 * left column and writing from scratch is the smaller action, which is the
 * opposite of how most authoring tools are laid out.
 *
 * Every question carries its skill tag into the quiz, which is what makes the
 * results readable on the drill down screen afterwards.
 */

interface Draft {
  id: string
  stem: string
  type: string
  marks: number
  skillId: string
}

const bank: Draft[] = [
  { id: 'b1', stem: '1/3 + 1/4 =', type: 'Numerical', marks: 2, skillId: 'skl-1' },
  {
    id: 'b2',
    stem: 'Which pair has a common denominator of 12?',
    type: 'Multiple choice',
    marks: 2,
    skillId: 'skl-2',
  },
  {
    id: 'b3',
    stem: 'Drag each fraction onto the number line',
    type: 'Drag and drop onto image',
    marks: 4,
    skillId: 'skl-5',
  },
  {
    id: 'b4',
    stem: 'Explain why 2/6 and 1/3 are the same amount',
    type: 'Essay',
    marks: 5,
    skillId: 'skl-1',
  },
  {
    id: 'b5',
    stem: 'The place value of 7 in 4,721 is',
    type: 'Multiple choice',
    marks: 1,
    skillId: 'skl-3',
  },
]

export function TeacherCreateQuiz() {
  const { t, locale } = useLocale()
  const [title, setTitle] = useState('Fractions, end of unit check')
  const [chosen, setChosen] = useState<Draft[]>([bank[0], bank[1]])
  const [shuffle, setShuffle] = useState(true)
  const [onePerPage, setOnePerPage] = useState(false)

  const totalMarks = chosen.reduce((sum, question) => sum + question.marks, 0)
  const covered = Array.from(new Set(chosen.map((question) => question.skillId)))

  const add = (question: Draft) => {
    if (chosen.some((item) => item.id === question.id)) return
    setChosen((current) => [...current, question])
  }

  const remove = (id: string) => setChosen((current) => current.filter((item) => item.id !== id))

  return (
    <Page>
      <PageHeader
        title="Create a quiz"
        subtitle={`${chosen.length} questions · ${totalMarks} marks`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/teacher/question-bank">
                <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                {t('navQuestionBank')}
              </Link>
            </Button>
            <Button variant="accent" size="sm" disabled={chosen.length === 0} asChild>
              <Link to="/teacher/assign">Save and assign</Link>
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent className="p-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-small font-medium text-foreground">Title</span>
            <Input value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Questions in this quiz</CardTitle>
            <Badge variant="outline">{totalMarks} marks</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            {chosen.map((question, index) => {
              const skill = skills.find((item) => item.id === question.skillId)
              return (
                <div
                  key={question.id}
                  className="flex items-start gap-3 rounded border border-border p-3"
                >
                  <GripVertical
                    className="mt-0.5 h-4 w-4 flex-none cursor-grab text-muted-foreground"
                    aria-hidden
                  />
                  <span className="tabular mt-0.5 w-5 flex-none text-caption text-muted-foreground">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block text-small font-medium text-foreground">
                      {question.stem}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-1.5">
                      <Badge variant="outline">{question.type}</Badge>
                      <Badge variant="neutral">
                        {skill ? (locale === 'ar' ? skill.nameAr : skill.name) : 'Not tagged'}
                      </Badge>
                      <span className="text-caption text-muted-foreground">
                        {question.marks} marks
                      </span>
                    </span>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Remove"
                    onClick={() => remove(question.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  </Button>
                </div>
              )
            })}

            {chosen.length === 0 ? (
              <p className="py-10 text-center text-small text-muted-foreground">
                Nothing added yet. Pull a question from the bank on the right.
              </p>
            ) : null}

            <div className="flex flex-wrap gap-2 border-t border-border pt-3">
              <Button variant="outline" size="sm">
                <Plus className="h-3.5 w-3.5" aria-hidden />
                Write a new question
              </Button>
              <Button variant="ghost" size="sm">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                Suggest questions for this unit
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>From the bank</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5">
              {bank.map((question) => {
                const used = chosen.some((item) => item.id === question.id)
                return (
                  <button
                    key={question.id}
                    type="button"
                    disabled={used}
                    onClick={() => add(question)}
                    className={cn(
                      'flex w-full items-start gap-2.5 rounded border px-3 py-2.5 text-start transition-colors',
                      used
                        ? 'border-border bg-surface opacity-50'
                        : 'border-border hover:bg-surface',
                    )}
                  >
                    <Plus className="mt-0.5 h-3.5 w-3.5 flex-none text-muted-foreground" aria-hidden />
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block text-small text-foreground">{question.stem}</span>
                      <span className="block text-caption text-muted-foreground">
                        {question.type} · {question.marks} marks
                      </span>
                    </span>
                  </button>
                )
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="flex items-center justify-between gap-3">
                <span className="text-small text-foreground">Shuffle the questions</span>
                <Switch checked={shuffle} onCheckedChange={setShuffle} />
              </label>
              <label className="flex items-center justify-between gap-3">
                <span className="text-small text-foreground">One question per page</span>
                <Switch checked={onePerPage} onCheckedChange={setOnePerPage} />
              </label>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills covered</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {covered.map((id) => {
                const skill = skills.find((item) => item.id === id)
                return (
                  <Badge key={id} variant="neutral">
                    {skill ? (locale === 'ar' ? skill.nameAr : skill.name) : id}
                  </Badge>
                )
              })}
              {covered.length === 0 ? (
                <span className="text-caption text-muted-foreground">Nothing yet</span>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  )
}
