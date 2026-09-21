"""Generate dark-mode overrides for src/styles.css (section 1 of src/theme-dark.css).

Usage: python3 tools/gen-dark-css.py src/styles.css out.css report.json
Then diff out.css against section 1 of theme-dark.css. Sections 2 and 3 there
are hand-written and are not produced by this script. report.json lists every
colour the tables do not know, so a new colour in styles.css shows up there
instead of silently staying light in dark mode.

Every colour literal is mapped by the job its property does, mirroring the
iOS palette roles in docs/DARK_MODE.md: a white fill is a card face
(surface), white text sits on a button and stays white, and so on.
Anything not in a table is left alone and reported for review.
"""
import re, sys, json

SRC = sys.argv[1]
OUT = sys.argv[2]
REPORT = sys.argv[3]

# ---- role tables: light hex -> dark hex (docs/DARK_MODE.md) ----
FILL = {
    'ffffff': '1e293b',  # surface
    'f8fafc': '0f172a',  # pageBackground
    'f1f5f9': '172033',  # surfaceSunken
    'e2e8f0': '334155',  # surfaceTrack
    'cbd5e1': '475569',  # surfaceTrackStrong
    '94a3b8': '475569',
    '0f172a': 'f1f5f9',  # inkFill (reverses to a light button)
    'eef2ff': '2a335c',  # surfaceAccent
    'e0e7ff': '3a4184',
    'eff6ff': '233759',  # surfaceInfo
    'f5f3ff': '2f3159',  # surfaceLilac
    'f4f3ff': '2a335c',
    'ecfdf5': '1c4046',  # surfaceSuccess
    'dcfce7': '1b4c4c',  # surfaceSuccessDeep
    'f0fdf4': '1d3742',  # surfaceSuccessPale
    'd1fae5': '195b53',
    'fffbeb': '3c3934',  # surfaceWarning
    'fff7ed': '3d3336',  # surfaceWarningWarm
    'fffaf0': '323337',  # surfaceWarningPale
    'fef3c7': '5e4c2d',
    'fff1f2': '3f2d3c',  # surfaceDanger
    'fee2e2': '5d313e',
    'ffe4e6': '5d313e',
    'edf2f7': '243044',  # surfaceNeutralTile
    'f5f6f2': '243044',  # surfaceSettingTile
    'edf0f8': '243044',
    'f8f9fb': '172033',
    '4f46e5': '6366f1',  # accentFill
    # off-scale tints found in styles.css, folded into the nearest role
    'eef2f7': '243044', 'edf0ea': '243044',
    'efefff': '2a335c',
    'ffedd5': '3d3336',
    'f8fffb': '1d3742', 'fbfdf9': '1d3742', 'f0fbf4': '1d3742',
    'e8f7ee': '1c4046',
}
TEXT = {
    '0f172a': 'f1f5f9',  # textPrimary
    '1e293b': 'e2e8f0',  # textStrong
    '334155': 'cbd5e1',  # textMid
    '475569': 'cbd5e1',  # textBody
    '64748b': '94a3b8',  # textSecondary
    '94a3b8': '64748b',  # textTertiary
    'cbd5e1': '475569',
    '4f46e5': '818cf8',  # accentForeground
    '6366f1': '818cf8',
    '818cf8': 'a5b4fc',
    '4338ca': 'a5b4fc',  # accentDeep
    'a5b4fc': 'c7d2fe',
    '10b981': '34d399',  # feedbackCorrect / textModeDaily
    '059669': '34d399',  # textSuccess
    '047857': '6ee7b7',  # textSuccessDeep
    '15803d': '4ade80',  # textSuccessMid
    '16a34a': '4ade80',
    'b45309': 'fbbf24',  # textWarning
    'd97706': 'fbbf24',
    'ef4444': 'f87171',  # feedbackWrong
    'dc2626': 'f87171',
    'e11d48': 'fb7185',
    '0ea5e9': '38bdf8',  # textModeEndless
    '2563eb': '60a5fa',  # gameNBackBlue / gameSchulteBlue
    '7c3aed': 'a78bfa',  # gameRuleVioletText
    'ffffff': 'ffffff',  # textOnAccent stays white
    # off-scale greys and inks, folded into the slate text roles
    '7d8794': '94a3b8', '7b8490': '94a3b8', '8490a0': '94a3b8', '68737b': '94a3b8',
    '6f847a': '94a3b8', '84958d': '94a3b8', '8a938d': '94a3b8',
    '77818b': '94a3b8',  # textComingSoonBody -> textSecondary (spec)
    'a1a8a6': '64748b',  # textComingSoonBadge -> textTertiary (spec)
    '38564a': 'cbd5e1',
    '17352b': 'e2e8f0',
    '312e81': 'c7d2fe',
    '065f46': '6ee7b7',
    '0f9f72': '34d399',
    'e4a11b': 'fbbf24',  # featureIconAmber
    '5b55e8': '818cf8',  # featureIconIndigo
}
BORDER = {
    'e2e8f0': '334155',  # stroke
    'f1f5f9': '273449',  # strokeSubtle
    'f8fafc': '273449',
    'cbd5e1': '475569',  # strokeStrong
    'e4e7df': '334155',  # strokeWarm
    'e6e9e2': '334155',
    'e0e7ff': '3a4184',  # strokeAccent
    'eef2ff': '3a4184',
    'c7d2fe': '444a9f',  # strokeAccentDeep
    'dbeafe': '28487c',  # strokeInfo
    'd1fae5': '195b53',  # strokeSuccess
    'ecfdf5': '195b53',
    'bbf7d0': '186a5a',  # strokeSuccessDeep
    'a7f3d0': '17715e',  # strokeSuccessMint
    'fef3c7': '5e4c2d',  # strokeWarning
    'fee2e2': '5d313e',  # strokeDanger
    'fecdd3': '5d313e',  # strokeRose
    '94a3b8': '64748b',
    'edf0f8': '334155', 'eceee8': '334155', 'd1d5db': '475569',
    'dddafe': '3a4184', 'dedcff': '3a4184',  # featureIconIndigoLine
    'dbe9df': '195b53', 'd7eee0': '195b53',
    'fed7aa': '5e4c2d', 'f9e6b2': '5e4c2d',  # featureIconAmberLine
    '4f46e5': '818cf8',  # an accent outline is a foreground
}
SHADOW_RGB = {(15, 23, 42), (30, 41, 59), (0, 0, 0), (51, 65, 85), (100, 116, 139)}

