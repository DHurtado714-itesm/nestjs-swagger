import { OpenAPIObject } from '@nestjs/swagger';
import { PathItemObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

/**
 * Filters the paths of an OpenAPI document based on a prefix.
 *
 * @param globalDocument - The global OpenAPI document.
 * @param prefix - The prefix to filter the paths.
 * @returns The filtered paths as a record of path items.
 */
export function filterPathsOpenAPI(
  globalDocument: OpenAPIObject,
  prefix: string,
): Record<string, PathItemObject> {
  return Object.keys(globalDocument.paths ?? {})
    .filter((path) => path.startsWith(prefix))
    .reduce((obj: Record<string, PathItemObject>, key) => {
      const pathItem = globalDocument.paths?.[key];
      if (pathItem) {
        obj[key] = pathItem;
      }
      return obj;
    }, {});
}
