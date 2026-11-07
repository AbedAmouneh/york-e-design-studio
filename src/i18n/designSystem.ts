import type { Phrase } from './types'

/**
 * Phrases for the two design system screens.
 *
 * Note what is deliberately absent: variant names, prop names and class
 * strings. `variant="accent"` and `bg-primary/90` are code, and a developer
 * reading the Arabic build still types them in English. Translating them would
 * produce a spec that cannot be copied from, which is the one thing these two
 * screens exist to be.
 */
export const designSystem = {
  // Component states
  dsComponents: { en: 'Component states', ar: 'حالات المكونات' },
  dsComponentsSubtitle: {
    en: 'Every component in every state, with the class or prop that produces it.',
    ar: 'كل مكوّن في كل حالاته، مع الصنف أو الخاصية التي تنتجها.',
  },
  dsColState: { en: 'State', ar: 'الحالة' },
  dsColExample: { en: 'Example', ar: 'مثال' },
  dsColCode: { en: 'Code', ar: 'الشيفرة' },

  dsStateRest: { en: 'Rest', ar: 'السكون' },
  dsStateHover: { en: 'Hover', ar: 'التحويم' },
  dsStateFocus: { en: 'Focus visible', ar: 'التركيز الظاهر' },
  dsStateDisabled: { en: 'Disabled', ar: 'معطّل' },
  dsStateChecked: { en: 'Checked', ar: 'محدّد' },
  dsStateUnchecked: { en: 'Unchecked', ar: 'غير محدّد' },
  dsStateIndeterminate: { en: 'Indeterminate', ar: 'غير محسوم' },
  dsStateOn: { en: 'On', ar: 'مفعّل' },
  dsStateOff: { en: 'Off', ar: 'غير مفعّل' },
  dsStateActive: { en: 'Active', ar: 'نشط' },
  dsStatePlaceholder: { en: 'Placeholder', ar: 'نص إرشادي' },
  dsStateFilled: { en: 'Filled', ar: 'معبّأ' },
  dsStateError: { en: 'Error', ar: 'خطأ' },
  dsStateSelected: { en: 'Selected row', ar: 'صف محدّد' },
  dsStateWithIcon: { en: 'With icon', ar: 'مع أيقونة' },
  dsStateAsLink: { en: 'As a link', ar: 'كرابط' },
  dsStateEmphasis: { en: 'Needs attention', ar: 'يحتاج انتباهاً' },

  // Sample button labels. They live here rather than in `common` because they
  // are filler on a spec page, not words the product says anywhere.
  dsSampleDelete: { en: 'Delete', ar: 'حذف' },
  dsSampleAdd: { en: 'Add', ar: 'إضافة' },

  dsForcedNote: {
    en: 'Hover and focus cannot be captured in a static page, so those rows apply the resulting classes directly. The code column shows the real rule.',
    ar: 'لا يمكن التقاط التحويم والتركيز في صفحة ثابتة، لذا تطبّق هذه الصفوف الأصناف الناتجة مباشرة. ويعرض عمود الشيفرة القاعدة الحقيقية.',
  },

  dsButtons: { en: 'Button', ar: 'الأزرار' },
  dsButtonVariants: { en: 'Variants', ar: 'الأنماط' },
  dsButtonSizes: { en: 'Sizes', ar: 'المقاسات' },
  dsBadges: { en: 'Badge', ar: 'الشارات' },
  dsStatusBadges: { en: 'Status badge', ar: 'شارة الحالة' },
  dsInputs: { en: 'Input', ar: 'حقول الإدخال' },
  dsCheckbox: { en: 'Checkbox', ar: 'مربع الاختيار' },
  dsSwitch: { en: 'Switch', ar: 'المفتاح' },
  dsTabs: { en: 'Tabs', ar: 'التبويبات' },
  dsTable: { en: 'Table', ar: 'الجداول' },
  dsCards: { en: 'Card', ar: 'البطاقات' },
  dsStatCard: { en: 'Stat card', ar: 'بطاقة الرقم' },
  dsLearnerTier: { en: 'Learner tier, K1 to Grade 3', ar: 'فئة المتعلم، الروضة إلى الثالث' },
  dsLearnerTierNote: {
    en: 'The same components inside .learner-scope. Larger radius, teal primary, warm surface. No red and no percentages anywhere in this tier.',
    ar: 'المكونات نفسها داخل ‎.learner-scope‎. زوايا أوسع، ولون أساسي أزرق مخضر، وسطح دافئ. ولا أحمر ولا نسب مئوية في هذه الفئة إطلاقاً.',
  },

  dsNotBuilt: { en: 'Not built yet', ar: 'لم يُبنَ بعد' },
  dsNotBuiltNote: {
    en: 'Listed so nobody assumes these exist. The Radix packages are installed, the wrappers are not written.',
    ar: 'مذكورة هنا حتى لا يفترض أحد وجودها. حزم Radix مثبّتة، لكن الأغلفة لم تُكتب بعد.',
  },
  dsMissingLoading: {
    en: 'No loading or pending state on Button. Every submit in the studio is instant.',
    ar: 'لا توجد حالة تحميل أو انتظار في الزر. كل إرسال في الاستوديو فوري.',
  },
  dsMissingInputError: {
    en: 'No error variant on Input. The pattern below overrides the border by class, which is a decision to make properly before build.',
    ar: 'لا يوجد نمط خطأ في حقل الإدخال. والنمط أدناه يتجاوز الحد بصنف، وهو قرار ينبغي حسمه قبل التنفيذ.',
  },
  dsMissingPrimitives: {
    en: 'No Select, Dialog, Tooltip, Popover, Dropdown, Progress, Avatar or Separator wrapper. Screens that needed one built it inline.',
    ar: 'لا أغلفة للقوائم المنسدلة أو الحوارات أو التلميحات أو النوافذ المنبثقة أو شريط التقدم أو الصورة الرمزية أو الفاصل. والشاشات التي احتاجت أحدها بنته داخلياً.',
  },
  dsMissingToast: {
    en: 'No toast or inline save confirmation component. Three screens each wrote their own.',
    ar: 'لا يوجد مكوّن تنبيه عابر أو تأكيد حفظ. وثلاث شاشات كتبت نسختها الخاصة.',
  },

  // Tokens
  dsTokens: { en: 'Design tokens', ar: 'رموز التصميم' },
  dsTokensSubtitle: {
    en: 'The values behind every screen. Defined once in src/index.css, read through Tailwind.',
    ar: 'القيم التي تقوم عليها كل شاشة. تُعرَّف مرة واحدة في ‎src/index.css‎ وتُقرأ عبر Tailwind.',
  },
  dsColToken: { en: 'Token', ar: 'الرمز' },
  dsColValue: { en: 'Value', ar: 'القيمة' },
  dsColUse: { en: 'Used for', ar: 'يُستخدم لـ' },
  dsColSample: { en: 'Sample', ar: 'عيّنة' },
  dsColClass: { en: 'Class', ar: 'الصنف' },

  dsColourSurfaces: { en: 'Surfaces and text', ar: 'الأسطح والنصوص' },
  dsColourBrand: { en: 'Brand', ar: 'العلامة' },
  dsColourStatus: { en: 'Status', ar: 'الحالات' },
  dsColourLearner: { en: 'Learner tier', ar: 'فئة المتعلم' },
  dsTypeScale: { en: 'Type scale', ar: 'سلم الخطوط' },
  dsRadiusShadow: { en: 'Radius and shadow', ar: 'الزوايا والظلال' },
  dsSpacing: { en: 'Spacing', ar: 'المسافات' },
  dsFonts: { en: 'Typefaces', ar: 'الخطوط' },

  dsUseBackground: { en: 'Page behind the content', ar: 'خلفية الصفحة' },
  dsUseSurface: { en: 'Cards, sidebars, table headers', ar: 'البطاقات والأشرطة الجانبية ورؤوس الجداول' },
  dsUseSurfaceSunken: { en: 'Wells and inset areas', ar: 'المناطق الغائرة' },
  dsUseForeground: { en: 'Body text and headings', ar: 'النصوص والعناوين' },
  dsUseMuted: { en: 'Quiet fills', ar: 'التعبئات الهادئة' },
  dsUseMutedFg: { en: 'Secondary and label text', ar: 'النصوص الثانوية والعناوين الفرعية' },
  dsUseBorder: { en: 'Default lines', ar: 'الخطوط الافتراضية' },
  dsUseBorderStrong: { en: 'Control outlines', ar: 'حدود عناصر التحكم' },
  dsUseRing: { en: 'Focus ring', ar: 'حلقة التركيز' },
  dsUsePrimary: { en: 'Primary buttons and checked controls', ar: 'الأزرار الأساسية والعناصر المحدّدة' },
  dsUseAccent: { en: 'The one primary action on a screen', ar: 'الإجراء الأساسي الوحيد في الشاشة' },
  dsUseSuccess: { en: 'On track', ar: 'على المسار' },
  dsUseWarning: { en: 'Watch', ar: 'للمتابعة' },
  dsUseDanger: { en: 'At risk, staff screens only', ar: 'متعثر، في شاشات الطاقم فقط' },
  dsUseTint: { en: 'Pill backgrounds', ar: 'خلفيات الشارات' },
  dsUseLearnerSurface: { en: 'Early tier page', ar: 'صفحة الفئة المبكرة' },
  dsUseLearnerSidebar: { en: 'Early tier cards', ar: 'بطاقات الفئة المبكرة' },
  dsUseLearnerPrimary: { en: 'Early tier actions and stars', ar: 'إجراءات الفئة المبكرة ونجومها' },
  dsUseLearnerNext: { en: 'The next thing to do', ar: 'الخطوة التالية' },

  dsAccentRule: {
    en: 'Yellow is an accent and never a surface on staff screens. One accent action per screen, or it stops reading as emphasis.',
    ar: 'الأصفر لون إبراز لا سطح في شاشات الطاقم. إجراء مُبرز واحد لكل شاشة، وإلا فقد معناه.',
  },
  dsNoRedRule: {
    en: 'The danger colour never appears in the learner tier. A six year old does not need to be told they are at risk in red.',
    ar: 'لون الخطر لا يظهر في فئة المتعلم إطلاقاً. فالطفل في السادسة لا يحتاج أن يُقال له بالأحمر إنه متعثر.',
  },
  dsFontNote: {
    en: 'One family covers both scripts, so a mixed Arabic and English line does not change typeface mid sentence.',
    ar: 'عائلة خطوط واحدة تغطي النصين، فلا يتغير الخط في منتصف الجملة عند خلط العربية والإنجليزية.',
  },
  dsTabularNote: {
    en: 'Any figure in a column carries .tabular so the digits line up.',
    ar: 'كل رقم في عمود يحمل ‎.tabular‎ لتتراصف الخانات.',
  },
} satisfies Record<string, Phrase>
