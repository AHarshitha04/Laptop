import React from 'react'

import {key} from './test.js';

const payUPamentPage = ({setToggle,from,hash,transactionId}) => {
  return (
    <div>
        <div>
            <h4>Details</h4>
<div><span>prodect Name:Test Product</span>
<span>Name:{form?.name}</span>
<span>number:{form?.number}</span>
<span>pay Amount:{form?.amount}</span>
</div>
<form action="https://secure.payu.in/_payment" method="POST">
<input type="hidden" name="key" value={key} />
<input type="hidden" name="txnid" value={transactionId} />
<input type="hidden" name="productinfo" value="TEST PRDOUCT" />
<input type="hidden" name="amount" value={form?.amount} />
<input type="hidden" name="email" value={form?.email} />
<input type="hidden" name="firstname" value={form?.name} />
<input type="hidden" name="surl" value="https://localhost:5001/payu/success" />
<input type="hidden" name="furl" value="https://localhost:5001/payu/failure" />
<input type="hidden" name="udf1" value={'datails1'} />
<input type="hidden" name="udf2" value={'datails2'} />
<input type="hidden" name="udf3" value={'datails3'} />
<input type="hidden" name="udf4" value={'datails4'} />
<input type="hidden" name="udf5" value={'datails5'} />
<input type="hidden" name="hash" value={hash}/>
<button type="submit" onClick={()=>{setToggle(1)}}>back</button>
<button type="submit">pay Now</button>
</form>

        </div>
    </div>
  )
}

export default payUPamentPage