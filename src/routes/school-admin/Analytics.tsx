import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Download } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import { classesForSchool, courses, DEFAULT_SCHOOL_ID, mastery, skills, standings } from '@/data/seed'

/**
 * The consolidated analytics dashboard.
 *
 * This answers the York-E 2.0 gaps directly: progress per unit, chapter and
 * skill; below, on track and above; drill-down by skill and question; and
 * export. The features sheet flags this screen as needing scope definition,
 * so treat the tab set as a proposal rather than a settled answer.
 */

const bandColours = {
  below: 'hsl(var(--danger))',
  onTrack: 'hsl(var(--success))',
  above: 'hsl(var(--accent))',
}

export function SchoolAdminAnalytics() {
  const { t, locale, dir } = useLocale()
  const schoolClasses = classesForSchool(DEFAULT_SCHOOL_ID)

  const standingById = useMemo(
    () => new Map(standings.map((standing) => [standing.studentId, standing])),
    [],
  )

  const bandsByGrade = useMemo(() => {
    const grades = Array.from(new Set(schoolClasses.map((item) => item.grade))).sort()
    return grades.map((grade) => {
      const ids = schoolClasses
        .filter((item) => item.grade === grade)
        .flatMap((item) => item.studentIds)
      const rows = ids.map((id) => standingById.get(id)).filter(Boolean)
      return {
        grade: `Grade ${grade}`,
        below: rows.filter((row) => (row?.average ?? 0) < 60).length,
        onTrack: rows.filter((row) => (row?.average ?? 0) >= 60 && (row?.average ?? 0) < 85).length,
        above: rows.filter((row) => (row?.average ?? 0) >= 85).length,
      }
    })
  }, [schoolClasses, standingById])

  const unitProgress = useMemo(() => {
    const mathCourse = courses.find((course) => course.id === 'crs-math-g6')
    if (!mathCourse) return []
    return mathCourse.units.map((_unit, index) => ({
      unit: `Unit ${index + 1}`,
      completion: [92, 84, 61, 23][index] ?? 0,
      average: [81, 77, 64, 58][index] ?? 0,
    }))
  }, [])

  const skillRows = useMemo(() => {
    const bySkill = new Map<string, { total: number; count: number; attempts: number }>()
    mastery.forEach((record) => {
      const entry = bySkill.get(record.skillId) ?? { total: 0, count: 0, attempts: 0 }
      entry.total += record.mastery
      entry.count += 1
      entry.attempts += record.attempts
      bySkill.set(record.skillId, entry)
    })
    return Array.from(bySkill.entries())
      .map(([skillId, entry]) => {
        const skill = skills.find((item) => item.id === skillId)
        return {
          skill,
          average: Math.round(entry.total / entry.count),
          learners: entry.count,
          attempts: Math.round(entry.attempts / entry.count),
        }
      })
      .filter((row) => row.skill)
      .sort((a, b) => a.average - b.average)
  }, [])

  const engagement = [
    { week: 'W1', logins: 412, minutes: 38 },
    { week: 'W2', logins: 448, minutes: 41 },
    { week: 'W3', logins: 471, minutes: 44 },
    { week: 'W4', logins: 455, minutes: 40 },
    { week: 'W5', logins: 489, minutes: 46 },
    { week: 'W6', logins: 503, minutes: 49 },
  ]

  const axisProps = {
    tickLine: false,
    axisLine: false,
    tick: { fontSize: 11, fill: 'hsl(var(--muted-foreground))' },
  }

  return (
    <Page>
      <PageHeader
        title={t('navAnalytics')}
        subtitle="Cedar Valley School · Term 2"
        actions={
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5" aria-hidden />
            {t('export')}
          </Button>
        }
      />

      <Tabs defaultValue="progress">
        <TabsList>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="standards">Standards</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-4 pt-5">
          <Card>
            <CardHeader>
              <CardTitle>Below, on track, above, by grade</CardTitle>
              <span className="flex items-center gap-3">
                {([['below', 'Below'], ['onTrack', 'On track'], ['above', 'Above']] as const).map(
                  ([key, label]) => (
                    <span key={key} className="flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-sm"
                        style={{ background: bandColours[key] }}
                      />
                      <span className="text-caption text-muted-foreground">{label}</span>
                    </span>
                  ),
                )}
              </span>
            </CardHeader>
            <CardContent>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {/* barSize capped: three grades across a wide card otherwise
                      gives bars so fat they read as blocks of colour. */}
                  <BarChart
                    data={bandsByGrade}
                    barSize={64}
                    margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="grade" reversed={dir === 'rtl'} {...axisProps} />
                    <YAxis orientation={dir === 'rtl' ? 'right' : 'left'} {...axisProps} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 6,
                        border: '1px solid hsl(var(--border))',
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="below" stackId="a" fill={bandColours.below} />
                    <Bar dataKey="onTrack" stackId="a" fill={bandColours.onTrack} />
                    <Bar dataKey="above" stackId="a" fill={bandColours.above} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress by unit, Mathematics Grade 6</CardTitle>
              <Badge variant="outline">Drill down to chapter and skill</Badge>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead className="w-1/3">{t('colCompletion')}</TableHead>
                    <TableHead className="text-end">{t('colAverage')}</TableHead>
                    <TableHead>{t('colStatus')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unitProgress.map((row) => (
                    <TableRow key={row.unit}>
                      <TableCell className="font-medium text-foreground">{row.unit}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-3">
                          <span className="h-1.5 w-full max-w-[180px] overflow-hidden rounded-full bg-muted">
                            <span
                              className="block h-full rounded-full bg-foreground"
                              style={{ width: `${row.completion}%` }}
                            />
                          </span>
                          <span className="tabular text-caption text-muted-foreground">
                            {row.completion}%
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="tabular text-end">{row.average}%</TableCell>
                      <TableCell>
                        {row.average >= 75 ? (
                          <Badge variant="success">{t('onTrack')}</Badge>
                        ) : row.average >= 62 ? (
                          <Badge variant="warning">{t('watch')}</Badge>
                        ) : (
                          <Badge variant="danger">{t('atRisk')}</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="pt-5">
          <Card>
            <CardHeader>
              <CardTitle>Mastery by skill, weakest first</CardTitle>
              <Badge variant="outline">Click a skill to see the questions</Badge>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('colSkill')}</TableHead>
                    <TableHead className="w-1/3">{t('colMastery')}</TableHead>
                    <TableHead className="text-end">Learners</TableHead>
                    <TableHead className="text-end">Attempts each</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {skillRows.map((row) => (
                    <TableRow key={row.skill!.id} className="cursor-pointer">
                      <TableCell className="font-medium text-foreground">
                        {locale === 'ar' ? row.skill!.nameAr : row.skill!.name}
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-3">
                          <span className="h-1.5 w-full max-w-[180px] overflow-hidden rounded-full bg-muted">
                            <span
                              className={cn(
                                'block h-full rounded-full',
                                row.average < 55
                                  ? 'bg-danger'
                                  : row.average < 70
                                    ? 'bg-warning'
                                    : 'bg-success',
                              )}
                              style={{ width: `${row.average}%` }}
                            />
                          </span>
                          <span className="tabular text-caption text-muted-foreground">
                            {row.average}%
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="tabular text-end">{row.learners}</TableCell>
                      <TableCell className="tabular text-end">{row.attempts}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="pt-5">
          <Card>
            <CardHeader>
              <CardTitle>Logins and time on task</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagement} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" reversed={dir === 'rtl'} {...axisProps} />
                    <YAxis orientation={dir === 'rtl' ? 'right' : 'left'} {...axisProps} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 6,
                        border: '1px solid hsl(var(--border))',
                        fontSize: 12,
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                      align={dir === 'rtl' ? 'right' : 'left'}
                    />
                    <Line
                      type="monotone"
                      dataKey="logins"
                      name="Logins"
                      stroke="hsl(var(--foreground))"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="minutes"
                      name="Minutes per learner"
                      stroke="hsl(var(--success))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standards" className="pt-5">
          <Card>
            <CardHeader>
              <CardTitle>Standards coverage</CardTitle>
              <Badge variant="warning">Scope not agreed</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-10 gap-1.5">
                {Array.from({ length: 40 }, (_, index) => {
                  const covered = index < 27
                  const partial = index >= 27 && index < 33
                  return (
                    <span
                      key={index}
                      className={cn(
                        'aspect-square rounded-sm',
                        covered && 'bg-success',
                        partial && 'bg-warning',
                        !covered && !partial && 'bg-muted',
                      )}
                      title={`Standard ${index + 1}`}
                    />
                  )
                })}
              </div>
              <p className="mt-4 text-small text-muted-foreground">
                27 of 40 standards covered, 6 partially, 7 not started. The features sheet marks
                this screen as needing scope definition, so this is a proposal.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Page>
  )
}
