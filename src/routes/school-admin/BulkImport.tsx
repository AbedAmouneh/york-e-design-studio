import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, Check, FileSpreadsheet, Upload } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useLocale } from '@/lib/i18n'
import { schoolName } from '@/lib/names'
import { cn } from '@/lib/utils'
import { DEFAULT_SCHOOL_ID, schools } from '@/data/seed'
import type { StringKey } from '@/i18n'

/**
 * Flow 4 of 8: bulk import users.
 *
 * Upload, see validation errors, fix them, confirm, land in the roster. The
 * errors are the point. An import screen that only shows the happy path tells
 * a school admin nothing about what happens when the file is wrong, and the
 * file is always wrong.
 */

type Step = 'upload' | 'review' | 'done'

interface ParsedRow {
  line: number
  name: string
  email: string
  role: string
  className: string
  /**
   * `field` is matched against the column it highlights, so it stays an English
   * identifier rather than display copy. Only `messageKey` is rendered.
   */
  problem?: { field: string; messageKey: StringKey; severity: 'error' | 'warning' }
}

const parsedRows: ParsedRow[] = [
  { line: 2, name: 'Layla Haddad', email: 'layla.haddad@example-school.test', role: 'Student', className: 'Grade 6 Cedar' },
  { line: 3, name: 'Omar Khalil', email: 'omar.khalil@example-school.test', role: 'Student', className: 'Grade 6 Cedar' },
  {
    line: 4,
    name: 'Sara Mansour',
    email: 'sara.mansour',
    role: 'Student',
    className: 'Grade 6 Cedar',
    problem: { field: 'Email', messageKey: 'admProblemEmailInvalid', severity: 'error' },
  },
  { line: 5, name: 'Karim Nasr', email: 'karim.nasr@example-school.test', role: 'Student', className: 'Grade 6 Maple' },
  {
    line: 6,
    name: 'Jana Abou Zeid',
    email: 'jana.abouzeid@example-school.test',
    role: 'Student',
    className: 'Grade 6 Oak',
    problem: { field: 'Class', messageKey: 'admProblemNoSuchClass', severity: 'error' },
  },
  {
    line: 7,
    name: 'Yousef Al Amin',
    email: 'layla.haddad@example-school.test',
    role: 'Student',
    className: 'Grade 7 Jasmine',
    problem: { field: 'Email', messageKey: 'admProblemEmailDuplicate', severity: 'error' },
  },
  {
    line: 8,
    name: 'Nour Dagher',
    email: 'nour.dagher@example-school.test',
    role: 'Studnet',
    className: 'Grade 7 Jasmine',
    problem: { field: 'Role', messageKey: 'admProblemUnknownRole', severity: 'warning' },
  },
  { line: 9, name: 'Rami Chidiac', email: 'rami.chidiac@example-school.test', role: 'Student', className: 'Grade 7 Laurel' },
]

