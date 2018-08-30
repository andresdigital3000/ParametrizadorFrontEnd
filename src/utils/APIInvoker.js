var configuration = require('../../config')
const debug = configuration.debugMode

class APIInvoker {
  getAPIHeader(){
    return ({
      "Content-Type":"application/json",
      "Access-Control-Allow-Headers":"*",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Methods":"*",
      authorization: window.localStorage.getItem("token")
    })
  }

  invokeGET(url,okCallback,failCallback){
    let params = {
      method: 'get',
      headers: this.getAPIHeader()
    }
    this.invoke(url, okCallback, failCallback, params);
  }

  invokePUT(url,body,okCallback,failCallback){
    let params = {
      method:'put',
      headers: this.getAPIHeader(),
      body: JSON.stringify(body)
    };
    this.invoke(url, okCallback, failCallback, params);
  }

  invokePOST(url,body,okCallback,failCallback){
    let params = {
      method:'post',
      headers: this.getAPIHeader(),
      body: JSON.stringify(body)
    };
    this.invoke(url, okCallback, failCallback, params);
  }

  invokePATCH(url,body,okCallback,failCallback){
    let params = {
      method:'patch',
      headers: this.getAPIHeader(),
      body: JSON.stringify(body)
    };
    this.invoke(url, okCallback, failCallback, params);
  }

  invokeDELETE(url,idregistro,okCallback,failCallback){
    let params = {
      headers: this.getAPIHeader(),
      method:'delete'
    };
    this.invoke(url, okCallback, failCallback, params);
  }

  invoke(url, okCallback, failCallback, params){
    if(debug){
      console.log("Invoke => " + params.method + ":" + url );
      console.log(params);
    }
    let host_api
    if(configuration.server.port!=""){
      fetch(`${configuration.server.host}:${configuration.server.port}${url}`,params)
        .then((response)=>{
        if(debug){
          console.log("Response => ");
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
          console.log("Sin respuesta de Backend")
        }
      })
    }
  }
}
export default new APIInvoker();
