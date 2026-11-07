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
import type { GradingScale, Role, School } from '@/types'
import type { StringKey } from '@/i18n'

const scaleOptions: Array<{ key: GradingScale; labelKey: StringKey; exampleKey: StringKey }> = [
  { key: 'percentage', labelKey: 'admScalePercentage', exampleKey: 'admScalePercentageExample' },
  { key: 'letter', labelKey: 'admScaleLetter', exampleKey: 'admScaleLetterExample' },
  { key: 'band', labelKey: 'admScaleBand', exampleKey: 'admScaleBandExample' },
]

/** Section 1.3 of the features sheet. Who can do what, across the five roles. */
const permissionRows: Array<{ actionKey: StringKey; allowed: Role[] }> = [
  {
    actionKey: 'admPermViewContent',
    allowed: ['school-admin', 'coordinator', 'teacher', 'student'],
  },
  { actionKey: 'admPermAssignActivity', allowed: ['coordinator', 'teacher'] },
  { actionKey: 'admPermChangeGrades', allowed: ['teacher'] },
  { actionKey: 'admPermReleaseGrades', allowed: ['teacher'] },
  { actionKey: 'admPermSchoolGradebook', allowed: ['school-admin', 'coordinator'] },
  { actionKey: 'admPermRecordAttendance', allowed: ['teacher'] },
  { actionKey: 'admPermManageClasses', allowed: ['school-admin'] },
  { actionKey: 'admPermManageUsers', allowed: ['school-admin'] },
  { actionKey: 'admPermPostAnnouncement', allowed: ['school-admin', 'coordinator'] },
  { actionKey: 'admPermLinkedChildOnly', allowed: ['parent'] },
  { actionKey: 'admPermChangeScale', allowed: ['school-admin'] },
]

const roleColumns: Array<{ key: Role; labelKey: StringKey }> = [
  { key: 'school-admin', labelKey: 'admRoleAdminShort' },
  { key: 'coordinator', labelKey: 'tabCoordinator' },
  { key: 'teacher', labelKey: 'tabTeacher' },
  { key: 'student', labelKey: 'tabStudent' },
  { key: 'parent', labelKey: 'tabParent' },
]

const schoolStatusKey: Record<School['status'], StringKey> = {
  active: 'admSchoolStatusActive',
  provisioning: 'admSchoolStatusProvisioning',
  suspended: 'admSchoolStatusSuspended',
}

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
          <TabsTrigger value="profile">{t('admTabProfile')}</TabsTrigger>
          <TabsTrigger value="year">{t('admTabYear')}</TabsTrigger>
          <TabsTrigger value="grading">{t('admTabGrading')}</TabsTrigger>
          <TabsTrigger value="roles">{t('admTabRoles')}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="pt-5">
          <Card>
            <CardHeader>
              <CardTitle>{t('admTabProfile')}</CardTitle>
            </CardHeader>
            <CardContent className="grid max-w-2xl gap-4 sm:grid-cols-2">
              <Field label={t('admFieldSchoolName')} value={school.name} />
              <Field label={t('admFieldCity')} value={school.city} />
              <Field label={t('admFieldCountry')} value={school.country} />
              <Field
                label={t('admFieldDefaultLanguage')}
                value={school.locale === 'ar' ? t('admLangArabic') : t('admLangEnglish')}
              />
              <Field
                label={t('admFieldSeats')}
                value={`${school.seatsUsed} ${t('ofTotal')} ${school.seats}`}
                readOnly
              />
              <Field
                label={t('admFieldStatus')}
                value={t(schoolStatusKey[school.status])}
                readOnly
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="year" className="pt-5">
          <Card>
            <CardHeader>
              <CardTitle>{t('admAcademicYear').replace('{n}', school.academicYear)}</CardTitle>
              <Button variant="outline" size="sm">
                {t('admAddTerm')}
              </Button>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('admColTerm')}</TableHead>
                    <TableHead>{t('admColStarts')}</TableHead>
                    <TableHead>{t('admColEnds')}</TableHead>
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
                        {term.current ? (
                          <Badge variant="success">{t('admTermCurrent')}</Badge>
                        ) : null}
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
              <CardTitle>{t('admTabGrading')}</CardTitle>
              <Badge variant="outline">{t('admSetOncePerSchool')}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="max-w-[72ch] text-small text-muted-foreground">
                {t('admGradingStoredAsPercent')}
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
                      <span className="text-body font-semibold text-foreground">
                        {t(option.labelKey)}
                      </span>
                      {scale === option.key ? (
                        <Check className="h-4 w-4 text-foreground" aria-hidden />
                      ) : null}
                    </span>
                    <span className="text-caption text-muted-foreground">
                      {t(option.exampleKey)}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-caption text-muted-foreground">{t('admScalePerSchoolNote')}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="pt-5">
          <Card>
            <CardHeader>
              <CardTitle>{t('admTabRoles')}</CardTitle>
              <Badge variant="outline">{t('admReadOnlyInMvp')}</Badge>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('admColAction')}</TableHead>
                    {roleColumns.map((column) => (
                      <TableHead key={column.key} className="text-center">
                        {t(column.labelKey)}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissionRows.map((row) => (
                    <TableRow key={row.actionKey}>
                      <TableCell className="font-medium text-foreground">
                        {t(row.actionKey)}
                      </TableCell>
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
