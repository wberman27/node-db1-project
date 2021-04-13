const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  try{
    if(!req.body.name || !req.body.budget){
      res.status(400).json({ message: "name and budget are required" })
    }else{
      if(typeof req.body.name !== "string"){
        res.status(400).json({ message: "name of account must be a string" })
      }else{
        if(req.body.name.trim().length < 3 || req.body.name.trim().length > 100){
          res.status(400).json({ message: "name of account must be between 3 and 100" })
        }else{
          if(typeof req.body.budget !== "number"){
            res.status(400).json({ message: "budget of account must be a number" })
          }else{
            if(req.body.budget < 0 || req.body.budget > 1000000){
              res.status(400).json({ message: "budget of account is too large or too small" })
            }else{
              next()
            }
          }
        }
      }
    }
  }catch(err){
    next(err)
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  try{
    const account = await Accounts.getById(req.params.id)
    if(account){
      req.account = account;
      next()
    }else{
      res.status(404).json({ message: "account not found" })
    }
  }catch(err){
    next(err)
  }
}
