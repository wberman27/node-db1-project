const router = require('express').Router()
const mw = require('./accounts-middleware')
const Accounts = require('./accounts-model')

router.get('/', async (req, res, next) => {
  try{
    const data = await Accounts.getAll()
    res.status(200).json(data)
  }catch(err){
    next(err)
  }
})

router.get('/:id', mw.checkAccountId, (req, res) => {
  res.status(200).json(req.account)
})

router.post('/', mw.checkAccountPayload, mw.checkAccountNameUnique, async (req, res, next) => {
  try{
    const newAccount = await Accounts.create({...req.body, name:req.body.name.trim()})
    res.status(201).json(newAccount)
  }catch(err){
    next(err)
  }
})

router.put('/:id', mw.checkAccountId, mw.checkAccountPayload, mw.checkAccountNameUnique, async (req, res, next) => {
  try{
    const updatedAccount = await Accounts.updateById(req.params.id, req.body)
    res.status(200).json(updatedAccount)
  }catch(err){
    next(err)
  }
});

router.delete('/:id', mw.checkAccountId, async (req, res, next) => {
  try{
    const deletedPost = await Accounts.deleteById(req.params.id)
    res.json(deletedPost)
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({message: err.message})
})

module.exports = router;
