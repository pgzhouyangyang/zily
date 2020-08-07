<template>
  <div class="add-user">
    <div class="upload-avatar">
      <div>
        <label for="avatar" class="avatar">
          <img :src="avatarSrc" alt="" id="preview" />
        </label>
        <input type="file" id="avatar" style="display:none" accept="image/*" />
      </div>
      <h6>点击上传用户头像</h6>
      <h5></h5>
    </div>
    <div class="card-box">
      <div class="card-header">用户详细信息</div>
      <div class="card-content">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
          size="small"
        >
          <el-row :gutter="10">
            <el-col :sm="24" :lg="8">
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model="form.username"
                  clearable
                  placeholder="用户名"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="姓名" prop="name">
                <el-input
                  v-model="form.name"
                  clearable
                  placeholder="姓名"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="手机号" prop="phone">
                <el-input
                  v-model="form.phone"
                  clearable
                  placeholder="手机号"
                  maxlength="11"
                  type="phone"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="地址" prop="address">
                <el-cascader
                  style="width:100%"
                  :props="props"
                   v-model="form.address"
                   :filterable="true"
                  placeholder="地址"
                  ref="address"
                  clearable
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="邮箱" prop="email">
                <el-input
                  v-model="form.email"
                  clearable
                  placeholder="邮箱"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="初始密码" prop="password">
                <el-input
                  v-model="form.password"
                  clearable
                  placeholder="初始密码"
                  v-if="!form._id"
                  show-password
                ></el-input>
                 <el-input
                  clearable
                  placeholder="初始密码"
                  v-else
                  disabled
                  value="******"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col>
              <el-form-item label="详细地址" prop="address1">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4 }"
                  resize="none"
                  v-model="form.address1"
                  clearable
                  placeholder="详细地址"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col>
              <el-form-item label="简介" prop="introduction">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4 }"
                  resize="none"
                  v-model="form.introduction"
                  clearable
                  placeholder="详细地址"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item style="text-align: center">
            <el-button type="primary" @click="onSubmit" size="small"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import defaultAvatar from "../../assets/images/2.jpg"
export default {
  data() {
     var phoneValidator = (rule, value, callback) => {
       if(!value || /^1[3456789]\d{9}$/.test(value)) {
         callback();
       } else {
         return callback(new Error('请输入正确的手机号'));
       }
      };
    return {
      form: {
        username: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        address: [],
        address1: "",
        introduction: "",
      },
      rules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "初始密码不能为空" },
        ],
        email: [
          { type: "email", message: "请输入正确的邮箱"},
        ],
        phone: [
         {validator: phoneValidator}
        ]
      },
      props: {
        lazy: true,
        label: "name",
        value: "code",
        async lazyLoad(node, resolve) {
          const { level } = node;
          let data = await fetch(`/getXzqh/${!level ? 0 : node.data.code}`);
          data = data.body.map((item) => {
            return {
              ...item,
              label: item.name,
              value: item.code,
              leaf: level >= 2,
            };
          });
          resolve(data);
        },
      },
      avatar: {},
      address: [],
    };
  },
  async created() {
    if (this.$route.query.id) {
      let res = await fetch(`/user/${this.$route.query.id}`);
      this.form = res.body;
      this.form.address = res.body.address.map(item=> item.code)
    }
  },
  mounted() {
    let _this = this;
    document.getElementById("avatar").onchange = function() {
      if (this.files.length) {
        let url = window.URL.createObjectURL(this.files[0]);
        document.getElementById("preview").src = url;
        _this.avatar = this.files[0];
      }
    };
  },
  computed: {
    avatarSrc() {
      return this.form.avatar || defaultAvatar
    }
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "保存中",
            spinner: "el-icon-loading",
            background: "rgba(255,255, 255, 0.7)",
          });
         
          let checkNodes = this.$refs.address.getCheckedNodes()[0];
          let checkNodesPath = []
          if(checkNodes) {
            checkNodesPath = checkNodes.pathNodes.map(item=> {
              return {
                name: item.data.name,
                code: item.data.code
              }
            })
          }
          let fd = new FormData();
          fd.append("file", this.avatar);
          for (const key in this.form) {
            if(key!= "address") {
               fd.append(key, this.form[key]);
            }
          }
          checkNodesPath.forEach((item, index)=> {
             fd.append(`address[${index}]`, JSON.stringify(item));
          })
          fetch("/addUser", {
            method: "POST",
            body: fd,
            headers: {
              // "Content-type" : 'multipart/form-data; boundary=X-INSOMNIA-BOUNDARY',
              //  "Accept": "multipart/form-data",
            }
          }).then((res) => {
            setTimeout(() => {
              loading.close();
              this.$message(res.message);
              if (!this.$route.query.id) {
                this.form = {
                  username: "",
                  name: "",
                  phone: "",
                  email: "",
                  password: "",
                  address: [],
                  address1: "",
                  introduction: "",
                };
                this.avatar = {}
              }
            }, 1000);
          }).catch(()=> {
             loading.close();
          })
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.upload-avatar {
  padding: 20px;
  margin-bottom: 40px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  text-align: center;
  color: #999;
  border-radius: 4px;
}
.upload-avatar h6 {
  font-weight: normal !important;
  margin: 10px 0;
}
.avatar {
  display: inline-block;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
<style lang="css">
.add-user .el-input__inner,
.add-user .el-textarea__inner {
  border-width: 0 0 1px 0;
  border-radius: 0;
}
.add-user .el-form-item {
  margin-bottom: 40px;
}
</style>
