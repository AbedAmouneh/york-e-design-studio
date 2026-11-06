import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { courses } from '@/data/seed'

/**
 * Provision a school.
 *
 * The flow that creates a tenant. Four steps because four irreversible things
 * are being decided: who the customer is, what they bought, how their grades
 * are expressed, and where their data lives.
 *
 * The last two carry a warning and are not editable afterwards without a
 * migration. Pretending they are ordinary settings is how a platform ends up
 * with a school in the wrong data region.
 */

type Step = 'school' | 'licence' | 'local' | 'done'

export function SuperAdminProvision() {
  const { t, locale } = useLocale()
  const [step, setStep] = useState<Step>('school')
  const [name, setName] = useState('')
  const [country, setCountry] = useState('Lebanon')
  const [seats, setSeats] = useState(500)
  const [courseIds, setCourseIds] = useState<Set<string>>(new Set())
  const [scale, setScale] = useState<'percentage' | 'letter' | 'band'>('percentage')
  const [language, setLanguage] = useState<'en' | 'ar'>('en')
  const [region, setRegion] = useState<'EU' | 'Gulf'>('EU')

  const steps: Array<{ key: Step; label: string }> = [
    { key: 'school', label: 'The school' },
    { key: 'licence', label: 'Licence' },
    { key: 'local', label: 'Local setup' },
    { key: 'done', label: 'Done' },
  ]
  const activeIndex = steps.findIndex((item) => item.key === step)

  return (
    <Page>
      <PageHeader
        title="Provision a school"
        subtitle="Creates a new tenant"
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/super-admin">
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              {t('navTenants')}
            </Link>
          </Button>
        }
      />

      <ol className="flex flex-wrap items-center gap-2">
        {steps.map((item, index) => (
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
            {index < steps.length - 1 ? (
              <span className="h-px w-5 bg-border-strong" aria-hidden />
            ) : null}
          </li>
        ))}
      </ol>

      {step === 'school' ? (
        <Card>
          <CardHeader>
            <CardTitle>The school</CardTitle>
          </CardHeader>
          <CardContent className="max-w-xl space-y-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-small font-medium text-foreground">School name</span>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Al Manara International School"
              />
            </label>

            <div className="flex flex-col gap-1.5">
              <span className="text-small font-medium text-foreground">Country</span>
              <div className="flex flex-wrap gap-1.5">
                {['Lebanon', 'United Arab Emirates', 'Jordan', 'Egypt', 'Saudi Arabia'].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setCountry(item)
                        setRegion(item === 'Lebanon' ? 'EU' : 'Gulf')
                      }}
                      className={cn(
                        'rounded border px-3 py-2 text-small transition-colors',
                        country === item
                          ? 'border-foreground bg-surface text-foreground'
                          : 'border-border text-muted-foreground hover:bg-surface',
                      )}
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                variant="accent"
                size="sm"
                disabled={!name.trim()}
                onClick={() => setStep('licence')}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 'licence' ? (
        <Card>
          <CardHeader>
            <CardTitle>Licence</CardTitle>
            <Badge variant="outline">{courseIds.size} courses</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex max-w-xs flex-col gap-1.5">
              <span className="text-small font-medium text-foreground">Seats</span>
              <Input
                type="number"
                min={1}
                value={seats}
                onChange={(event) => setSeats(Number(event.target.value) || 0)}
              />
              <span className="text-caption text-muted-foreground">
                One seat per learner. Teachers and parents do not consume seats.
              </span>
            </label>

            <div className="space-y-2">
              <span className="text-small font-medium text-foreground">Courses</span>
              {courses.map((course) => (
                <label
                  key={course.id}
                  className="flex cursor-pointer items-center gap-3 rounded border border-border px-4 py-3 transition-colors hover:bg-surface"
                >
                  <Checkbox
                    checked={courseIds.has(course.id)}
                    onCheckedChange={() =>
                      setCourseIds((current) => {
                        const next = new Set(current)
                        if (next.has(course.id)) next.delete(course.id)
                        else next.add(course.id)
                        return next
                      })
                    }
                  />
                  <span className="min-w-0 flex-1 text-small text-foreground">
                    {locale === 'ar' ? course.titleAr : course.title}
                  </span>
                  <Badge variant="outline">Grade {course.grade}</Badge>
                </label>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" size="sm" onClick={() => setStep('school')}>
                Back
              </Button>
              <Button
                variant="accent"
                size="sm"
                disabled={courseIds.size === 0}
                onClick={() => setStep('local')}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 'local' ? (
        <Card>
          <CardHeader>
            <CardTitle>Local setup</CardTitle>
            <Badge variant="warning">Cannot be changed later</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <span className="text-small font-medium text-foreground">Grading scale</span>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { key: 'percentage', label: 'Percentage', hint: '0 to 100' },
                    { key: 'letter', label: 'Letter', hint: 'A to F' },
                    { key: 'band', label: 'Band', hint: 'Below, on track, above' },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setScale(option.key)}
                    className={cn(
                      'flex-1 rounded border px-4 py-3 text-start text-small transition-colors',
                      scale === option.key
                        ? 'border-foreground bg-surface text-foreground'
                        : 'border-border text-muted-foreground hover:bg-surface',
                    )}
                  >
                    {option.label}
                    <span className="mt-0.5 block text-caption text-muted-foreground">
                      {option.hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-small font-medium text-foreground">Default language</span>
              <div className="flex gap-2">
                {(
                  [
                    { key: 'en', label: 'English', hint: 'Left to right' },
                    { key: 'ar', label: 'Arabic', hint: 'Right to left' },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setLanguage(option.key)}
                    className={cn(
                      'flex-1 rounded border px-4 py-3 text-start text-small transition-colors',
                      language === option.key
                        ? 'border-foreground bg-surface text-foreground'
                        : 'border-border text-muted-foreground hover:bg-surface',
                    )}
                  >
                    {option.label}
                    <span className="mt-0.5 block text-caption text-muted-foreground">
                      {option.hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded border border-warning/40 bg-warning-tint px-4 py-3">
              <p className="text-small font-medium text-warning">
                Data region: {region}
              </p>
              <p className="mt-1 text-caption text-warning">
                Set from the country and fixed at creation. Moving a tenant between regions later
                is a migration, not a setting.
              </p>
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" size="sm" onClick={() => setStep('licence')}>
                Back
              </Button>
              <Button variant="accent" size="sm" onClick={() => setStep('done')}>
                Create the tenant
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 'done' ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-success-tint">
              <Check className="h-5 w-5 text-success" aria-hidden />
            </span>
            <p className="text-subheading font-semibold text-foreground">{name} created</p>
            <p className="max-w-[56ch] text-small text-muted-foreground">
              {seats} seats, {courseIds.size} courses, {scale} scale,{' '}
              {language === 'ar' ? 'Arabic' : 'English'}, {region} region. The school is in
              provisioning until their admin imports users and opens it.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Button variant="accent" size="sm" asChild>
                <Link to="/super-admin">Back to schools</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={() => setStep('school')}>
                Provision another
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </Page>
  )
}
