import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

/**
 * Checks if the given schema object is a reference object.
 * @param schema - The schema object to check.
 * @returns True if the schema object is a reference object, false otherwise.
 */
export function isReferenceObject(
  schema: SchemaObject | ReferenceObject,
): schema is ReferenceObject {
  return '$ref' in schema;
}
