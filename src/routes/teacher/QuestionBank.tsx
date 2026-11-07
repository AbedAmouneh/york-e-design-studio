import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useLocale } from '@/lib/i18n'
import type { StringKey } from '@/i18n'
import { cn } from '@/lib/utils'
import { skills } from '@/data/seed'

/**
 * Question bank and rubrics.
 *
 * The question types listed here are the real ones: twenty are built in the
 * authoring platform today and eight are planned. Showing the planned ones
 * greyed rather than hiding them is deliberate, because a teacher who is
 * promised a question type she cannot find loses trust in the whole tool.
 */

const builtTypeKeys = [
  'tchQtTrueFalse',
  'tchQtMultipleChoice',
  'tchQtShortAnswer',
  'tchQtEssay',
  'tchQtDragIntoText',
  'tchQtDragOntoImage',
  'tchQtFreehandDrawing',
  'tchQtImageSequencing',
  'tchQtMultipleHotspots',
  'tchQtNumerical',
  'tchQtFillBlanks',
  'tchQtSelectCorrectWords',
  'tchQtTextSequencing',
  'tchQtFillBlanksImage',
  'tchQtHighlightWords',
  'tchQtRecordAudio',
  'tchQtTextClassification',
  'tchQtImageClassification',
  'tchQtMatching',
  'tchQtCrossword',
] as const

const plannedTypeKeys = [
  'tchQtDropdown',
  'tchQtSpeakWords',
  'tchQtDialogCards',
  'tchQtMemoryGame',
  'tchQtWordSearch',
  'tchQtAiChat',
  'tchQtCoursePresentation',
  'tchQtInteractiveVideo',
] as const

type Difficulty = 'foundation' | 'core' | 'stretch'

const difficultyKey: Record<Difficulty, StringKey> = {
  foundation: 'tchDiffFoundation',
  core: 'tchDiffCore',
  stretch: 'tchDiffStretch',
}

interface Question {
  id: string
  stemKey: StringKey
  typeKey: StringKey
  skillId: string
  difficulty: Difficulty
  usedTimes: number
  source: 'york-press' | 'mine'
}

const questions: Question[] = [
  {
    id: 'qb-1',
    stemKey: 'tchQAddThirdQuarter',
    typeKey: 'tchQtNumerical',
    skillId: 'skl-1',
    difficulty: 'core',
    usedTimes: 14,
    source: 'york-press',
  },
  {
    id: 'qb-2',
    stemKey: 'tchQCommonDenom12',
    typeKey: 'tchQtMultipleChoice',
    skillId: 'skl-2',
    difficulty: 'core',
    usedTimes: 9,
    source: 'york-press',
  },
  {
    id: 'qb-3',
    stemKey: 'tchQDragFractionsLineLong',
    typeKey: 'tchQtDragOntoImage',
    skillId: 'skl-5',
    difficulty: 'stretch',
    usedTimes: 4,
    source: 'york-press',
  },
  {
    id: 'qb-4',
    stemKey: 'tchQExplainEquivalence',
    typeKey: 'tchQtEssay',
    skillId: 'skl-1',
    difficulty: 'stretch',
    usedTimes: 2,
    source: 'mine',
  },
  {
    id: 'qb-5',
    stemKey: 'tchQPlaceValue7',
    typeKey: 'tchQtMultipleChoice',
    skillId: 'skl-3',
    difficulty: 'foundation',
    usedTimes: 21,
    source: 'york-press',
  },
  {
    id: 'qb-6',
    stemKey: 'tchQRecordNumber',
    typeKey: 'tchQtRecordAudio',
    skillId: 'skl-3',
    difficulty: 'foundation',
    usedTimes: 3,
    source: 'mine',
  },
]

const rubrics = [
  {
    id: 'rb-1',
    nameKey: 'tchRubricMathWorking',
    rowKeys: ['tchRubricMethod', 'tchRubricWorking', 'tchRubricAnswerUnits'],
    sharedWithKey: 'tchSharedGrade6',
  },
  {
    id: 'rb-2',
    nameKey: 'tchRubricShortExplanation',
    rowKeys: ['tchRubricVocabulary', 'tchRubricReasoning', 'tchRubricClarity'],
    sharedWithKey: 'tchSharedOnlyMe',
  },
] as const

