<template>
  <div class="commit-area">
    <my-form class="submit-area" :form="form" :rules="rules" ref="form">
      <div class="input-box">
        <input
          name="name"
          v-model="form.name"
          placeholder="Name"
          autocomplete="off"
        />
        <input
          name="email"
          v-model="form.email"
          placeholder="Email"
          autocomplete="off"
        />
      </div>
      <div class="reply-name" v-if="isReply">
        <span class="">@{{ replyObj.reply_name }}</span>
        <span class="iconfont icon-close" @click="cancel"></span>
      </div>
      <textarea
        name="commit"
        v-model="form.commit"
        rows="10"
        placeholder="输入你想说的话"
      ></textarea>
      <div style="margin-top:10px">
        <button type="button" class="btn btn-default" @click="submit">
          SUBMIT
        </button>
        <span class="error-message" v-if="errorMsg">{{ errorMsg }}</span>

        <span class="success-message" v-if="successMsg">{{ successMsg }}</span>
      </div>
    </my-form>
    <div class="commit-list">
      <div v-if="total">Comment List({{ total }})</div>
      <div class="commit-item" v-for="item in commit" :key="item._id">
        <div class="commit-box">
          <div class="commit-head">
            <div class="commit-head-img">
              <img :src="'images/' + item.image + '.jpg'" alt="" />
            </div>
            <div class="commit-head-name">
              <div>
                <span class=""
                  >{{ item.name }}
                  <span v-if="item.admin" class="level-label admin"
                    >管理员</span
                  ></span
                >
                <a class="reply-btn" @click="reply(item, 2, item._id)">回复</a>
              </div>
              <span class="commit-head-time"> {{ item.time }}</span>
            </div>
          </div>
          <div class="commit-content">
            <div class="commit-content-text">
              {{ item.commit }}
            </div>

            <div
              class="commit-item"
              v-for="value in item.child"
              :key="value._id"
            >
              <div class="commit-head">
                <div class="commit-head-img">
                  <img :src="'images/' + value.image + '.jpg'" alt="" />
                </div>
                <div class="commit-head-name">
                  <div>
                    <span class=""
                      >{{ value.name }}
                      <span v-if="value.admin" class="level-label admin"
                        >管理员</span
                      ></span
                    >
                    <a class="reply-btn" @click="reply(value, 3, item._id)"
                      >回复</a
                    >
                  </div>
                  <span class="commit-head-time"> {{ value.time }}</span>
                </div>
              </div>
              <div class="commit-content">
                <div class="commit-content-text">
                  <span v-if="value.type === 3" class="reply-name">
                    @{{ value.reply_name }}
                  </span>
                  {{ value.commit }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setScroll, dateFormat } from "../plugins/public";
