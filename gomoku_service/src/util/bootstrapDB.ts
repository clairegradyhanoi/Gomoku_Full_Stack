import 'dotenv/config';
import connect from './connectDB';

import UserModel from '../model/user.model';

const run = async () => {
    try{
        await connect();

        await UserModel.deleteMany();

        process.exit(0);
    } catch (err){
        console.log(err);
        process.exit(1);
    }
}

run(); 