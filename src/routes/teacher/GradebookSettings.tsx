import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Info } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { teacherClasses } from '@/data/teacher'

/**
 * Gradebook settings.
 *
 * The three things Abed named as day one needs: weighting, drop the lowest,
 * and the grading scale. Separated from the gradebook itself because every
 * control here silently rewrites every number on that screen, so it should
 * take a deliberate navigation to reach, and it shows what will change before
 * anything is saved.
 *
 * The scale is set by the school, not the teacher. It is shown here read only
 * with the reason, which is the answer to the support ticket this would
 * otherwise generate.
 */

interface Category {
  id: string
  name: string
  weight: number
  dropLowest: boolean
}

const initialCategories: Category[] = [
  { id: 'cat-quiz', name: 'Quizzes', weight: 30, dropLowest: true },
  { id: 'cat-assign', name: 'Assignments', weight: 40, dropLowest: false },
  { id: 'cat-exam', name: 'End of unit tests', weight: 30, dropLowest: false },
]

export function TeacherGradebookSettings() {
  const { t } = useLocale()
  const [classId, setClassId] = useState(teacherClasses[1]?.id ?? teacherClasses[0].id)
  const [categories, setCategories] = useState(initialCategories)
  const [lateRule, setLateRule] = useState<'none' | 'percent' | 'zero'>('percent')
  const [countUngraded, setCountUngraded] = useState(false)
  const [saved, setSaved] = useState(false)

  const total = categories.reduce((sum, category) => sum + category.weight, 0)
  const balanced = total === 100

  const update = (id: string, patch: Partial<Category>) => {
    setCategories((current) =>
      current.map((category) => (category.id === id ? { ...category, ...patch } : category)),
    )
    setSaved(false)
  }

  return (
    <Page>
      <PageHeader
        title="Gradebook settings"
        subtitle="Weighting, dropped scores and how late work counts"
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/teacher/gradebook">
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              {t('navGradebook')}
            </Link>
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-1 rounded border border-border p-0.5">
        {teacherClasses.map((item) => (
          <Button
            key={item.id}
            variant={item.id === classId ? 'outline' : 'ghost'}
            size="sm"
            onClick={() => setClassId(item.id)}
          >
            {item.name}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weighting</CardTitle>
          <Badge variant={balanced ? 'success' : 'danger'}>{total}%</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-wrap items-center gap-4 rounded border border-border px-4 py-3"
            >
              <span className="min-w-[140px] flex-1 text-small font-medium text-foreground">
                {category.name}
              </span>

              <label className="flex items-center gap-2">
                <span className="text-caption text-muted-foreground">Weight</span>
                <Input
                  type="number"
                  value={category.weight}
                  min={0}
                  max={100}
                  className="h-8 w-20"
                  onChange={(event) =>
                    update(category.id, { weight: Number(event.target.value) || 0 })
                  }
                />
                <span className="text-caption text-muted-foreground">%</span>
              </label>

              <label className="flex items-center gap-2">
                <span className="text-caption text-muted-foreground">Drop the lowest</span>
                <Switch
                  checked={category.dropLowest}
                  onCheckedChange={(checked) => update(category.id, { dropLowest: checked })}
                />
              </label>
            </div>
          ))}

          {!balanced ? (
            <p className="flex items-start gap-2 rounded border border-danger/30 bg-danger-tint px-4 py-3 text-small text-danger">
              <Info className="mt-0.5 h-4 w-4 flex-none" aria-hidden />
              Weights add up to {total}%. They have to total 100% before this can be saved,
              otherwise a student's average is not comparable with anyone else's.
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Late work</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {(
            [
              { key: 'none', label: 'Accept late work at full marks' },
              { key: 'percent', label: 'Deduct 10% per day, to a floor of 50%' },
              { key: 'zero', label: 'Score zero once the assignment closes' },
            ] as const
          ).map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => {
                setLateRule(option.key)
                setSaved(false)
              }}
              className={cn(
                'flex w-full items-center gap-3 rounded border px-4 py-3 text-start text-small transition-colors',
                lateRule === option.key
                  ? 'border-foreground bg-surface text-foreground'
                  : 'border-border text-muted-foreground hover:bg-surface',
              )}
            >
              <span
                className={cn(
                  'grid h-4 w-4 flex-none place-items-center rounded-full border',
                  lateRule === option.key ? 'border-foreground' : 'border-border-strong',
                )}
              >
                {lateRule === option.key ? (
                  <span className="h-2 w-2 rounded-full bg-foreground" aria-hidden />
                ) : null}
              </span>
              {option.label}
            </button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calculation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-center justify-between gap-4 rounded border border-border px-4 py-3">
            <span className="min-w-0 text-small text-foreground">
              Count work that has not been submitted as zero
              <span className="mt-0.5 block text-caption text-muted-foreground">
                Off means an average reflects only what a student has actually handed in, which
                looks kinder mid term but hides a child who has stopped working.
              </span>
            </span>
            <Switch
              checked={countUngraded}
              onCheckedChange={(checked) => {
                setCountUngraded(checked)
                setSaved(false)
              }}
            />
          </label>

          <div className="flex items-center justify-between gap-4 rounded border border-border bg-surface px-4 py-3">
            <span className="min-w-0 text-small text-foreground">
              Grading scale
              <span className="mt-0.5 block text-caption text-muted-foreground">
                Percentage. Set by the school so that reports across classes mean the same thing. A
                school admin can change it.
              </span>
            </span>
            <Badge variant="outline">School setting</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button variant="accent" size="sm" disabled={!balanced} onClick={() => setSaved(true)}>
          Save and recalculate
        </Button>
        {saved ? (
          <span className="text-small text-success">
            Saved. Every average in this class has been recalculated.
          </span>
        ) : (
          <span className="text-small text-muted-foreground">
            Nothing changes until you save. Averages recalculate for this class only.
          </span>
        )}
      </div>
    </Page>
  )
}
