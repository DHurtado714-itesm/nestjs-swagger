import { OpenAPIObject } from '@nestjs/swagger';
import { filterPathsOpenAPI } from './utils/filtered-path.swagger';
import { filterSchemasOpenAPI } from './utils/filtered-schema.swagger';

export function getPizzasOpenAPIObject(
  globalDocument: OpenAPIObject,
): OpenAPIObject {
  const prefix = `/api/pizzas`;
  const partnerFilteredPaths = filterPathsOpenAPI(globalDocument, prefix);
  const partnerFilteredSchemas = filterSchemasOpenAPI(
    globalDocument,
    partnerFilteredPaths,
  );

  return {
    ...globalDocument,
    paths: partnerFilteredPaths,
    components: {
      ...globalDocument.components,
      schemas: partnerFilteredSchemas,
    },
  };
}
