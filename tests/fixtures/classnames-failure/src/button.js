import clsx from 'clsx';

const inherited = { base: true };

export function buttonClass(active) {
  const flags = Object.assign(Object.create(inherited), { active });
  return clsx(flags);
}
