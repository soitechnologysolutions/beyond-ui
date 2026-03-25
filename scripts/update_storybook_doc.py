import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STORYBOOK_DIR = ROOT / 'skills' / 'public' / 'beyond-ui-helper' / 'references' / 'storybook'

def write_markdown(rel_path, title, usage, props=None, notes=None, source=None):
    path = STORYBOOK_DIR / rel_path
    path.parent.mkdir(parents=True, exist_ok=True)

    lines = [f"# {title}", '', '## Usage', '```tsx', usage.strip(), '```', '']

    if props:
        lines.extend(['## Props', '| Prop | Type | Description |', '|------|------|-------------|'])
        for name, typ, desc in props:
            lines.append(f"| {name} | {typ} | {desc} |")
        lines.append('')

    if notes:
        lines.append('## Notes')
        for note in notes:
            lines.append(f"- {note}")
        lines.append('')

    if source:
        lines.append(f"Story source: {source}")

    path.write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print(f"Updated {path.relative_to(ROOT)}")

# Update docs/config
write_markdown(
    'layout/dashboard-header.md',
    'DashboardHeader',
    '''
import { DashboardHeader } from '@beyondcorp/beyond-ui';
import { Button } from '@beyondcorp/beyond-ui';
import '@beyondcorp/beyond-ui/dist/styles.css';

export function ReportsHeader() {
  return (
    <DashboardHeader
      breadcrumbs={[{ label: 'Home', href: '#' }, { label: 'Reports' }]}
      title="Reports Overview"
      description="Track, measure, and export key analytics."
      actions={<Button variant="primary" size="sm">Add Widget</Button>}
      showSearch
      searchPlaceholder="Search reports..."
    />
  );
}
    ''',
    props=[
        ('breadcrumbs', "{ label: string; href?: string }[]", 'Breadcrumb trail items'),
        ('showSearch', 'boolean', 'Whether to render the search input'),
        ('searchPlaceholder', 'string', 'Placeholder text for search input'),
        ('onSearchChange', '(value: string) => void', 'Search change callback'),
        ('actions', 'ReactNode', 'Right-aligned action slot (buttons etc.)'),
        ('title', 'string', 'Optional header title'),
        ('description', 'string', 'Optional supporting description'),
        ('showMenuButton', 'ResponsiveShow', 'Toggle visibility of menu button'),
    ],
    notes=[
        'Automatically adapts to sidebar collapse; width adjusts as layout shifts.',
        'Use with DashboardLayout for full-page shells; breadcrumbs collapse responsively.',
    ],
    source='stories/DashboardHeader.stories.tsx'
)
