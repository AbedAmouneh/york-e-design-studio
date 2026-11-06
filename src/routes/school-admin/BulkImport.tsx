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
import { cn } from '@/lib/utils'

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
  problem?: { field: string; message: string; severity: 'error' | 'warning' }
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
    problem: { field: 'Email', message: 'Not a valid email address', severity: 'error' },
  },
  { line: 5, name: 'Karim Nasr', email: 'karim.nasr@example-school.test', role: 'Student', className: 'Grade 6 Maple' },
  {
    line: 6,
    name: 'Jana Abou Zeid',
    email: 'jana.abouzeid@example-school.test',
    role: 'Student',
    className: 'Grade 6 Oak',
    problem: { field: 'Class', message: 'No class called Grade 6 Oak', severity: 'error' },
  },
  {
    line: 7,
    name: 'Yousef Al Amin',
    email: 'layla.haddad@example-school.test',
    role: 'Student',
    className: 'Grade 7 Jasmine',
    problem: { field: 'Email', message: 'Already used on line 2', severity: 'error' },
  },
  {
    line: 8,
    name: 'Nour Dagher',
    email: 'nour.dagher@example-school.test',
    role: 'Studnet',
    className: 'Grade 7 Jasmine',
    problem: { field: 'Role', message: 'Unknown role, did you mean Student', severity: 'warning' },
  },
  { line: 9, name: 'Rami Chidiac', email: 'rami.chidiac@example-school.test', role: 'Student', className: 'Grade 7 Laurel' },
]

export function SchoolAdminBulkImport() {
  const [step, setStep] = useState<Step>('upload')
  const [fixed, setFixed] = useState<Set<number>>(new Set())

  const errors = parsedRows.filter((row) => row.problem?.severity === 'error' && !fixed.has(row.line))
  const warnings = parsedRows.filter((row) => row.problem?.severity === 'warning')
  const importable = parsedRows.length - errors.length

  return (
    <Page>
      <PageHeader
        title="Bulk import users"
        subtitle="Cedar Valley School"
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/school-admin/users">
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              Back to users
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
              <p className="text-body font-medium text-foreground">
                Drop a CSV or XLSX file here
              </p>
              <p className="max-w-[46ch] text-small text-muted-foreground">
                Columns: name, email, role, class. The first row is treated as headers.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Button variant="accent" size="sm" onClick={() => setStep('review')}>
                  <Upload className="h-3.5 w-3.5" aria-hidden />
                  Choose a file
                </Button>
                <Button variant="outline" size="sm">
                  Download the template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 'review' ? (
        <>
          <div className="grid grid-cols-3 gap-4">
            <Summary label="Rows in the file" value={String(parsedRows.length)} />
            <Summary label="Ready to import" value={String(importable)} tone="success" />
            <Summary label="Need fixing" value={String(errors.length)} tone={errors.length ? 'danger' : 'success'} />
          </div>

          {errors.length ? (
            <div className="flex items-start gap-2.5 rounded border border-danger/30 bg-danger-tint px-4 py-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-none text-danger" aria-hidden />
              <div>
                <p className="text-small font-semibold text-danger">
                  {errors.length} rows cannot be imported
                </p>
                <p className="mt-0.5 text-small text-danger/90">
                  Fix them here or in the file and upload again. Rows without errors import either
                  way.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2.5 rounded border border-success/30 bg-success-tint px-4 py-3">
              <Check className="mt-0.5 h-4 w-4 flex-none text-success" aria-hidden />
              <p className="text-small font-semibold text-success">
                Every row is ready to import
              </p>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Rows</CardTitle>
              {warnings.length ? (
                <Badge variant="warning">{warnings.length} warnings</Badge>
              ) : null}
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 text-end">Line</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Problem</TableHead>
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
                                {problem.message}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 px-2 text-caption"
                                onClick={() =>
                                  setFixed((current) => new Set(current).add(row.line))
                                }
                              >
                                Fix
                              </Button>
                            </span>
                          ) : isFixed ? (
                            <Badge variant="success">Fixed</Badge>
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
              Upload a different file
            </Button>
            <Button
              variant="accent"
              size="sm"
              disabled={errors.length > 0}
              onClick={() => setStep('done')}
            >
              Import {importable} users
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
              {parsedRows.length} users imported
            </p>
            <p className="max-w-[46ch] text-small text-muted-foreground">
              They can sign in now. Welcome emails have not been sent, you choose when to send
              those.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Button variant="accent" size="sm" asChild>
                <Link to="/school-admin/users">View the roster</Link>
              </Button>
              <Button variant="outline" size="sm">
                Send welcome emails
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </Page>
  )
}

function Steps({ step }: { step: Step }) {
  const items: Array<{ key: Step; label: string }> = [
    { key: 'upload', label: 'Upload' },
    { key: 'review', label: 'Review and fix' },
    { key: 'done', label: 'Import' },
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
