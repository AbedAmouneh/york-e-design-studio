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
  name: string
  what: string
  grounding: string
  status: 'ready' | 'later'
}

const tools: Tool[] = [
  {
    id: 'reteach',
    icon: Wand2,
    name: 'Build a reteach',
    what: 'Turns the misconceptions your class actually showed into a ten minute lesson.',
    grounding: 'Reads the question level results for this class and pulls from the course content.',
    status: 'ready',
  },
  {
    id: 'quiz',
    icon: FileText,
    name: 'Draft a quiz',
    what: 'Suggests questions from the bank that cover the skills you have just taught.',
    grounding: 'Uses the skill tags on your unit plan and the question bank you can already see.',
    status: 'ready',
  },
  {
    id: 'feedback',
    icon: MessageSquare,
    name: 'Draft feedback',
    what: 'Writes a first pass of feedback on written work, which you edit before releasing.',
    grounding: 'Reads the submission and the rubric you selected. Never released without you.',
    status: 'ready',
  },
  {
    id: 'differentiate',
    icon: Scale,
    name: 'Differentiate an activity',
    what: 'Produces a foundation and a stretch version of something you already assign.',
    grounding: 'Rewrites the existing activity rather than inventing new content.',
    status: 'ready',
  },
  {
    id: 'parent',
    icon: MessageSquare,
    name: 'Draft a parent message',
    what: 'Turns what the data shows into a message a parent will understand.',
    grounding: 'Uses the results for that one child only. You send it, not the platform.',
    status: 'ready',
  },
  {
    id: 'translate',
    icon: Languages,
    name: 'Translate a message',
    what: 'English to Arabic and back, for families who read one and not the other.',
    grounding: 'Translation only. It does not change what you wrote.',
    status: 'later',
  },
]

export function TeacherAiTools() {
  const { t } = useLocale()
  const [active, setActive] = useState<string | null>('reteach')

  return (
    <Page>
      <PageHeader
        title={t('navAiTools')}
        subtitle="Drafts for you to edit, grounded in your own course content"
      />

      <Card className="border-accent/40">
        <CardContent className="flex flex-wrap items-start gap-3 p-4">
          <Sparkles className="mt-0.5 h-4 w-4 flex-none text-foreground" aria-hidden />
          <span className="min-w-0 flex-1 text-small text-foreground">
            These tools are for teachers. There is no AI tutor or AI examiner facing students in
            this release, which supersedes the student chatbot in the older features sheet. Nothing
            on this page reaches a student until you approve it.
          </span>
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
                  {tool.name}
                </span>
                {later ? <Badge variant="outline">Later</Badge> : null}
              </span>
              <span className="text-small text-muted-foreground">{tool.what}</span>
              <span className="mt-auto text-caption text-muted-foreground">{tool.grounding}</span>
            </button>
          )
        })}
      </div>

      {active === 'reteach' ? (
        <Card>
          <CardHeader>
            <CardTitle>Build a reteach</CardTitle>
            <Badge variant="outline">Grade 6 Cedar</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded border border-border bg-surface p-4">
              <p className="text-caption font-medium uppercase tracking-wide text-muted-foreground">
                What the results show
              </p>
              <p className="mt-1.5 text-small text-foreground">
                Six students added numerators and denominators separately on three different
                questions. Four of the six were on track last month.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-caption font-medium uppercase tracking-wide text-muted-foreground">
                Suggested ten minute reteach
              </p>
              {[
                'Open with 1/2 + 1/2, which they will all get right, and ask why the answer is not 2/4.',
                'Use the number line manipulative from Unit 2 to show the two halves meeting at one.',
                'Work 1/3 + 1/4 together, naming the common denominator step out loud.',
                'Set the three practice questions from Unit 2, the foundation version.',
              ].map((line, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded border border-border px-4 py-3"
                >
                  <span className="tabular mt-0.5 flex-none text-caption font-semibold text-muted-foreground">
                    {index + 1}
                  </span>
                  <span className="text-small text-foreground">{line}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
              <Button variant="accent" size="sm" asChild>
                <Link to="/teacher/planner">
                  Add to Thursday
                  <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/teacher/assign">Assign the practice to the six</Link>
              </Button>
              <Button variant="ghost" size="sm">
                Try again
              </Button>
            </div>

            <p className="text-caption text-muted-foreground">
              Every step above points at content that already exists in your course. The tool
              arranges it, it does not write new teaching material.
            </p>
          </CardContent>
        </Card>
      ) : null}
    </Page>
  )
}
