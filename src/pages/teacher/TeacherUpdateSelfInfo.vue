<template>
  <a-tabs default-active-key="info">
    <a-tab-pane
      key="info"
      tab="修改信息"
    >
      <EditTeacher
        ref="self"
        type="self"
        style="width: 500px; margin: 0 auto"
        :data="user"
      />
      <div style="text-align: center">
        <a-button
          style="margin-right: 20px"
          @click="reset"
        >
          重置
        </a-button>
        <a-button
          type="primary"
          :loading="loading"
          @click="modifyUserInfo"
        >
          保存
        </a-button>
      </div>
    </a-tab-pane>

    <!--修改密码-->
    <a-tab-pane
      key="password"
      tab="修改密码"
      force-update
    >
      <ModifyPassword />
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import EditTeacher from '../../components/add-and-update/EditTeacher'
import ModifyPassword from '../../components/common/UpdatePassword'
import { UPDATE_SELF } from '../../store/mutation-types'
import { omit } from 'lodash'
export default {
  name: 'TeacherUpdateSelfInfo',
  components: { ModifyPassword, EditTeacher },
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      loading: false,
      name: ['name', {
        rules: [{
          required: true,
          message: '请输入管理员姓名！'
        }]
      }]
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    reset () {
      this.$refs.self.reset()
    },
    modifyUserInfo () {
      this.$refs.self.confirm().then(values => {
        const user = omit(this.user, ['identity'])
        this.loading = true
        return this.$store.dispatch(
          UPDATE_SELF,
          Object.assign(user, values)
        )
      }).then(() => {
        this.$refs.self.changed = false
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .form
    width 500px
    margin 0 auto
</style>
