/*
 * @Author: yhli
 * @Email: liyahui360@163.com
 * @Date: 2019-11-24 21:26:27
 * @Last Modified by: yhli
 * @Last Modified time: 2019-11-26 10:25:42
 * @Description: 基础接口提供
 */

import Ajax from '@/lib/ajax'

const BaseApi = {
    //登录接口
   async Login (parmar: any) {
        return await Ajax.post("/api/TokenAuth/Authenticate",parmar);
    },

    async IsTenantAvailable(parmar: any){
        return await Ajax.post('/api/services/app/Account/IsTenantAvailable',parmar);
    },

    async GetCurrentLoginInformations(parmar: any){
        return await Ajax.get("/api/services/app/Session/GetCurrentLoginInformations",parmar);
    },
    async GetAll(){
        return await Ajax.get("/AbpUserConfiguration/GetAll");
    }

}

export default BaseApi;