def category(prop):
    p = prop.strip().lower()
    if p in ('color', '-webkit-text-fill-color', 'caret-color'):
        return 'text'
    if p in ('box-shadow', 'text-shadow') or p == 'filter':
        return 'shadow'
    if p.startswith('border') or p.startswith('outline') or p in ('stroke', 'text-decoration-color', 'column-rule-color'):
        return 'border'
    if p.startswith('background') or p == 'fill':
        return 'fill'
    return None

HEX = re.compile(r'#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b')
RGBA = re.compile(r'rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)')

def norm(h):
    h = h.lower()
    return ''.join(c * 2 for c in h) if len(h) == 3 else h

def hex_rgb(h):
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))

def rgb_hex(t):
    return '%02x%02x%02x' % t

unmapped = []

# White decorations drawn on top of saturated hero colours (the daily card's
# motifs, the weekly report's receipt cover). They are content on a coloured
# face, not frosted panels, so they stay white in dark mode too.
ON_COLOUR = ('.daily-card-hero', '.daily-hero-motif', '.weekly-receipt-cover', '.weekly-receipt-seal')
current_selector = ['']

def map_value(prop, value, where):
    cat = category(prop)
    if cat is None:
        return value, False
    changed = False

    def sub_hex(m):
        nonlocal changed
        h = norm(m.group(1))
        if cat == 'shadow':
            if hex_rgb(h) in SHADOW_RGB:
                changed = changed or h != '000000'
                return '#000000'
            return m.group(0)
        table = {'fill': FILL, 'text': TEXT, 'border': BORDER}[cat]
        if h in table:
            if table[h] != h:
                changed = True
            return '#' + table[h]
        unmapped.append((where, prop, '#' + h))
        return m.group(0)

    def sub_rgba(m):
        nonlocal changed
        r, g, b = int(m.group(1)), int(m.group(2)), int(m.group(3))
        a = m.group(4)
        if cat == 'shadow':
            if (r, g, b) in SHADOW_RGB:
                changed = changed or (r, g, b) != (0, 0, 0)
                return 'rgba(0, 0, 0, %s)' % (a or '1')
            return m.group(0)
        h = rgb_hex((r, g, b))
        # Translucent white washes: in dark they become the same wash of the
        # card colour, otherwise frosted panels glow.
        if h == 'ffffff' and cat in ('fill', 'border') and not any(k in current_selector[0] for k in ON_COLOUR):
            changed = True
            tgt = (30, 41, 59) if cat == 'fill' else (51, 65, 85)
            return 'rgba(%d, %d, %d, %s)' % (tgt + (a or '1',))
        # Scrims built from the ink colour stay dark (surfaceInverse).
        if (r, g, b) in ((15, 23, 42), (30, 41, 59)) and cat == 'fill':
            changed = True
            return 'rgba(2, 6, 23, %s)' % (a or '1')
        table = {'fill': FILL, 'text': TEXT, 'border': BORDER}[cat]
        if a is None and h in table:
            changed = changed or table[h] != h
            return '#' + table[h]
        if h in table and cat != 'fill':
            changed = True
            t = hex_rgb(table[h])
            return 'rgba(%d, %d, %d, %s)' % (t + (a,))
        # Coloured tints (green wash over a card, etc.) read correctly on the
        # dark card as they are: principle 3.
        return m.group(0)

    out = HEX.sub(sub_hex, value)
    out = RGBA.sub(sub_rgba, out)
    return out, changed

