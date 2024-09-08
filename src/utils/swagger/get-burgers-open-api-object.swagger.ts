import { OpenAPIObject } from '@nestjs/swagger';
import { filterPathsOpenAPI } from './utils/filtered-path.swagger';
import { filterSchemasOpenAPI } from './utils/filtered-schema.swagger';

export function getBurgersOpenAPIObject(
  globalDocument: OpenAPIObject,
): OpenAPIObject {
  const prefix = `/api/burgers`;
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
