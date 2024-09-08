import { OpenAPIObject } from '@nestjs/swagger';
import {
  OperationObject,
  PathItemObject,
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { copyNestedSchemas } from './copy-nested-schemas.swagger';

export function filterSchemasOpenAPI(
  globalDocument: OpenAPIObject,
  filteredPaths: Record<string, PathItemObject>,
): Record<string, SchemaObject | ReferenceObject> {
  const filteredSchemas: Record<string, SchemaObject | ReferenceObject> = {};

  Object.values(filteredPaths).forEach((pathItem) => {
    Object.values(pathItem).forEach((operation: OperationObject) => {
      if (operation.responses) {
        Object.values(operation.responses).forEach((response) => {
          if (response && 'content' in response) {
            const schema = response.content?.['application/json']?.schema;
            if (schema) {
              copyNestedSchemas(globalDocument, schema, filteredSchemas);
            }
          }
        });
      }
      if (operation.requestBody && 'content' in operation.requestBody) {
        const schema =
          operation.requestBody.content?.['application/json']?.schema;
        if (schema) {
          copyNestedSchemas(globalDocument, schema, filteredSchemas);
        }
      }
    });
  });

  return filteredSchemas;
}