# ---- a tiny CSS walker: top-level rules, one level of @media, keyframes ----
def strip_comments(s):
    return re.sub(r'/\*.*?\*/', '', s, flags=re.S)

def blocks(s):
    """Yield (prelude, body) for top-level blocks."""
    i, n = 0, len(s)
    while i < n:
        j = s.find('{', i)
        if j < 0:
            break
        prelude = s[i:j].strip()
        depth, k = 1, j + 1
        while depth and k < n:
            if s[k] == '{':
                depth += 1
            elif s[k] == '}':
                depth -= 1
            k += 1
        yield prelude, s[j + 1:k - 1]
        i = k

def decls(body):
    for part in body.split(';'):
        if ':' not in part:
            continue
        prop, val = part.split(':', 1)
        yield prop.strip(), val.strip()

def darken_selector(sel):
    parts = [p.strip() for p in sel.split(',') if p.strip()]
    out = []
    for p in parts:
        if p.startswith(':root') or p == 'html':
            out.append('html.theme-dark')
        elif p.startswith('html'):
            out.append('html.theme-dark' + p[4:])
        elif p.startswith('body'):
            out.append('html.theme-dark ' + p)
        else:
            out.append('html.theme-dark ' + p)
    return ',\n'.join(out)

def rule_override(selector, body, where):
    current_selector[0] = selector
    lines = []
    ink_button = False
    parsed = list(decls(body))
    for prop, val in parsed:
        if category(prop) == 'fill' and re.search(r'#0f172a\b', val, re.I) and 'gradient' not in val:
            ink_button = True
    for prop, val in parsed:
        important = '!important' in val
        clean = val.replace('!important', '').strip()
        new, changed = map_value(prop, clean, where)
        # inkFill buttons reverse to light, so their white label turns dark.
        if ink_button and category(prop) == 'text' and clean.lower() in ('#fff', '#ffffff', 'white'):
            new, changed = '#0f172a', True
        # Re-emit every colour declaration, changed or not, so the dark
        # override keeps exactly the specificity battles the light rules win.
        if changed or (category(prop) and (HEX.search(clean) or RGBA.search(clean))):
            lines.append('    %s: %s%s;' % (prop, new, ' !important' if important else ''))
    if not lines:
        return None
    return '%s {\n%s\n}' % (darken_selector(selector), '\n'.join(lines))

css = strip_comments(open(SRC, encoding='utf-8').read())
out = []
skipped_keyframes = []
for prelude, body in blocks(css):
    if prelude.startswith('@keyframes'):
        if HEX.search(body) or RGBA.search(body):
            skipped_keyframes.append(prelude.split()[1])
        continue
    if prelude.startswith('@media') or prelude.startswith('@supports'):
        inner = []
        for p2, b2 in blocks(body):
            r = rule_override(p2, b2, prelude + ' ' + p2)
            if r:
                inner.append('    ' + r.replace('\n', '\n    '))
        if inner:
            out.append('%s {\n%s\n}' % (prelude, '\n\n'.join(inner)))
        continue
    if prelude.startswith('@'):
        continue
    r = rule_override(prelude, body, prelude)
    if r:
        out.append(r)

open(OUT, 'w', encoding='utf-8').write('\n\n'.join(out) + '\n')
json.dump({'unmapped': unmapped, 'keyframes_with_colour': skipped_keyframes},
          open(REPORT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('rules written:', len(out))
print('unmapped literals:', len(unmapped))
print('keyframes needing hand work:', skipped_keyframes)
