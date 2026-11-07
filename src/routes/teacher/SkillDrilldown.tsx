import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import type { StringKey } from '@/i18n'
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
  stemKey: StringKey
  chosen: string
  correct: string
  misconceptionKey: StringKey | null
  attempts: number
}

const questionsBySkill: Record<string, QuestionRecord[]> = {
  'skl-1': [
    {
      id: 'q1',
      stemKey: 'tchQAddThirdQuarter',
      chosen: '2/7',
      correct: '7/12',
      misconceptionKey: 'tchMiscAddedSeparately',
      attempts: 2,
    },
    {
      id: 'q2',
      stemKey: 'tchQAddTwoFifths',
      chosen: '3/5',
      correct: '3/5',
      misconceptionKey: null,
      attempts: 1,
    },
    {
      id: 'q3',
      stemKey: 'tchQAddHalfSixth',
      chosen: '2/8',
      correct: '2/3',
      misconceptionKey: 'tchMiscAddedSeparately',
      attempts: 3,
    },
  ],
  'skl-2': [
    {
      id: 'q4',
      stemKey: 'tchQLcd46',
      chosen: '24',
      correct: '12',
      misconceptionKey: 'tchMiscMultipliedDenoms',
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
        <PageHeader title={t('tchStudentNotFound')} subtitle={t('tchMayHaveMovedClass')} />
        <Button variant="outline" size="sm" asChild>
          <Link to="/teacher/students">{t('navStudents')}</Link>
        </Button>
      </Page>
    )
  }

  const wrong = questions.filter((question) => question.chosen !== question.correct)
  const repeatedKey = wrong[0]?.misconceptionKey

  return (
    <Page>
      <PageHeader
        title={t('tchSkillsSuffix').replace('{n}', fullName(student))}
        subtitle={t('tchSkillDrilldownSubtitle')}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/teacher/students/${student.id}`}>
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              {t('tchBackToStudent')}
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
                    {skill ? (locale === 'ar' ? skill.nameAr : skill.name) : t('colSkill')}
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
          {repeatedKey ? (
            <Card className="border-warning/40">
              <CardContent className="flex flex-wrap items-start gap-3 p-4">
                <Sparkles className="mt-0.5 h-4 w-4 flex-none text-warning" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block text-small font-medium text-foreground">
                    {wrong.length > 1
                      ? t('tchSameMistakeTimes').replace('{n}', String(wrong.length))
                      : t('tchOneMistakeWorth')}
                  </span>
                  <span className="block text-caption text-muted-foreground">
                    {t(repeatedKey)}
                  </span>
                </span>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/teacher/assign">{t('tchAssignReteach')}</Link>
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
                  : t('tchQuestions')}
              </CardTitle>
              <Badge variant="outline">
                {t(questions.length === 1 ? 'tchOneQuestion' : 'tchNQuestions').replace(
                  '{n}',
                  String(questions.length),
                )}
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
                        {t(question.stemKey)}
                      </span>
                      <Badge variant={correct ? 'success' : 'danger'}>
                        {correct ? t('tchCorrect') : t('tchWrong')}
                      </Badge>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-6 text-caption">
                      <span className="text-muted-foreground">
                        {t('tchTheyAnswered')}{' '}
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
                          {t('tchCorrectAnswer')}{' '}
                          <span className="font-semibold text-foreground">{question.correct}</span>
                        </span>
                      ) : null}
                      <span className="text-muted-foreground">
                        {t(question.attempts > 1 ? 'tchNAttempts' : 'tchOneAttempt').replace(
                          '{n}',
                          String(question.attempts),
                        )}
                      </span>
                    </div>

                    {question.misconceptionKey ? (
                      <p className="mt-3 rounded bg-background px-3 py-2 text-caption text-muted-foreground">
                        {t('tchTaggedMisconception').replace('{n}', t(question.misconceptionKey))}
                      </p>
                    ) : null}
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <p className="text-caption text-muted-foreground">{t('tchSkillDrilldownNote')}</p>
        </div>
      </div>
    </Page>
  )
}
