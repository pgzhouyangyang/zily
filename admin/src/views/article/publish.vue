<template>
  <div>
    <div class="article">
      <div class="article-header">文章信息</div>
      <div class="article-content">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="封面" prop="thumbnail.url">
            <el-input
              v-if="!toggleCover"
              v-model="form.thumbnail.url"
              clearable
              placeholder="输入封面地址"
            >
              <template slot="prepend">Http://</template>
            </el-input>
            <el-upload
              v-else
              class="upload-block"
              :auto-upload="false"
              drag
              :multiple="false"
              action="/api/upload"
              accept="image/*"
              :limit="1"
              :on-change="coverChange"
              :on-remove="coverRemove"
                :file-list="coverList"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">封面图片</div>
            </el-upload>
            <div>
              <el-switch v-model="toggleCover" active-text="文件上传" inactive-text="输入链接"></el-switch>
            </div>
          </el-form-item>
          <el-form-item label="背景音乐" prop="music.url">
            <el-input v-if="!toggleMusic" v-model="form.music.url" clearable placeholder="输入音乐地址">
              <template slot="prepend">Http://</template>
            </el-input>
            <el-upload
              v-else
              class="upload-block"
              :auto-upload="false"
              drag
              :multiple="false"
              action="/api/upload"
              accept="audio/*"
              :limit="1"
              :on-change="musicChange"
              :on-remove="musicRemove"
              :file-list="musicList"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">背景音乐</div>
            </el-upload>
            <div>
              <el-switch v-model="toggleMusic" active-text="文件上传" inactive-text="输入链接"></el-switch>
            </div>
          </el-form-item>
          <el-form-item label="公开度">
            <el-radio-group v-model="form.public">
              <el-radio :label="0">所有人</el-radio>
              <el-radio :label="1">仅自己</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">发布</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="置顶">
            <el-switch v-model="form.isTop"></el-switch>
          </el-form-item>
          <el-form-item label="标题" prop="caption">
            <el-input v-model="form.caption" clearable></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <mavon-editor
              v-model="form.content"
              :ishljs="true"
              @change="editChange"
              @imgAdd="imgAdd"
              @imgDel="imgDel"
              style="min-height:800px"
            ></mavon-editor>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="onSubmit" size="small">保存文章</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
// import { delete } from 'vue/types/umd';
export default {
  data() {
    return {
      toggleCover: false,
      toggleMusic: false,
      form: {
        public: 0,
        status: 0,
        caption: "",
        content: "",
        contentHtml: "",
        words: 0,
        isTop: false,
        thumbnail: {
          url: "",
          name: "",
        },
        music: {
          url: "",
          name: "",
        },
        describe: "",
      },
      rules: {
        caption: [
          { required: true, trigger: "blur", message: "标题不能为空！" },
        ],
        content: [{ required: true, message: "内容不能为空！" }],
        // "thumbnail.url": [
        //    { type: "url", trigger: "blur", message: "请输入正确的地址" },
        // ],
        // "music.url": [
        //    { type: "url", trigger: "blur", message: "请输入正确的地址" },
        // ]
      },
      uploadList: {},
    };
  },
  async created() {
    if(this.$route.query.id) {
        let res = await fetch(`/article/${this.$route.query.id}`);
        this.form = res.body;
        if(this.form.thumbnail.name) {
          this.toggleCover = true
        }
        if(this.form.music.name) {
          this.toggleMusic = true
        }
    }
  },
  computed: {
    coverList() {
      return this.form.thumbnail.name ? [this.form.thumbnail] : []
    },
    musicList() {
        return this.form.music.name ? [this.form.music] : []
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

          for (const key in this.uploadList) {
            let fd = new FormData();
            fd.append("file", this.uploadList[key].raw);
            const result = await fetch("/upload", {
              method: "POST",
              body: fd,
              headers: {
                // 'Content-Type': 'multipart/form-data'
              },
            });
            this.form[key].url = result.url;
            this.form[key].name = this.uploadList[key].name;
          }
          if(!this.toggleCover) {
            this.form.thumbnail.name = ""
          }
          if(!this.toggleMusic) {
            this.form.music.name = ""
          }
          this.form.describe = this.form.content.slice(0, 60) + "...";
          fetch("/article", {
            method: "POST",
            body: JSON.stringify(this.form),
          }).then((res) => {
            if (res.errcode) {
              return this.$message.error(res.message);
            }
            setTimeout(() => {
              loading.close();
              this.$message(res.message);
              this.form = {
                public: 0,
                status: 0,
                caption: "",
                content: "",
                contentHtml: "",
                words: 0,
                isTop: false,
                thumbnail: {
                  url: "",
                  name: "",
                },
                music: {
                  url: "",
                  name: "",
                },
                describe: "",
              };
            }, 1000);
          });
        } else {
          return false;
        }
      });
    },
    coverChange(file) {
      this.uploadList.thumbnail = file;
    },
    musicChange(file) {
      this.uploadList.music = file;
       this.form.thumbnail = {
         url: "",
         name: ""
       }
    },
    coverRemove(file) {
      delete this.uploadList.thumbnail;
      this.form.thumbnail = {
         url: "",
         name: ""
       }
      if(file.url) {
        fetch("/deleteFile", {
          method: "POST",
          body: JSON.stringify({url: file.url})
        })
      }
    },
    musicRemove(file) {
      delete this.uploadList.music;
      if(file.url) {
        fetch("/deleteFile", {
          method: "POST",
          body: JSON.stringify({url: file.url})
        })
      }
    },
    editChange(value, render) {
      this.form.contentHtml = render;
      this.form.words = value.length;
    },
    imgAdd() {},
    imgDel() {},
  },
  components: {
    mavonEditor,
  },
};
</script>
<style scoped>
.article {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  padding: 16px;
}
.article-header {
  padding: 16px;
  background: #409eff;
  border-radius: 4px;
  font-size: 20px;
  color: #fff;
  margin-top: -40px;
  box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2),
    0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12) !important;
}
.article-content {
  padding: 50px 0 16px 0;
}

.upload-block {
  /* display: flex; */
}

.upload-block .el-upload__tip {
  line-height: 1;
  padding-left: 20px;
  color: #999;
}
</style>