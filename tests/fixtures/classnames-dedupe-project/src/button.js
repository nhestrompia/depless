import classNames from 'classnames/dedupe';

export function buttonClass(active) {
  return classNames('button', { active }, { button: false });
}
