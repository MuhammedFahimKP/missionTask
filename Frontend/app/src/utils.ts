export function getAllSearchParams(params: URLSearchParams) {
  const paramsObj: { [key: string]: string | string[] } = {};

  for (const [key, value] of params.entries()) {
    paramsObj[key] = value;
  }

  return paramsObj;
}