export function SchoolAdminBulkImport() {
  const { t, locale } = useLocale()
  const school = schools.find((item) => item.id === DEFAULT_SCHOOL_ID)!
  const [step, setStep] = useState<Step>('upload')
  const [fixed, setFixed] = useState<Set<number>>(new Set())

  const errors = parsedRows.filter((row) => row.problem?.severity === 'error' && !fixed.has(row.line))
  const warnings = parsedRows.filter((row) => row.problem?.severity === 'warning')
  const importable = parsedRows.length - errors.length

  return (
    <Page>
      <PageHeader
        title={t('admBulkImportTitle')}
        subtitle={schoolName(school, locale)}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/school-admin/users">
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              {t('admBackToUsers')}
            </Link>
          </Button>
        }
      />

      <Steps step={step} />

      {step === 'upload' ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center gap-3 rounded border border-dashed border-border-strong bg-surface p-12 text-center">
              <FileSpreadsheet className="h-7 w-7 text-muted-foreground" aria-hidden />
              <p className="text-body font-medium text-foreground">{t('admDropFile')}</p>
              <p className="max-w-[46ch] text-small text-muted-foreground">
                {t('admFileColumns')}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Button variant="accent" size="sm" onClick={() => setStep('review')}>
                  <Upload className="h-3.5 w-3.5" aria-hidden />
                  {t('admChooseFile')}
                </Button>
                <Button variant="outline" size="sm">
                  {t('admDownloadTemplate')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 'review' ? (
        <>
          <div className="grid grid-cols-3 gap-4">
            <Summary label={t('admRowsInFile')} value={String(parsedRows.length)} />
            <Summary label={t('admReadyToImport')} value={String(importable)} tone="success" />
            <Summary
              label={t('admNeedFixing')}
              value={String(errors.length)}
              tone={errors.length ? 'danger' : 'success'}
            />
          </div>

          {errors.length ? (
            <div className="flex items-start gap-2.5 rounded border border-danger/30 bg-danger-tint px-4 py-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-none text-danger" aria-hidden />
              <div>
                <p className="text-small font-semibold text-danger">
                  {t('admRowsCannotImport').replace('{n}', String(errors.length))}
                </p>
                <p className="mt-0.5 text-small text-danger/90">{t('admFixHereOrInFile')}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2.5 rounded border border-success/30 bg-success-tint px-4 py-3">
              <Check className="mt-0.5 h-4 w-4 flex-none text-success" aria-hidden />
              <p className="text-small font-semibold text-success">{t('admEveryRowReady')}</p>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>{t('admRows')}</CardTitle>
              {warnings.length ? (
                <Badge variant="warning">
                  {t('admNWarnings').replace('{n}', String(warnings.length))}
                </Badge>
              ) : null}
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 text-end">{t('admColLine')}</TableHead>
                    <TableHead>{t('admColName')}</TableHead>
                    <TableHead>{t('admColEmail')}</TableHead>
                    <TableHead>{t('admColRole')}</TableHead>
                    <TableHead>{t('colClass')}</TableHead>
                    <TableHead>{t('admColProblem')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parsedRows.map((row) => {
                    const isFixed = fixed.has(row.line)
                    const problem = isFixed ? undefined : row.problem
                    return (
                      <TableRow
                        key={row.line}
                        className={cn(
                          problem?.severity === 'error' && 'bg-danger-tint/40',
                          problem?.severity === 'warning' && 'bg-warning-tint/40',
                        )}
                      >
                        <TableCell className="tabular text-end text-muted-foreground">
                          {row.line}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">{row.name}</TableCell>
                        <TableCell
                          className={cn(
                            'text-muted-foreground',
                            problem?.field === 'Email' && 'font-semibold text-danger',
                          )}
                        >
                          {row.email}
                        </TableCell>
                        <TableCell
                          className={cn(
                            'text-muted-foreground',
                            problem?.field === 'Role' && 'font-semibold text-warning',
                          )}
                        >
                          {row.role}
                        </TableCell>
                        <TableCell
                          className={cn(
                            'text-muted-foreground',
                            problem?.field === 'Class' && 'font-semibold text-danger',
                          )}
                        >
                          {row.className}
                        </TableCell>
                        <TableCell>
                          {problem ? (
                            <span className="flex items-center gap-2">
                              <span
                                className={cn(
                                  'text-caption',
                                  problem.severity === 'error' ? 'text-danger' : 'text-warning',
                                )}
                              >
                                {t(problem.messageKey)}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 px-2 text-caption"
                                onClick={() =>
                                  setFixed((current) => new Set(current).add(row.line))
                                }
                              >
                                {t('admFix')}
                              </Button>
                            </span>
                          ) : isFixed ? (
                            <Badge variant="success">{t('admFixed')}</Badge>
                          ) : (
                            <span className="text-caption text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setStep('upload')}>
              {t('admUploadDifferentFile')}
            </Button>
            <Button
              variant="accent"
              size="sm"
              disabled={errors.length > 0}
              onClick={() => setStep('done')}
            >
              {t('admImportNUsers').replace('{n}', String(importable))}
            </Button>
          </div>
        </>
      ) : null}

      {step === 'done' ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-success-tint">
              <Check className="h-5 w-5 text-success" aria-hidden />
            </span>
            <p className="text-subheading font-semibold text-foreground">
              {t('admNUsersImported').replace('{n}', String(parsedRows.length))}
            </p>
            <p className="max-w-[46ch] text-small text-muted-foreground">
              {t('admCanSignInNow')}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Button variant="accent" size="sm" asChild>
                <Link to="/school-admin/users">{t('admViewRoster')}</Link>
              </Button>
              <Button variant="outline" size="sm">
                {t('admSendWelcomeEmails')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </Page>
  )
}

function Steps({ step }: { step: Step }) {
  const { t } = useLocale()
  const items: Array<{ key: Step; label: string }> = [
    { key: 'upload', label: t('admStepUpload') },
    { key: 'review', label: t('admStepReviewFix') },
    { key: 'done', label: t('admStepImport') },
  ]
  const activeIndex = items.findIndex((item) => item.key === step)

  return (
    <ol className="flex items-center gap-2">
      {items.map((item, index) => (
        <li key={item.key} className="flex items-center gap-2">
          <span
            className={cn(
              'flex items-center gap-2 rounded px-3 py-1.5 text-small font-medium',
              index === activeIndex
                ? 'bg-foreground text-background'
                : index < activeIndex
                  ? 'bg-success-tint text-success'
                  : 'bg-muted text-muted-foreground',
            )}
          >
            <span className="tabular text-caption">{index + 1}</span>
            {item.label}
          </span>
          {index < items.length - 1 ? (
            <span className="h-px w-5 bg-border-strong" aria-hidden />
          ) : null}
        </li>
      ))}
    </ol>
  )
}

function Summary({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone?: 'success' | 'danger'
}) {
  return (
    <Card className="p-4">
      <p className="text-small text-muted-foreground">{label}</p>
      <p
        className={cn(
          'tabular mt-2 text-display font-semibold leading-none',
          tone === 'success' && 'text-success',
          tone === 'danger' && 'text-danger',
          !tone && 'text-foreground',
        )}
      >
        {value}
      </p>
    </Card>
  )
}
