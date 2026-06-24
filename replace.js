const fs = require('fs');
const file = 'src/app/features/dashboard/dashboard.component.css';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\.metric-emoji \{[^}]+\}/g, `.metric-emoji {
  font-size: 26px;
  background: var(--lm-color-surface-elevated);
  border-radius: var(--lm-radius-sm);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--lm-shadow-card);
  flex-shrink: 0;
}`);

content = content.replace(/\.metric-chip-val \{[^}]+\}/g, `.metric-chip-val {
  font: var(--lm-type-heading-sm);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--lm-color-text-primary);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
}`);

content = content.replace(/\.metric-chip-lbl \{[^}]+\}/g, `.metric-chip-lbl {
  font: var(--lm-type-overline);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--lm-color-text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}`);

content = content.replace(/\.metric-chip \{\s+display: flex;\s+align-items: center;\s+gap: var\(--lm-space-sm\);\s+min-width: 0;\s+\}/g, `.metric-chip {
  display: flex;
  align-items: center;
  gap: var(--lm-space-md);
  min-width: 0;
}`);

fs.writeFileSync(file, content);
