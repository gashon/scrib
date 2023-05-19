import express from 'express';
import status from 'http-status';
import logger from '@scrib/api/lib/logger';
import { jwtMiddleware } from '@scrib/api/routes/middleware/auth';
import { upload } from '@scrib/api/utils/upload';
import fileUpload from 'express-fileupload';

const router: express.Router = express.Router();

router.use(fileUpload());

router.post(
  '/upload',
  jwtMiddleware,
  async (req: express.Request, res: express.Response) => {
    const userId = req.locals.user.id;

    if (!req.files) {
      res.status(status.BAD_REQUEST).send('No file uploaded');
      return;
    }

    const file = req.files.file as fileUpload.UploadedFile;
    const { name: fileName, data: fileData } = file;

    try {
      const data = await upload({ userId, fileName, fileData });
      res.status(status.OK).send(data);
    } catch (err) {
      logger.error(`Error uploading file: ${JSON.stringify(err)}`);
      res.status(status.INTERNAL_SERVER_ERROR).send('Error uploading file');
    }

    return;
  }
);

export default router;