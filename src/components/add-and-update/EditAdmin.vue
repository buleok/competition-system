<template>
  <a-form :form="form">
    <!--通用部分：用户名、密码-->
    <template v-if="type !== 'self'">
      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="账号"
      >
        <a-input
          ref="account"
          v-decorator="decorator.account"
          :disabled="type === 'update'"
          placeholder="账号"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item
        v-if="type === 'add'"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="密码"
      >
        <a-input
          v-decorator="decorator.password"
          placeholder="密码"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
    </template>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="姓名"
    >
      <a-input
        v-decorator="decorator.name"
        placeholder="姓名"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import EditMixin from './edit-mixin'

export default {
  name: 'EditAdmin',
  mixins: [EditMixin],
  data () {
    return {
      decorator
    }
  },
  methods: {
    initData () {
      const { data, type } = this
      const result = {
        name: data.name
      }
      if (type !== 'self') {
        result.account = data.account
        result.password = data.password
      }
      this.form.setFieldsValue(result)
    }
  }
}

/**
 * 定义decorator
 */
const decorator = {
  account: ['account', {
    rules: [{
      required: true,
      message: '请输入账号！'
    }]
  }],
  password: ['password', {
    rules: [{
      required: true,
      message: '请输入密码！'
    }]
  }],
  name: ['name', {
    rules: [{
      required: true,
      message: '请输入管理员姓名！'
    }]
  }]
}
</script>
