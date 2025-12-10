import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, callback) => {
      const folder =
        file.fieldname === 'resume'
          ? './uploads/resumes'
          : './uploads/cover-letters';
      callback(null, folder);
    },
    filename: (req, file, callback) => {
      const unique = `${Date.now()}-${Math.random()}${extname(
        file.originalname,
      )}`;
      callback(null, unique);
    },
  }),
};
