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

const builtTypes = [
  'True or false',
  'Multiple choice',
  'Short answer',
  'Essay',
  'Drag and drop into text',
  'Drag and drop onto image',
  'Freehand drawing',
  'Image sequencing',
  'Multiple hotspots',
  'Numerical',
  'Fill in the blanks',
  'Select correct words',
  'Text sequencing',
  'Fill in the blanks on image',
  'Highlight correct words',
  'Record audio',
  'Text classification',
  'Image classification',
  'Matching',
  'Crossword',
]

const plannedTypes = [
  'Dropdown',
  'Speak the words',
  'Dialog cards',
  'Memory game',
  'Word search',
  'AI chat',
  'Course presentation',
  'Interactive video',
]

interface Question {
  id: string
  stem: string
  type: string
  skillId: string
  difficulty: 'Foundation' | 'Core' | 'Stretch'
  usedTimes: number
  source: 'York Press' | 'Mine'
}

const questions: Question[] = [
  {
    id: 'qb-1',
    stem: '1/3 + 1/4 =',
    type: 'Numerical',
    skillId: 'skl-1',
    difficulty: 'Core',
    usedTimes: 14,
    source: 'York Press',
  },
  {
    id: 'qb-2',
    stem: 'Which pair has a common denominator of 12?',
    type: 'Multiple choice',
    skillId: 'skl-2',
    difficulty: 'Core',
    usedTimes: 9,
    source: 'York Press',
  },
  {
    id: 'qb-3',
    stem: 'Drag each fraction onto the right place on the number line',
    type: 'Drag and drop onto image',
    skillId: 'skl-5',
    difficulty: 'Stretch',
    usedTimes: 4,
    source: 'York Press',
  },
  {
    id: 'qb-4',
    stem: 'Explain why 2/6 and 1/3 are the same amount',
    type: 'Essay',
    skillId: 'skl-1',
    difficulty: 'Stretch',
    usedTimes: 2,
    source: 'Mine',
  },
  {
    id: 'qb-5',
    stem: 'The place value of 7 in 4,721 is',
    type: 'Multiple choice',
    skillId: 'skl-3',
    difficulty: 'Foundation',
    usedTimes: 21,
    source: 'York Press',
  },
  {
    id: 'qb-6',
    stem: 'Record yourself reading the number 3,408 aloud',
    type: 'Record audio',
    skillId: 'skl-3',
    difficulty: 'Foundation',
    usedTimes: 3,
    source: 'Mine',
  },
]

const rubrics = [
  {
    id: 'rb-1',
    name: 'Mathematical working, 20 marks',
    rows: ['Method is correct', 'Working is shown', 'Answer and units'],
    sharedWith: 'Grade 6 team',
  },
  {
    id: 'rb-2',
    name: 'Short written explanation, 10 marks',
    rows: ['Uses the right vocabulary', 'Reasoning is complete', 'Clear to read'],
    sharedWith: 'Only me',
  },
]

export function TeacherQuestionBank() {
  const { t, locale } = useLocale()
  const [query, setQuery] = useState('')
  const [source, setSource] = useState<'all' | 'York Press' | 'Mine'>('all')

  const rows = useMemo(
    () =>
      questions
        .filter((question) => (source === 'all' ? true : question.source === source))
        .filter((question) =>
          query ? question.stem.toLowerCase().includes(query.toLowerCase()) : true,
        ),
    [query, source],
  )

  return (
    <Page>
      <PageHeader
        title={t('navQuestionBank')}
        subtitle="Questions you can reuse, and the rubrics you mark with"
        actions={
          <Button variant="accent" size="sm" asChild>
            <Link to="/teacher/question-bank/new">
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Create a quiz
            </Link>
          </Button>
        }
      />

      <Tabs defaultValue="questions">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="rubrics">Rubrics</TabsTrigger>
          <TabsTrigger value="types">Question types</TabsTrigger>
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
                  {(['all', 'York Press', 'Mine'] as const).map((item) => (
                    <Button
                      key={item}
                      variant={source === item ? 'outline' : 'ghost'}
                      size="sm"
                      onClick={() => setSource(item)}
                    >
                      {item === 'all' ? 'All questions' : item}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="-mx-4 -mb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>{t('colSkill')}</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead className="text-end">Used</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((question) => {
                      const skill = skills.find((item) => item.id === question.skillId)
                      return (
                        <TableRow key={question.id}>
                          <TableCell className="max-w-[320px] font-medium text-foreground">
                            {question.stem}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{question.type}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {skill ? (locale === 'ar' ? skill.nameAr : skill.name) : '—'}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                question.difficulty === 'Stretch'
                                  ? 'warning'
                                  : question.difficulty === 'Foundation'
                                    ? 'neutral'
                                    : 'outline'
                              }
                            >
                              {question.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell className="tabular text-end">{question.usedTimes}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {question.source}
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
                  <CardTitle>{rubric.name}</CardTitle>
                  <Badge variant="outline">{rubric.sharedWith}</Badge>
                </CardHeader>
                <CardContent className="space-y-1.5">
                  {rubric.rows.map((row) => (
                    <div
                      key={row}
                      className="rounded border border-border px-3 py-2 text-small text-foreground"
                    >
                      {row}
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
              <CardTitle>Available now</CardTitle>
              <Badge variant="success">{builtTypes.length} built</Badge>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {builtTypes.map((type) => (
                <Badge key={type} variant="neutral">
                  {type}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Planned</CardTitle>
              <Badge variant="outline">{plannedTypes.length} not built yet</Badge>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {plannedTypes.map((type) => (
                <Badge key={type} variant="outline" className={cn('opacity-60')}>
                  {type}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <p className="text-caption text-muted-foreground">
            Twenty eight question types in total. The planned eight are shown so a teacher never
            goes looking for something that does not exist yet.
          </p>
        </TabsContent>
      </Tabs>
    </Page>
  )
}
