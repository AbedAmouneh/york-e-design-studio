import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { mastery, skills } from '@/data/seed'
import { fullName, standingById, studentById } from '@/data/teacher'

/**
 * Skill and question drill down.
 *
 * This is the screen that answers why, and it only works because the authoring
 * platform tags every question with a skill and a misconception. The LOM
 * metadata that Esmeralda has been calling a blocker since 7 July is what
 * makes this screen possible, which is worth saying out loud when it is
 * reviewed: without it, this page is an empty promise.
 */

interface QuestionRecord {
  id: string
  stem: string
  chosen: string
  correct: string
  misconception: string
  attempts: number
}

const questionsBySkill: Record<string, QuestionRecord[]> = {
  'skl-1': [
    {
      id: 'q1',
      stem: '1/3 + 1/4 =',
      chosen: '2/7',
      correct: '7/12',
      misconception: 'Added the numerators and denominators separately',
      attempts: 2,
    },
    {
      id: 'q2',
      stem: '2/5 + 1/5 =',
      chosen: '3/5',
      correct: '3/5',
      misconception: '',
      attempts: 1,
    },
    {
      id: 'q3',
      stem: '1/2 + 1/6 =',
      chosen: '2/8',
      correct: '2/3',
      misconception: 'Added the numerators and denominators separately',
      attempts: 3,
    },
  ],
  'skl-2': [
    {
      id: 'q4',
      stem: 'The lowest common denominator of 4 and 6 is',
      chosen: '24',
      correct: '12',
      misconception: 'Multiplied the denominators instead of finding the lowest common multiple',
      attempts: 2,
    },
  ],
}

export function TeacherSkillDrilldown() {
  const { studentId = '' } = useParams()
  const { t, locale } = useLocale()
  const student = studentById(studentId)
  const standing = standingById(studentId)

  const records = mastery
    .filter((record) => record.studentId === studentId)
    .map((record) => ({ record, skill: skills.find((item) => item.id === record.skillId) }))
    .sort((a, b) => a.record.mastery - b.record.mastery)

  const [skillId, setSkillId] = useState(records[0]?.record.skillId ?? 'skl-1')
  const questions = questionsBySkill[skillId] ?? questionsBySkill['skl-1']
  const activeSkill = skills.find((item) => item.id === skillId)

  if (!student || !standing) {
    return (
      <Page>
        <PageHeader title="Student not found" subtitle="They may have moved class." />
        <Button variant="outline" size="sm" asChild>
          <Link to="/teacher/students">{t('navStudents')}</Link>
        </Button>
      </Page>
    )
  }

  const wrong = questions.filter((question) => question.chosen !== question.correct)
  const repeated = wrong[0]?.misconception

  return (
    <Page>
      <PageHeader
        title={`${fullName(student)} · skills`}
        subtitle="Which skill, which question, and what they did instead"
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/teacher/students/${student.id}`}>
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              Back to the student
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>{t('colSkill')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {records.map(({ record, skill }) => (
              <button
                key={record.skillId}
                type="button"
                onClick={() => setSkillId(record.skillId)}
                className={cn(
                  'w-full rounded px-3 py-2 text-start transition-colors',
                  record.skillId === skillId ? 'bg-muted' : 'hover:bg-surface',
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="min-w-0 truncate text-small text-foreground">
                    {skill ? (locale === 'ar' ? skill.nameAr : skill.name) : 'Skill'}
                  </span>
                  <span
                    className={cn(
                      'tabular flex-none text-caption font-semibold',
                      record.mastery < 50
                        ? 'text-danger'
                        : record.mastery < 70
                          ? 'text-warning'
                          : 'text-success',
                    )}
                  >
                    {record.mastery}%
                  </span>
                </span>
                <span className="mt-1.5 block h-1 w-full overflow-hidden rounded-full bg-muted">
                  <span
                    className={cn(
                      'block h-full rounded-full',
                      record.mastery < 50
                        ? 'bg-danger'
                        : record.mastery < 70
                          ? 'bg-warning'
                          : 'bg-success',
                    )}
                    style={{ width: `${record.mastery}%` }}
                  />
                </span>
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          {repeated ? (
            <Card className="border-warning/40">
              <CardContent className="flex flex-wrap items-start gap-3 p-4">
                <Sparkles className="mt-0.5 h-4 w-4 flex-none text-warning" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block text-small font-medium text-foreground">
                    {wrong.length > 1
                      ? `The same mistake, ${wrong.length} times`
                      : 'One mistake worth a conversation'}
                  </span>
                  <span className="block text-caption text-muted-foreground">{repeated}</span>
                </span>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/teacher/assign">Assign the reteach</Link>
                </Button>
              </CardContent>
            </Card>
          ) : null}

          <Card>
            <CardHeader>
              <CardTitle>
                {activeSkill
                  ? locale === 'ar'
                    ? activeSkill.nameAr
                    : activeSkill.name
                  : 'Questions'}
              </CardTitle>
              <Badge variant="outline">
                {questions.length} {questions.length === 1 ? 'question' : 'questions'}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              {questions.map((question) => {
                const correct = question.chosen === question.correct
                return (
                  <div
                    key={question.id}
                    className={cn(
                      'rounded border p-4',
                      correct ? 'border-border' : 'border-danger/30 bg-danger-tint/40',
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-small font-medium text-foreground">
                        {question.stem}
                      </span>
                      <Badge variant={correct ? 'success' : 'danger'}>
                        {correct ? 'Correct' : 'Wrong'}
                      </Badge>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-6 text-caption">
                      <span className="text-muted-foreground">
                        They answered{' '}
                        <span
                          className={cn(
                            'font-semibold',
                            correct ? 'text-success' : 'text-danger',
                          )}
                        >
                          {question.chosen}
                        </span>
                      </span>
                      {!correct ? (
                        <span className="text-muted-foreground">
                          Correct answer{' '}
                          <span className="font-semibold text-foreground">{question.correct}</span>
                        </span>
                      ) : null}
                      <span className="text-muted-foreground">
                        {question.attempts} attempt{question.attempts > 1 ? 's' : ''}
                      </span>
                    </div>

                    {question.misconception ? (
                      <p className="mt-3 rounded bg-background px-3 py-2 text-caption text-muted-foreground">
                        Tagged misconception: {question.misconception}
                      </p>
                    ) : null}
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <p className="text-caption text-muted-foreground">
            The misconception tag comes from the question metadata set in the authoring platform.
            This screen is only as good as that tagging, which is why the metadata work blocks the
            authoring sprint rather than the other way round.
          </p>
        </div>
      </div>
    </Page>
  )
}
