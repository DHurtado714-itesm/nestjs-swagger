import { OpenAPIObject } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { isReferenceObject } from './is-reference-object.swagger';

/**
 * Copies nested schemas from the global document to the target object.
 *
 * @param globalDocument - The global OpenAPI document.
 * @param schema - The schema object or reference to copy.
 * @param target - The target object to copy the nested schemas to.
 */
export function copyNestedSchemas(
  globalDocument: OpenAPIObject,
  schema: SchemaObject | ReferenceObject,
  target: Record<string, SchemaObject | ReferenceObject>,
): void {
  if (isReferenceObject(schema)) {
    const refKey = schema.$ref.split('/').pop();
    if (refKey && !target[refKey]) {
      const nestedSchema = globalDocument.components?.schemas?.[refKey];
      if (nestedSchema) {
        target[refKey] = nestedSchema;
        copyNestedSchemas(globalDocument, nestedSchema, target);
      }
    }
  } else {
    if (schema.properties) {
      Object.values(schema.properties).forEach((property) => {
        copyNestedSchemas(globalDocument, property, target);
      });
    }
    if (schema.items) {
      copyNestedSchemas(globalDocument, schema.items, target);
    }

    if (
      schema.additionalProperties &&
      typeof schema.additionalProperties === 'object'
    ) {
      copyNestedSchemas(globalDocument, schema.additionalProperties, target);
    }
    if (schema.allOf) {
      schema.allOf.forEach((subSchema) => {
        copyNestedSchemas(globalDocument, subSchema, target);
      });
    }
    if (schema.oneOf) {
      schema.oneOf.forEach((subSchema) => {
        copyNestedSchemas(globalDocument, subSchema, target);
      });
    }
    if (schema.anyOf) {
      schema.anyOf.forEach((subSchema) => {
        copyNestedSchemas(globalDocument, subSchema, target);
      });
    }
  }
}