export default {
  props: ["id"],
  data() {
    return {
      form: {
        name: "",
        email: "",
        commit: ""
      },
      rules: {
        name: [{ required: true, message: "输入名字让更多人认识您~" }],
        email: [{ type: "email", message: "输入正确的邮箱~" }],
        commit: [{ required: true, message: "真的没有什么想说的吗 QAQ" }]
      },
      type: 1, //1评论 2回复 3深度回复
      isReply: false,
      commit: [],
      total: 0,
      errorMsg: "",
      successMsg: "",
      replyObj: {}
    };
  },
  mounted() {
    this.$axios.get(`/commit/${this.id}`).then(res => {
      this.commit = res.data.body.data;
      this.total = res.data.body.total;
    });
  },
  methods: {
    reply(row, type, pId) {
      this.isReply = true;
      this.replyObj = {
        type,
        reply_name: row.name,
        reply_email: row.email,
        pId
      };
      document.querySelector(".submit-area").scrollIntoView(false);
    },
    cancel() {
      this.isReply = false;
      this.replyObj = {};
    },
    async submit() {
      try {
        await this.$refs.form.verify();
        let formData = {
          articleId: this.id,
          type: this.type,
          image: Math.floor(Math.random() * 7 + 1),
          ...this.replyObj
        };

        for (const key in this.form) {
          formData[key] = this.form[key]
            .trim()
            .replace(/<script.*?>.*?<\/script>/gi, "");
        }
        if (formData.email == "1252374851@qq.com" && formData.name == "zily") {
          formData.image = 7;
          formData.admin = true;
        }
        this.$axios.post("commit", formData).then(res => {
          this.form = {
            name: "",
            email: "",
            commit: ""
          };
          this.replyObj = {};
          this.type = 1;
          this.isReply = false;
          this.errorMsg = "";
          this.total++;

          let data = res.data.body;
          if (data.type == 1) {
            this.commit.unshift(data);
          } else {
            let index = this.commit.findIndex(item => item._id == data.pId);
            this.commit[index].child.push(data);
          }

          this.successMsg = "评论成功";
          setTimeout(() => {
            this.successMsg = "";
          }, 1000);
        });
      } catch (error) {
        this.errorMsg = error[0].message;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.submit-area {
  padding: 15px 12px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-bottom: 50px;
  textarea,
  input {
    border: 1px dashed #eee;
    outline: none;
    user-select: none;
    resize: none;
    transition: all 0.3s;

    &:focus {
      border-color: #999;
    }
  }
  .input-box {
    display: flex;
    input {
      height: 38px;
      padding-left: 10px;
      display: inline-block;
      width: 50%;
      margin-right: 12px;
      border-width: 0 0 1px 0;
    }
  }

  textarea {
    width: 100%;
    padding: 15px;
    margin-top: 10px;
    border-radius: 5px;
  }
}

.commit-list {
  .commit-item {
    padding: 25px 0;
    border-bottom: 1px solid #eee;
    .commit-content-text {
       padding-left: 56px;
    }
    &:hover .reply-btn {
      opacity: 1 !important;
    }
    .commit-item {
       padding-left: 56px;
      .commit-content-text {
        color: #666;
      }
    }
    .commit-item:last-of-type {
      padding-bottom: 0;
      border-bottom: none;
    }
 
    .reply-name {
      color: #fff;
      background: #a9cff3;
      display: inline-block;
      height: 18px;
      padding: 0 4px;
      line-height: 18px;
      border-radius: 10px;
      margin-right: 4px;
      font-size: 13px;
      margin-top: 0;
    }
  }
  .commit-head {
    display: flex;
    align-items: center;
    .commit-head-img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      border: 1px solid #eee;
      // padding: 3px;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .commit-head-name {
      flex: 1;
      display: flex;
      justify-content: space-between;
      line-height: 22px;
      & > div {
        flex: 1;
        & > span:first-of-type {
          font-weight: 400;
          color: #ef6d57;
          font-size: 16px;
          transition: all 0.3s;
          text-decoration: none;
          position: relative;
        }
      }

      & > span:first-of-type {
        color: #999;
        font-size: 13px;
        letter-spacing: 0;
      }

      .reply-btn {
        cursor: pointer;
        text-decoration: underline;
        color: #ef6d57;
        margin-right: 10px;
        opacity: 0;
        transition: all 0.3s;
        float: right;
      }
    }
  }
  .commit-content {
   
    line-height: 22px;
  }
}
.error-message {
  color: red;
  margin-left: 10px;
}
.success-message {
  color: green;
  margin-left: 10px;
}
.reply-name {
  color: #fff;
  display: inline-block;
  background: #0084ff;
  border-radius: 21px;
  padding: 0 10px;
  height: 24px;
  line-height: 23px;
  margin-top: 10px;
  span {
    font-size: 13px;
    &.iconfont {
      font-size: 12px;
      cursor: pointer;
    }
  }
}

.level-label {
  color: #fff;
  font-size: 12px;
  line-height: 14px;
  padding: 1px 6px 1px 8px;
  white-space: nowrap;
  background: #a9cff3;
  border-radius: 5px;
  // border-radius: 0 20px 0;
  // transform: translateY(-50%) scale(0.9);
}

@media screen and (max-width: 600px) {
    .commit-head-name {
      display: block!important;
    }
    .reply-btn {
      opacity: 1!important;
    }
    .commit-content-text {
      padding-left: 0!important;
      margin-top: 12px;
    }
    .commit-item .commit-item {
      padding-left: 24px!important;
    }
}
</style>
