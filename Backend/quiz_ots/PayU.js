const express = require("express");
const router = express.Router();
const db= require("../databases/db2");
const crypto = require('crypto');
const{key,SALT_KEY} = require('../client/src/component/test');

router.post("/hash",async(req,res)=>{
    const{name,email,amount,productinfo,transactionId}=req.body
    const data={
        key:key,
        salt:SALT_KEY,
        txnid:transactionId,
        amount:amount,
        productinfo:'TEST PRODUCT',
        firstname:name,
        email:email,
        undf1:'details1',
        undf2:'details2',
        undf3:'details3',
        undf4:'details4',
        undf5:'details5',
    }

    const cryp = crypto.createHash('sha512');
    const string =data.key+'|'+data.txnid+'|'+data.amount+'|'+data.productinfo+'|'+data.firstname+'|'+data.email+'|'+data.undf1+'|'+data.undf2+'|'+data.undf3+'|'+data.undf4+'|'+data.undf5+'|'+'||||||'+data.salt;

    cryp.update(string);
    const hash = cryp.digest('hex');
    return res.status(200).send({
        hash:hash,
        transactionId:transactionId,
    })
})

router.post('/success',async(req,res) =>{
    console.log(req.body)
    return res.redirect('http://localhost:3000/success')
    try{}
    catch(error){

    }
})
router.post('/failure',async(req,res) =>{
    console.log(req.body)
    return res.redirect('http://localhost:3000/failure')
    try{}
    catch(error){
        
    }
})

module.exports = router;