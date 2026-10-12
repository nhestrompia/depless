export function groupByCategory(items) {
  return items.reduce((groups, item) => {
    (groups[item.category] ??= []).push(item);
    return groups;
  }, {});
}
