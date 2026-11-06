import { useState } from 'react'
import { Check } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { DEFAULT_SCHOOL_ID, schools, terms } from '@/data/seed'
import type { GradingScale, Role } from '@/types'

const scaleOptions: Array<{ key: GradingScale; label: string; example: string }> = [
  { key: 'percentage', label: 'Percentage', example: '0 to 100' },
  { key: 'letter', label: 'Letters', example: 'A to F' },
  { key: 'band', label: 'Bands', example: 'Exceeding, Meeting, Approaching, Below' },
]

/** Section 1.3 of the features sheet. Who can do what, across the five roles. */
const permissionRows: Array<{ action: string; allowed: Role[] }> = [
  { action: 'View course content', allowed: ['school-admin', 'coordinator', 'teacher', 'student'] },
  { action: 'Assign an activity', allowed: ['coordinator', 'teacher'] },
  { action: 'Enter and change grades', allowed: ['teacher'] },
  { action: 'Release grades', allowed: ['teacher'] },
  { action: 'See the whole school gradebook', allowed: ['school-admin', 'coordinator'] },
  { action: 'Record attendance', allowed: ['teacher'] },
  { action: 'Create and edit classes', allowed: ['school-admin'] },
  { action: 'Import and remove users', allowed: ['school-admin'] },
  { action: 'Post a school announcement', allowed: ['school-admin', 'coordinator'] },
  { action: 'See a linked child only', allowed: ['parent'] },
  { action: 'Change the grading scale', allowed: ['school-admin'] },
]

const roleColumns: Array<{ key: Role; label: string }> = [
  { key: 'school-admin', label: 'Admin' },
  { key: 'coordinator', label: 'Coordinator' },
  { key: 'teacher', label: 'Teacher' },
  { key: 'student', label: 'Student' },
  { key: 'parent', label: 'Parent' },
]

export function SchoolAdminSettings() {
  const { t } = useLocale()
  const school = schools.find((item) => item.id === DEFAULT_SCHOOL_ID)!
  const schoolTerms = terms.filter((term) => term.schoolId === school.id)
  const [scale, setScale] = useState<GradingScale>(school.gradingScale)

  return (
    <Page>
      <PageHeader title={t('navSettings')} subtitle={school.name} />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">School profile</TabsTrigger>
          <TabsTrigger value="year">Year and terms</TabsTrigger>
          <TabsTrigger value="grading">Grading scale</TabsTrigger>
          <TabsTrigger value="roles">Roles and permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="pt-5">
          <Card>
            <CardHeader>
              <CardTitle>School profile</CardTitle>
            </CardHeader>
            <CardContent className="grid max-w-2xl gap-4 sm:grid-cols-2">
              <Field label="School name" value={school.name} />
              <Field label="City" value={school.city} />
              <Field label="Country" value={school.country} />
              <Field label="Default language" value={school.locale === 'ar' ? 'Arabic' : 'English'} />
              <Field label="Seats" value={`${school.seatsUsed} of ${school.seats}`} readOnly />
              <Field label="Status" value={school.status} readOnly />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="year" className="pt-5">
          <Card>
            <CardHeader>
              <CardTitle>Academic year {school.academicYear}</CardTitle>
              <Button variant="outline" size="sm">
                Add a term
              </Button>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Term</TableHead>
                    <TableHead>Starts</TableHead>
                    <TableHead>Ends</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schoolTerms.map((term) => (
                    <TableRow key={term.id}>
                      <TableCell className="font-medium text-foreground">{term.name}</TableCell>
                      <TableCell className="text-muted-foreground">{term.startsOn}</TableCell>
                      <TableCell className="text-muted-foreground">{term.endsOn}</TableCell>
                      <TableCell>
                        {term.current ? <Badge variant="success">Current</Badge> : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grading" className="pt-5">
          <Card>
            <CardHeader>
              <CardTitle>Grading scale</CardTitle>
              <Badge variant="outline">Set once per school</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="max-w-[72ch] text-small text-muted-foreground">
                Grades are stored as a percentage. The scale only changes how they are displayed,
                so switching it never rewrites a mark.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {scaleOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setScale(option.key)}
                    className={cn(
                      'flex flex-col items-start gap-1 rounded border p-4 text-start transition-colors',
                      scale === option.key
                        ? 'border-foreground bg-surface'
                        : 'border-border hover:bg-surface',
                    )}
                  >
                    <span className="flex w-full items-center justify-between gap-2">
                      <span className="text-body font-semibold text-foreground">{option.label}</span>
                      {scale === option.key ? (
                        <Check className="h-4 w-4 text-foreground" aria-hidden />
                      ) : null}
                    </span>
                    <span className="text-caption text-muted-foreground">{option.example}</span>
                  </button>
                ))}
              </div>
              <p className="text-caption text-muted-foreground">
                Al Noor in Dubai uses letters and Rawabi in Amman uses bands, which is why this is
                per school rather than per platform.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="pt-5">
          <Card>
            <CardHeader>
              <CardTitle>Roles and permissions</CardTitle>
              <Badge variant="outline">Read only in the MVP</Badge>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    {roleColumns.map((column) => (
                      <TableHead key={column.key} className="text-center">
                        {column.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissionRows.map((row) => (
                    <TableRow key={row.action}>
                      <TableCell className="font-medium text-foreground">{row.action}</TableCell>
                      {roleColumns.map((column) => (
                        <TableCell key={column.key} className="text-center">
                          {row.allowed.includes(column.key) ? (
                            <Check className="mx-auto h-4 w-4 text-success" aria-hidden />
                          ) : (
                            <span className="text-muted-foreground">·</span>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Page>
  )
}

function Field({
  label,
  value,
  readOnly,
}: {
  label: string
  value: string
  readOnly?: boolean
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-small font-medium text-foreground">{label}</span>
      {readOnly ? (
        <span className="flex h-10 items-center rounded border border-border bg-surface px-3 text-small capitalize text-muted-foreground">
          {value}
        </span>
      ) : (
        <Input defaultValue={value} />
      )}
    </label>
  )
}
