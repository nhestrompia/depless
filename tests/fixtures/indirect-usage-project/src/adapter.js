export async function loadAdapter() {
  const packageName = process.env.ADAPTER_PACKAGE ?? 'optional-adapter';
  return import(packageName);
}
