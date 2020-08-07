<template>
  <div class="setting">
    <div class="card-box">
      <div class="card-header">首页信息配置</div>
      <div class="card-content">
        <el-upload
          class="upload-cover"
          action=""
          :auto-upload="false"
          :show-file-list="false"
          :on-change="coverChange"
          accept="image/*"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />

          <i v-if="!imageUrl" class="el-icon-upload" style="font-size:67px"></i>
          <div v-if="!imageUrl" class="el-upload__text">点击上传封面</div>
        </el-upload>
        <el-form ref="form" :model="form" label-width="100px" size="small">
          <el-row :gutter="10">
            <el-col :sm="24" :lg="8">
              <el-form-item label="logo名称" prop="sysName">
                <el-input
                  v-model="form.sysName"
                  clearable
                  placeholder="logo名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="封面背景色" prop="coverBackground">
                <el-color-picker
                  v-model="form.coverBackground"
                  show-alpha
                ></el-color-picker>
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
export default {
  data() {
    return {
      form: {
        sysName: "",
        coverBackground: "",
      },
      cover: {},
      imageUrl: ""
    };
  },
  async created() {
    let res = await fetch(`/indexConfig`);
    this.form = res.body;
    this.imageUrl = res.body.cover
  },
  computed: {
   
  },
  methods: {
    coverChange(res) {
      this.cover = res.raw;
      this.imageUrl = URL.createObjectURL(res.raw)
    },
    coverReomve() {},
    onSubmit() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "保存中",
            spinner: "el-icon-loading",
            background: "rgba(255,255, 255, 0.7)",
          });
          let fd = new FormData();
          fd.append("file", this.cover);
          for (const key in this.form) {
            fd.append(key, this.form[key]);
          }
          fetch("/indexConfig", {
            method: "POST",
            body: fd,
            headers: {
              // "Content-type" : 'multipart/form-data; boundary=X-INSOMNIA-BOUNDARY',
              //  "Accept": "multipart/form-data",
            },
          })
            .then((res) => {
              setTimeout(() => {
                loading.close();
                this.$message(res.message);
              }, 1000);
            })
            .catch(() => {
              loading.close();
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.upload-cover {
  padding: 20px;
  margin-bottom: 40px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  text-align: center;
  color: #999;
  border-radius: 4px;
}
</style>
<style lang="css">
.setting .el-input__inner,
.setting .el-textarea__inner {
  border-width: 0 0 1px 0;
  border-radius: 0;
}
.setting .el-form-item {
  margin-bottom: 40px;
}

.upload-cover .el-upload {
  overflow: hidden;
  cursor: pointer;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #409eff;
}
.upload-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
