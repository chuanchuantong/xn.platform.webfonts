<template>
    <div>
        <Modal
         :title="L('EditRole')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="roleForm"  label-position="top" :rules="roleRule" :model="role">
                <Tabs value="detail">
                    <TabPane :label="L('RoleDetails')" name="detail">
                        <FormItem :label="L('RoleName')" prop="name">
                            <Input v-model="role.name" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                        <FormItem :label="L('DisplayName')" prop="displayName">
                            <Input v-model="role.displayName" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                        <FormItem :label="L('Description')" prop="description">
                            <Input v-model="role.description" :maxlength="1024"></Input>
                        </FormItem>
                      </TabPane>
                    <TabPane :label="L('RolePermission')" name="permission">
                        <!-- <CheckboxGroup v-model="role.grantedPermissions">
                            <Checkbox :label="permission.name" v-for="permission in permissions" :key="permission.name"><span>{{permission.displayName}}</span></Checkbox>
                        </CheckboxGroup> -->
                          <Tree :data="permissions.items" ref="tree" show-checkbox></Tree>
                    </TabPane>
                </Tabs>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">{{L('OK')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import Role from '@/store/entities/role';
import store from '../../../store';
    @Component
    export default class EditRole extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        role:Role=new Role();
        updateData={};
        get permissions(){
            return this.$store.state.role.newPermission
        } 
        save(){
             var dataTree=(this.$refs.tree as any).getCheckedAndIndeterminateNodes();
            let checkedIds=[];
            this.role.grantedPermissions=[];
            for(var i=0;i<dataTree.length;i++){
                checkedIds.push(dataTree[i].name);
            }
            this.role.grantedPermissions = checkedIds;
            (this.$refs.roleForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'role/update',
                        data:this.role
                    });
                    (this.$refs.roleForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.roleForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.role=Util.extend(true,{},this.$store.state.role.editRole);
            }
        }
        roleRule={
            name:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('RoleName')),trigger: 'blur'}],
            displayName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('DisplayName')),trigger: 'blur'}]
        }
         async created(){ 
             if(this.role.id!=undefined){
                await this.$store.dispatch({
                type:'role/GetUpdatePermissionsById',
                data: this.role
            })
             }
            
        }
    }
</script>

