var configuration = require('../../config')
const debug = configuration.debugMode

class APIInvoker {
  getAPIHeader(){
    return ({
      "Content-Type":"application/json",
      "Access-Control-Allow-Headers":"*",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Methods":"*",
      authorization : window.localStorage.getItem("token")
    })
  }

  invokeGET(url,okCallback,failCallback){
    let params = {
      method: 'get',
      mode : 'cors',
      headers: this.getAPIHeader()
    }
    this.invoke(url, okCallback, failCallback, params);
  }

  invokePUT(url,body,okCallback,failCallback){
    let params = {
      method:'put',
      mode : 'cors',
      headers: this.getAPIHeader(),
      body: JSON.stringify(body)
    };
    this.invoke(url, okCallback, failCallback, params);
  }

  invokePOST(url,body,okCallback,failCallback){
    let params = {
      method:'post',
      mode : 'cors',
      headers: this.getAPIHeader(),
      body: JSON.stringify(body)
    };
    this.invoke(url, okCallback, failCallback, params);
  }

  invokePOST_Login(url,body,okCallback,failCallback){
    let params = {
      method:'post',
      mode : 'cors',
      headers: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Headers":"*",
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"*",
        authorization : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6IiIsInN1YiI6ImFkbWluIiwiaXNzIjoicGFyYW1ldHJpemFkb3JDbGFybyIsImlhdCI6MTU0NDIwMDEwOX0.bhMpR7muO6ebXzuKOdnY3s1UfQPiIRWOpLkvjZbkEybFs_n3ZboquLUHc-jt2ErVNFj9de6TnjLQvc5XQWeXlQ"
      },
      body: JSON.stringify(body)
    };
    this.invokeLogin(url, okCallback, failCallback, params);
  }

  invokePATCH(url,body,okCallback,failCallback){
    let params = {
      method:'patch',
      mode : 'cors',
      headers: this.getAPIHeader(),
      body: JSON.stringify(body)
    };
    this.invoke(url, okCallback, failCallback, params);
  }

  invokeDELETE(url,idregistro,okCallback,failCallback){
    let params = {
      headers: this.getAPIHeader(),
      method:'delete',
      mode : 'cors'
    };
    this.invoke(url, okCallback, failCallback, params);
  }

  invoke(url, okCallback, failCallback, params){
    if(debug){
      console.log("Invoke => " + params.method + ":" + url );
      console.log(params);
    }
    if(configuration.server.port!=""){
      fetch(`${configuration.server.host}:${configuration.server.port}${url}`,params)
        .then((response)=>{
        if(debug){
          console.log("Response ==>",response);
        }
        return response.json()
      })
      .then((responseData)=>{
        if(debug){
          console.log("Response Data =>", responseData)
        }
        if(responseData){
          okCallback(responseData)
        }else{
          console.log("Sin respuesta de Backend")
        }
      })
    }else{
      fetch(`${configuration.server.host}${url}`,params)
        .then((response)=>{
        if(debug){
          console.log("Invoke Response => ");
          console.log(response);
        }
        return response.json()
      })
      .then((responseData)=>{
        if(debug){
          console.log("Response Data =>")
          console.log(responseData)
        }
        if(responseData){
          okCallback(responseData)
        }else{
          console.log("Sin respuesta")
        }
      })
    }
  }

  invokeLogin(url, okCallback, failCallback, params){
    if(configuration.server.port!=""){
      fetch(`${configuration.server.host}:${configuration.server.port}${url}`,params)
        .then((response)=>{
          return response
      })
      .then((responseData)=>{
        if(responseData){
          okCallback(responseData)
        }else{
          console.log("Sin respuesta de Backend")
        }
      })
    }else{
      fetch(`${configuration.server.host}${url}`,params)
        .then((response)=>{
          return response
      })
      .then((responseData)=>{
        if(responseData){
          okCallback(responseData)
        }else{
          console.log("Sin respuesta de Backend")
        }
      })
    }
  }
}
export default new APIInvoker();
