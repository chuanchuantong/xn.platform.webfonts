// store.js文件
const _ = require('lodash')
module.exports = _.template(`
//--------------------------- 代码自动生成开始 ----------------------------------------------------------
/*! build time: <%=new Date().toLocaleString()%> */
/*! Author: yhli                                 */
/*! Email: liyahui360@163.com                    */
// <%=importTypeArray.join(', ')%>
import { <%=importTypeArray.join(', ')%> } from '../types'
import axios from "axios"
// store module
export default {
  actions: {
    <%_.each(items, function(item, i){%>
      <%if(i>0){%>,<%}%>  
      <%if(item.httpMethod == 'post'){%>
        [<%=item.NAME%>]({commit}, 
          <%_.each(item.params, function(param){%>
             <%=param%>,
          <%})%>
          <%=item.ajaxParam%>
          ={}) {
            return new Promise(function(resolve, reject){
              axios.post('<%=item.url%>',<%=item.ajaxParam%>).then(data=>{
                resolve(data)
              })
            });
          }
      <%}%>
    <%})%>
  }
}
//--------------------------- 代码自动生成结束 ----------------------------------------------------------
`)