import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  FileText,
  Languages,
  MessageSquare,
  Scale,
  Sparkles,
  Wand2,
} from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import type { StringKey } from '@/i18n'
import { cn } from '@/lib/utils'

/**
 * AI teacher tools.
 *
 * Teacher facing only. Hassan Nasrallah's Jira foundation supersedes the
 * student chatbot and the AI examiner, and Abed's call on 6 November was to
 * follow Hassan rather than the older features sheet, which still lists a
 * student tutor. That decision is stated on the screen rather than buried,
 * because a reviewer who remembers the features sheet will otherwise read this
 * page as an omission.
 *
 * Every tool is grounded in the teacher's own course content and every output
 * is a draft she edits. Nothing here reaches a student without her approving
 * it, which is the whole safety position in one sentence.
 */

interface Tool {
  id: string
  icon: typeof Sparkles
  nameKey: StringKey
  whatKey: StringKey
  groundingKey: StringKey
  status: 'ready' | 'later'
}

const tools: Tool[] = [
  {
    id: 'reteach',
    icon: Wand2,
    nameKey: 'tchToolReteach',
    whatKey: 'tchToolReteachWhat',
    groundingKey: 'tchToolReteachGround',
    status: 'ready',
  },
  {
    id: 'quiz',
    icon: FileText,
    nameKey: 'tchToolQuiz',
    whatKey: 'tchToolQuizWhat',
    groundingKey: 'tchToolQuizGround',
    status: 'ready',
  },
  {
    id: 'feedback',
    icon: MessageSquare,
    nameKey: 'tchToolFeedback',
    whatKey: 'tchToolFeedbackWhat',
    groundingKey: 'tchToolFeedbackGround',
    status: 'ready',
  },
  {
    id: 'differentiate',
    icon: Scale,
    nameKey: 'tchToolDifferentiate',
    whatKey: 'tchToolDifferentiateWhat',
    groundingKey: 'tchToolDifferentiateGround',
    status: 'ready',
  },
  {
    id: 'parent',
    icon: MessageSquare,
    nameKey: 'tchToolParentMessage',
    whatKey: 'tchToolParentMessageWhat',
    groundingKey: 'tchToolParentMessageGround',
    status: 'ready',
  },
  {
    id: 'translate',
    icon: Languages,
    nameKey: 'tchToolTranslate',
    whatKey: 'tchToolTranslateWhat',
    groundingKey: 'tchToolTranslateGround',
    status: 'later',
  },
]

const reteachStepKeys = [
  'tchReteachStep1',
  'tchReteachStep2',
  'tchReteachStep3',
  'tchReteachStep4',
] as const

export function TeacherAiTools() {
  const { t } = useLocale()
  const [active, setActive] = useState<string | null>('reteach')

  return (
    <Page>
      <PageHeader
        title={t('navAiTools')}
        subtitle={t('tchAiToolsSubtitle')}
      />

      <Card className="border-accent/40">
        <CardContent className="flex flex-wrap items-start gap-3 p-4">
          <Sparkles className="mt-0.5 h-4 w-4 flex-none text-foreground" aria-hidden />
          <span className="min-w-0 flex-1 text-small text-foreground">{t('tchAiToolsBanner')}</span>
        </CardContent>
      </Card>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon
          const later = tool.status === 'later'
          return (
            <button
              key={tool.id}
              type="button"
              disabled={later}
              onClick={() => setActive(tool.id)}
              className={cn(
                'flex flex-col gap-3 rounded border p-4 text-start transition-colors',
                later && 'opacity-55',
                active === tool.id && !later
                  ? 'border-foreground bg-surface'
                  : 'border-border bg-background hover:bg-surface',
              )}
            >
              <span className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 flex-none place-items-center rounded bg-muted">
                  <Icon className="h-4 w-4 text-foreground" aria-hidden />
                </span>
                <span className="min-w-0 flex-1 text-small font-medium text-foreground">
                  {t(tool.nameKey)}
                </span>
                {later ? <Badge variant="outline">{t('tchLater')}</Badge> : null}
              </span>
              <span className="text-small text-muted-foreground">{t(tool.whatKey)}</span>
              <span className="mt-auto text-caption text-muted-foreground">
                {t(tool.groundingKey)}
              </span>
            </button>
          )
        })}
      </div>

      {active === 'reteach' ? (
        <Card>
          <CardHeader>
            <CardTitle>{t('tchToolReteach')}</CardTitle>
            <Badge variant="outline">Grade 6 Cedar</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded border border-border bg-surface p-4">
              <p className="text-caption font-medium uppercase tracking-wide text-muted-foreground">
                {t('tchWhatResultsShow')}
              </p>
              <p className="mt-1.5 text-small text-foreground">{t('tchReteachFindings')}</p>
            </div>

            <div className="space-y-2">
              <p className="text-caption font-medium uppercase tracking-wide text-muted-foreground">
                {t('tchSuggestedReteach')}
              </p>
              {reteachStepKeys.map((key, index) => (
                <div
                  key={key}
                  className="flex items-start gap-3 rounded border border-border px-4 py-3"
                >
                  <span className="tabular mt-0.5 flex-none text-caption font-semibold text-muted-foreground">
                    {index + 1}
                  </span>
                  <span className="text-small text-foreground">{t(key)}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
              <Button variant="accent" size="sm" asChild>
                <Link to="/teacher/planner">
                  {t('tchAddToThursday')}
                  <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/teacher/assign">{t('tchAssignToSix')}</Link>
              </Button>
              <Button variant="ghost" size="sm">
                {t('tchTryAgain')}
              </Button>
            </div>

            <p className="text-caption text-muted-foreground">{t('tchAiToolsNote')}</p>
          </CardContent>
        </Card>
      ) : null}
    </Page>
  )
}
