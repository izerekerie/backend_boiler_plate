import express from 'express'
import { auth } from '../middlewares/auth';
import { registerDefinition } from 'swaggiffy';
import { getAll, getOne,deleteC,vote,update,create} from '../controllers/candidate';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const candidateRoutes=express.Router();

candidateRoutes.get('/',getAll);
candidateRoutes.post('/',create);
candidateRoutes.post('/:id',update);
candidateRoutes.get('/:id',getOne);
candidateRoutes.post('/vote/:id',auth,vote);
registerDefinition(candidateRoutes, { tags: 'Candidates', mappedSchema: 'Candidate', basePath: '/candidates' });
export default candidateRoutes;
