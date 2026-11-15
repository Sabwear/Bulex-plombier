/** Client-safe request deadline. A timeout means delivery is unknown, never a safe automatic retry. */
export class EnquiryTimeoutError extends Error{constructor(){super('Delivery could not be confirmed before the request deadline.');this.name='EnquiryTimeoutError';}}
export async function submitEnquiry(data:FormData,options:{timeoutMs?:number;fetchImpl?:typeof fetch}={}){
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),options.timeoutMs??60000);
 try{const response=await (options.fetchImpl||fetch)('/api/mail',{method:'POST',body:data,signal:controller.signal});const result=await response.json();return{response,result};}
 catch(error){if(controller.signal.aborted)throw new EnquiryTimeoutError();throw error;}
 finally{clearTimeout(timer);}
}
