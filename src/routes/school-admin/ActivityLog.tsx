import { useMemo, useState } from 'react'
import { Download } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useLocale } from '@/lib/i18n'
import { activityLog } from '@/data/seed'

/**
 * Required by the features sheet: a chronological record of user actions per
 * course and tenant, for admin and teacher review. Grade changes are the rows
 * that matter, so they carry the recorded reason.
 */
export function SchoolAdminActivityLog() {
  const { t } = useLocale()
  const [query, setQuery] = useState('')

  const rows = useMemo(
    () =>
      activityLog.filter((entry) =>
        query
          ? `${entry.actorName} ${entry.action} ${entry.target}`
              .toLowerCase()
              .includes(query.toLowerCase())
          : true,
      ),
    [query],
  )

  return (
    <Page>
      <PageHeader
        title={t('navActivityLog')}
        subtitle="Logins, submissions, grade changes and content views"
        actions={
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5" aria-hidden />
            {t('export')}
          </Button>
        }
      />

      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="max-w-xs">
            <SearchInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('search')}
            />
          </div>

          <div className="-mx-4 -mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>When</TableHead>
                  <TableHead>Who</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Target</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="tabular whitespace-nowrap text-muted-foreground">
                      {entry.at.slice(8, 10)} Feb · {entry.at.slice(11, 16)}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{entry.actorName}</TableCell>
                    <TableCell>{entry.action}</TableCell>
                    <TableCell className="text-muted-foreground">{entry.target}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </Page>
  )
}
