import React from 'react'

// import {key} from './test.js';

const payUPamentPage = ({setToggle,form,hash,transactionId}) => {
  return (
    <div>
        <div>
            <h4>Details</h4>
<div><span>prodect Name:Test Product</span>
<span>Name:{form?.name}</span>
<span>number:{form?.number}</span>
<span>pay Amount:{form?.amount}</span>
</div>
<form action="https://test.payu.in/_payment" method="POST">
  <input type="hidden" name="key" value='3LtnTS' />
  <input type="hidden" name="txnid" value={transactionId} />
  <input type="hidden" name="amount" value={form?.amount} />
  <input type="hidden" name="productinfo" value='TEST PRODUCT' />
  <input type="hidden" name="firstname" value={form?.name} />
  <input type="hidden" name="email" value={form?.email} />
  <input type="hidden" name="phone" value={form?.number} />
  <input type="hidden" name="surl" value="http://localhost:5001/payu/success" />
  <input type="hidden" name="furl" value="http://localhost:5001/payu/failure" />
  <input type="hidden" name="udf1" value={'details1'} />
  <input type="hidden" name="udf2" value={'details2'} />
  <input type="hidden" name="udf3" value={'details3'} />
  <input type="hidden" name="udf4" value={'details4'} />
  <input type="hidden" name="udf5" value={'details5'} />
  <input type="hidden" name="hash" value={hash} />
  <button type="submit" onClick={() => { setToggle(1) }}>back</button>
  <button type="submit">Pay Now</button>
</form>

        </div>
    </div>
  )
}

export default payUPamentPage