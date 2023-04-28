import 'tsconfig-paths/register';
import fs from 'fs';
import { printSchema } from 'graphql';
import path from 'path';

import { schema } from '../graphql/schema';

console.log('Creating schema.graphql');

const outputFile = path.join(__dirname, '../graphql/schema/schema.graphql');
const schemaSDL = printSchema(schema);

fs.writeFileSync(outputFile, schemaSDL);
console.log('Generated schema.graphql');
