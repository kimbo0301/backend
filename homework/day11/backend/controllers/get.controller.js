import { User } from "../models/user.model.js";
export class Getcontroller {

    getUser = async (req,res) => {
        const result = await User.find()
        // result.updateOne({personal:result.personal})
        
        res.send(result)
      }
}