export function TeacherQuestionBank() {
  const { t, locale } = useLocale()
  const [query, setQuery] = useState('')
  const [source, setSource] = useState<'all' | 'york-press' | 'mine'>('all')

  const rows = useMemo(
    () =>
      questions
        .filter((question) => (source === 'all' ? true : question.source === source))
        .filter((question) =>
          query ? t(question.stemKey).toLowerCase().includes(query.toLowerCase()) : true,
        ),
    [query, source, t],
  )

  const sourceLabel = (key: 'all' | 'york-press' | 'mine') =>
    key === 'all'
      ? t('tchAllQuestions')
      : key === 'york-press'
        ? t('tchSourceYorkPress')
        : t('tchSourceMine')

  return (
    <Page>
      <PageHeader
        title={t('navQuestionBank')}
        subtitle={t('tchQuestionBankSubtitle')}
        actions={
          <Button variant="accent" size="sm" asChild>
            <Link to="/teacher/question-bank/new">
              <Plus className="h-3.5 w-3.5" aria-hidden />
              {t('tchCreateQuiz')}
            </Link>
          </Button>
        }
      />

      <Tabs defaultValue="questions">
        <TabsList>
          <TabsTrigger value="questions">{t('tchQuestions')}</TabsTrigger>
          <TabsTrigger value="rubrics">{t('tchRubrics')}</TabsTrigger>
          <TabsTrigger value="types">{t('tchQuestionTypes')}</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="pt-4">
          <Card>
            <CardContent className="space-y-4 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="w-full max-w-[260px]">
                  <SearchInput
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t('search')}
                  />
                </div>
                <div className="flex items-center gap-1">
                  {(['all', 'york-press', 'mine'] as const).map((item) => (
                    <Button
                      key={item}
                      variant={source === item ? 'outline' : 'ghost'}
                      size="sm"
                      onClick={() => setSource(item)}
                    >
                      {sourceLabel(item)}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="-mx-4 -mb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('tchQuestion')}</TableHead>
                      <TableHead>{t('tchType')}</TableHead>
                      <TableHead>{t('colSkill')}</TableHead>
                      <TableHead>{t('tchDifficulty')}</TableHead>
                      <TableHead className="text-end">{t('tchUsed')}</TableHead>
                      <TableHead>{t('tchSource')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((question) => {
                      const skill = skills.find((item) => item.id === question.skillId)
                      return (
                        <TableRow key={question.id}>
                          <TableCell className="max-w-[320px] font-medium text-foreground">
                            {t(question.stemKey)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {t(question.typeKey)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {skill ? (locale === 'ar' ? skill.nameAr : skill.name) : '—'}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                question.difficulty === 'stretch'
                                  ? 'warning'
                                  : question.difficulty === 'foundation'
                                    ? 'neutral'
                                    : 'outline'
                              }
                            >
                              {t(difficultyKey[question.difficulty])}
                            </Badge>
                          </TableCell>
                          <TableCell className="tabular text-end">{question.usedTimes}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {sourceLabel(question.source)}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rubrics" className="pt-4">
          <div className="grid gap-3 md:grid-cols-2">
            {rubrics.map((rubric) => (
              <Card key={rubric.id}>
                <CardHeader>
                  <CardTitle>{t(rubric.nameKey)}</CardTitle>
                  <Badge variant="outline">{t(rubric.sharedWithKey)}</Badge>
                </CardHeader>
                <CardContent className="space-y-1.5">
                  {rubric.rowKeys.map((rowKey) => (
                    <div
                      key={rowKey}
                      className="rounded border border-border px-3 py-2 text-small text-foreground"
                    >
                      {t(rowKey)}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="types" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('tchAvailableNow')}</CardTitle>
              <Badge variant="success">
                {t('tchNBuilt').replace('{n}', String(builtTypeKeys.length))}
              </Badge>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {builtTypeKeys.map((key) => (
                <Badge key={key} variant="neutral">
                  {t(key)}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('tchPlanned')}</CardTitle>
              <Badge variant="outline">
                {t('tchNNotBuilt').replace('{n}', String(plannedTypeKeys.length))}
              </Badge>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {plannedTypeKeys.map((key) => (
                <Badge key={key} variant="outline" className={cn('opacity-60')}>
                  {t(key)}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <p className="text-caption text-muted-foreground">{t('tchQuestionTypesNote')}</p>
        </TabsContent>
      </Tabs>
    </Page>
  )
}
