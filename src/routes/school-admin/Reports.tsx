import { useState } from 'react'
import { Download, FileSpreadsheet, FileText } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * Reports and export.
 *
 * The ministry and head of school report is the gap Abed named on 6 November:
 * nothing in the features sheet covers a school's upward report in a
 * country-specific format, so it is proposed here and marked as such.
 */

interface ReportDefinition {
  id: string
  title: string
  description: string
  formats: Array<'csv' | 'xlsx' | 'pdf'>
  proposed?: boolean
}

const reports: ReportDefinition[] = [
  {
    id: 'rep-progress',
    title: 'Progress by class',
    description: 'Average, completion and status for every class in the term.',
    formats: ['csv', 'xlsx', 'pdf'],
  },
  {
    id: 'rep-gradebook',
    title: 'Full gradebook',
    description: 'Every grade for every student, with late flags and overrides.',
    formats: ['csv', 'xlsx'],
  },
  {
    id: 'rep-attendance',
    title: 'Attendance register',
    description: 'Daily marks across the term, with absence totals per student.',
    formats: ['csv', 'xlsx', 'pdf'],
  },
  {
    id: 'rep-at-risk',
    title: 'At risk students',
    description: 'Students below the threshold, with the signals that flagged them.',
    formats: ['csv', 'pdf'],
  },
  {
    id: 'rep-standards',
    title: 'Standards coverage',
    description: 'Which standards have been covered, partially covered or missed.',
    formats: ['csv', 'pdf'],
  },
  {
    id: 'rep-engagement',
    title: 'Usage and engagement',
    description: 'Logins, time on task and feature adoption by role.',
    formats: ['csv', 'xlsx'],
  },
  {
    id: 'rep-ministry',
    title: 'Ministry and head of school report',
    description:
      'The school report in the format the local authority expects. Needs a template per market.',
    formats: ['pdf'],
    proposed: true,
  },
]

const formatIcon = {
  csv: FileText,
  xlsx: FileSpreadsheet,
  pdf: FileText,
} as const

export function SchoolAdminReports() {
  const { t } = useLocale()
  const [generated, setGenerated] = useState<string | null>(null)

  return (
    <Page>
      <PageHeader
        title={t('navReports')}
        subtitle="Cedar Valley School · Term 2, 11 January to 2 April 2027"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => (
          <Card key={report.id} className={cn(report.proposed && 'border-warning/40')}>
            <CardHeader>
              <CardTitle>{report.title}</CardTitle>
              {report.proposed ? <Badge variant="warning">Proposed</Badge> : null}
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-small text-muted-foreground">{report.description}</p>
              <div className="flex flex-wrap items-center gap-2">
                {report.formats.map((format) => {
                  const Icon = formatIcon[format]
                  return (
                    <Button
                      key={format}
                      variant="outline"
                      size="sm"
                      onClick={() => setGenerated(`${report.id}-${format}`)}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                      {format.toUpperCase()}
                    </Button>
                  )
                })}
                {generated?.startsWith(report.id) ? (
                  <span className="flex items-center gap-1.5 text-caption text-success">
                    <Download className="h-3.5 w-3.5" aria-hidden />
                    Ready
                  </span>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-caption text-muted-foreground">
        The ministry report is not in the features sheet. It was raised as a day one need for
        government curriculum schools and needs a template agreed per market before it can be
        built.
      </p>
    </Page>
  )
}
