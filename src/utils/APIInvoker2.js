var configuration = require('../../config')
const debug = configuration.debugMode

class APIInvoker2 {

  getAPIHeader(){
    return {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem("token")
        //authorization: this.getToken(),
    }
  }

  getAPIUploadHeader(){
    return {
        'Content-Type': 'multipart/form-data',
        authorization: window.localStorage.getItem("token")
        //authorization: this.getToken(),
    }
  }

  invokeGET(url, okCallback, failCallback){
    let params = {
      method: 'get',
      headers: this.getAPIHeader()
    }
    this.invoke(url, okCallback, failCallback,params);
  }

  invokePUT(url, body, okCallback, failCallback){
    let params = {
      method: 'put',
      headers: this.getAPIHeader(),
      body: JSON.stringify(body)
    };

    this.invoke(url, okCallback, failCallback,params);
  }

  invokePOST(url, body, okCallback, failCallback){
    let params = {
      method: 'post',
      headers: this.getAPIHeader(),
      body: JSON.stringify(body)
    };

    this.invoke(url, okCallback, failCallback,params);
  }

  invokeUpload(url, body, okCallback, failCallback){
    let params = {
      method: 'post',
      headers: this.getAPIUploadHeader(),
      body: JSON.stringify(body)
    };

    this.invoke(url, okCallback, failCallback,params);
  }

  invokeDELETE(url, body, okCallback, failCallback){
    let params = {
      method: 'delete',
      headers: this.getAPIHeader(),
      body: JSON.stringify(body)
    };

    this.invoke(url, okCallback, failCallback,params);
  }

  invoke(url, okCallback, failCallback,params){
    if(debug){
      console.log("Invoke => " + params.method + ":" + url );
      console.log(params.body);
    }

    fetch(`${configuration.server.host}${url}`, params)
    .then((response) => {
      return response.json()
    })
    .then((responseData) => {
      if(debug){
        console.log("Invoke Response => ", responseData);
      }

      if(responseData.ok){
        okCallback(responseData)
      }else{
        failCallback(responseData)
      }
    })
  }
  //
  // getToken() {
  //   var name =  "token=";
  //   var decodedCookie = decodeURIComponent(document.cookie);
  //   var ca = decodedCookie.split(';');
  //   for(var i = 0; i <ca.length; i++) {
  //       var c = ca[i];
  //       while (c.charAt(0) == ' ') {
  //           c = c.substring(1);
  //       }
  //       if (c.indexOf(name) == 0) {
  //           return c.substring(name.length, c.length);
  //       }
  //   }
  //   return "";
  // }
}
export default new APIInvoker2();
