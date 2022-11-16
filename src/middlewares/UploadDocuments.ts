import multer from "multer";
import path from "path";
import fs from "fs";
import mime from "mime-types";
import { Request } from "express-serve-static-core";

export class UploadDocuments implements  multer.Options{
    private URL: string = path.basename("uploads");

    public storage = multer.diskStorage({
        //Criar o destino do arquivo
        destination: (req, file, cb) => {
            //Verifica se não existe o diretório
            if (!fs.existsSync(this.URL)) {
                //Efetua a criação do diretório caso ele não exista
                fs.mkdirSync(this.URL);
            }
            //Define o caminho da pasta
            cb(null, this.URL);
        },
        //Renomeia o arquivo
        filename: (req, file, cb) => {
            //Aqui vamos usar o mime-type para chegar o tipo do arquivo
            //E predefinir como ele veio até nosso sistema
            const type = mime.extension(file.mimetype);
            //Renomeia o nome do arquivo
            //Aqui temos o nome do arquivo gerado pelo Date
            //E colocamos a extensão dele de acordo com o mime-type
            cb(null, `${new Date().getTime()}.${type}`);
        },
    });

    public fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }

    // public fileFilter = (
    //         req: Request,
    //         file: Express.Multer.File,
    //         cb: multer.FileFilterCallback
    //     ) => {
    //         //Utilizaremos a Lib mime-types para identificar o tipo do arquivo
    //         const type = mime.extension(file.mimetype);
    //
    //         /*
    //           Este array será montado a conditions de validação
    //           No caso aceitará apenas imagens como "png", "jpg", "jpeg"
    //         */
    //         const conditions = ["png", "jpg", "jpeg"];
    //
    //         //Perguntamos se existe algum desses valores no type
    //         if (conditions.includes(`${type}`)) {
    //             //Caso exista, teremos nossa imagem linda maravilhosa
    //             cb(null, true);
    //         }
    //
    //         //Caso não de certo a validação não efetuaremos o upload
    //         cb(null, false);
    //     };

    public limits = {
        fileSize: 1024 * 1024 * 10,
    }


    // get getConfig(): multer.Options {
    //     /*
    //       Essa configuração vai nos ajudar com
    //       1 - A compor as configs do Multer como Middleware em nossas rotas
    //       2 - Não será um middleware global e sim para usos unicos e comportamentais
    //     */
    //     return {
    //
    //         //Storage serve para compor a config do multer destination e filename
    //         storage: this.storage,
    //         limits: this.limits,
    //         //FileFilter serve para validar o filtro de arquivos
    //         fileFilter: this.fileFilter,
    //     };
    // }
}

// export const uploadDocuments;