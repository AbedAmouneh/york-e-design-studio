import { useState } from 'react'
import { Download, FileSpreadsheet, FileText } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { StringKey } from '@/i18n'

/**
 * Reports and export.
 *
 * The ministry and head of school report is the gap Abed named on 6 November:
 * nothing in the features sheet covers a school's upward report in a
 * country-specific format, so it is proposed here and marked as such.
 */

interface ReportDefinition {
  id: string
  titleKey: StringKey
  descriptionKey: StringKey
  formats: Array<'csv' | 'xlsx' | 'pdf'>
  proposed?: boolean
}

const reports: ReportDefinition[] = [
  {
    id: 'rep-progress',
    titleKey: 'admReportProgress',
    descriptionKey: 'admReportProgressDesc',
    formats: ['csv', 'xlsx', 'pdf'],
  },
  {
    id: 'rep-gradebook',
    titleKey: 'admReportGradebook',
    descriptionKey: 'admReportGradebookDesc',
    formats: ['csv', 'xlsx'],
  },
  {
    id: 'rep-attendance',
    titleKey: 'admReportAttendance',
    descriptionKey: 'admReportAttendanceDesc',
    formats: ['csv', 'xlsx', 'pdf'],
  },
  {
    id: 'rep-at-risk',
    titleKey: 'admReportAtRisk',
    descriptionKey: 'admReportAtRiskDesc',
    formats: ['csv', 'pdf'],
  },
  {
    id: 'rep-standards',
    titleKey: 'admReportStandards',
    descriptionKey: 'admReportStandardsDesc',
    formats: ['csv', 'pdf'],
  },
  {
    id: 'rep-engagement',
    titleKey: 'admReportEngagement',
    descriptionKey: 'admReportEngagementDesc',
    formats: ['csv', 'xlsx'],
  },
  {
    id: 'rep-ministry',
    titleKey: 'admReportMinistry',
    descriptionKey: 'admReportMinistryDesc',
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
        subtitle={t('admReportsSubtitle')}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => (
          <Card key={report.id} className={cn(report.proposed && 'border-warning/40')}>
            <CardHeader>
              <CardTitle>{t(report.titleKey)}</CardTitle>
              {report.proposed ? <Badge variant="warning">{t('proposed')}</Badge> : null}
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-small text-muted-foreground">{t(report.descriptionKey)}</p>
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
                    {t('admReportReady')}
                  </span>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-caption text-muted-foreground">{t('admReportsNote')}</p>
    </Page>
  )
}
