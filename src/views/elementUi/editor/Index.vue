<template>
  <div class="editor-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="所属模块" prop="module">
        <el-select v-model="form.module">
          <el-option label="新闻动态" value="1"></el-option>
          <el-option label="实时热点" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content" class="vab-quill-content">
        <div v-show="editor" class="editor" v-html="form.content"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSee">预览效果</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </el-form-item>
    </el-form>

    <div class="web-url c-flex-x-start">
      <span>官网：</span>
      <a href="https://quilljs.com/" target="_blank">https://quilljs.com/</a>
    </div>

    <el-dialog title="预览效果" :visible.sync="dialogTableVisible">
      <div style="min-height: 60vh">
        <h1 class="news-title">{{ form.title }}</h1>
        <div class="news-content" v-html="previewHtml"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default {
  name: "Editor",
  components: {},
  data() {
    return {
      editor: null, // editor实例
      options: {
        theme: "snow",
        bounds: document.body,
        debug: "warn",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ color: [] }, { background: [] }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            [{ direction: "rtl" }],
            [{ font: [] }],
            ["clean"],
            ["link", "image"],
          ],
        },
        placeholder: "内容...",
        readOnly: false,
      },
      borderColor: "#dcdfe6",
      dialogTableVisible: false,
      form: {
        title: "",
        module: "",
        content: "哈哈拉风",
      },
      previewHtml: "", // 预览富文本
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
        module: [
          {
            required: true,
            message: "请选择模块",
            trigger: "change",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.editor = new Quill(".editor", this.options);
    }, 400);
  },
  methods: {
    handleSee() {
      this.$refs["form"].validate((valid) => {
        this.$refs.form.validateField("content", (errorMsg) => {});
        if (valid) {
          let html = this.editor.container.firstChild.innerHTML;

          this.previewHtml = html;
          this.dialogTableVisible = true;
        } else {
          return false;
        }
      });
    },
    handleSave() {
      this.$refs["form"].validate((valid) => {
        this.$refs.form.validateField("content", (errorMsg) => {
          this.borderColor = "#dcdfe6";
          if (errorMsg) {
            this.borderColor = "#F56C6C";
          }
        });
        if (valid) {
          this.eleToast(this, "submit!", "success");
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.editor-container {
  .news {
    &-title {
      text-align: center;
    }

    &-content {
      ::v-deep {
        p {
          line-height: 30px;

          img {
            display: block;
            margin-right: auto;
            margin-left: auto;
          }
        }
      }
    }
  }

  .vab-quill-content {
    ::v-deep {
      .el-form-item__content {
        line-height: normal;
      }
    }
  }

  .editor {
    height: 200px;
  }

  .web-url {
    font-weight: 600;
    margin-left: 100px;
  }
}
</style>
